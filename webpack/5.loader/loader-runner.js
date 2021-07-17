
/**
 * 把loader转成loader对象
 * @param {*} loader loader的绝对路径
 */
function createLoaderObject(loader) {
    let module = require(loader);
    let normal = module;
    let pitch = module.pitch;
    let raw = module.raw;
    let loaderObject = {
        path: loader, //loader的绝对路径
        normal,//loader的normal函数
        pitch, //loader的pitch函数
        raw,//是否要转成Buffer, raw=true参数就要转成Buffer,raw=false参数就要转成字符串
        data: {},//每个load都有一个自己的data自定义对象,用来可以存放一些自定义的数据
        pitchExecuted: false,//此loader的pitch方法是否已经执行过了
        normalExecuted: false,//此loader的normal方法是否已经执行过了
    }
    return loaderObject;
}
function iterateNormalLoaders(options, loaderContext, args, runLoadersCallback) {
    if (loaderContext.loaderIndex < 0) {
        return runLoadersCallback(null, ...args);
    }
    let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];//获取当前的索引对应的loader
    if (currentLoaderObject.normalExecuted) {//如果说当前的loader已经执行过了,则执行下一个loader对应的pitch
        loaderContext.loaderIndex--;
        return iterateNormalLoaders(options, loaderContext,args, runLoadersCallback);
    }
    let fn = currentLoaderObject.normal;//获取当前的loader的normal函数
    currentLoaderObject.normalExecuted = true;//表示当前的loader的normal函数已经执行过了
    // 如果这个loader有normal方法
    //fn可以同步也可以异步
    convertArgs(args, currentLoaderObject.raw);
    runSyncOrAsync(fn, loaderContext, args, (err, ...args) => {//args可能有值,也可有没有值,可能有一个值,也可能有多个值 
        if (err) return runLoadersCallback(err);
        return iterateNormalLoaders(options, loaderContext, args, runLoadersCallback);
    });
}
function convertArgs(args, raw) {
    if (raw && !Buffer.isBuffer(args[0])) {
        args[0] = Buffer.from(args[0]);//如果这个normal函数想要buffer,但是参数不是Buffer
    } else if (!raw && Buffer.isBuffer(args[0])) {//想要字符串，但是是个buffer
        args[0] = args[0].toString('utf8');
    }
}
function processResource(options, loaderContext, runLoadersCallback) {
    options.readResource(loaderContext.resource, (err, buffer) => {
        loaderContext.loaderIndex = loaderContext.loaders.length - 1;
        options.resourceBuffer = buffer;//要加载的文件的原始文件内容
        iterateNormalLoaders(options, loaderContext, [buffer], runLoadersCallback);
    });
}
function iteratePitchLoaders(options, loaderContext, runLoadersCallback) {
    //如果当前索引已经 大于等loader的数量了,则表示所有的loader pitch执行完了
    if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
        return processResource(options, loaderContext, runLoadersCallback);
    }
    let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];//获取当前的索引对应的loader
    if (currentLoaderObject.pitchExecuted) {//如果说当前的loader已经执行过了,则执行下一个loader对应的pitch
        loaderContext.loaderIndex++;
        return iteratePitchLoaders(options, loaderContext, runLoadersCallback);
    }
    let fn = currentLoaderObject.pitch;//获取当前的loader的pitch函数
    currentLoaderObject.pitchExecuted = true;//表示当前的loader的pitch函数已经执行过了
    if (!fn) {//如果当前的loader没有pitch,直接执行下一个loader的pitch方法 
        return iteratePitchLoaders(options, loaderContext, runLoadersCallback);
    }
    // 如果这个loader有pitch方法
    //fn可以同步也可以异步
    runSyncOrAsync(fn, loaderContext, [
        loaderContext.remainingRequest, loaderContext.previousRequest, loaderContext.data
    ], (err, ...args) => {//args可能有值,也可有没有值,可能有一个值,也可能有多个值 
        if (args.length > 0 && args.some(item => !!item)) {//有任何一个有值就可以
            //跳过后续的pitch和读文件,直接掉头执行前一个loader的normal
        } else {
            return iteratePitchLoaders(options, loaderContext, runLoadersCallback);
        }
    });
}
/**
 * 以同步或者异步的方式执行fn
 * context.fn(args);callback()
 * @param {*} fn 要执行的函数
 * @param {*} context fn执行的时候的this指针
 * @param {*} args 传递给fn的参数
 * @param {*} callback fn执行完成后的回调 
 */
function runSyncOrAsync(fn, context, args, callback) {
    let isSync = true;//默认是同步执行
    context.callback = (...args) => {
        callback(null, ...args);
    }
    context.async = () => {
        isSync = false;//把同步变成异步
        return context.callback;
    }
    var result = fn.apply(context, args);//用指定的参数和this对象执行函数,返回一个结果
    // isSync为true表示是同步,同步意味着执行完当前函数后,会直接自动执行callback回调
    // isSync为false表示是同步,那意味着扫行当前函数后什么都不做了
    if (isSync) {
        if (result === undefined) {
            return callback();
        } else {
            return callback(null, result);
        }
    }
}

function runLoaders(options, finalCallback) {
    let resource = options.resource;//加载的文件 src\index.js
    let loaders = options.loaders || [];//
    let loaderContext = options.context || {};//loader函数执行时的上下文对象
    let readResource = options.readResource || fs.readFile;//用来读加载的文件的方法
    let loaderObjects = loaders.map(createLoaderObject);
    loaderContext.resource = resource;//加载的文件
    loaderContext.readResource = readResource;
    loaderContext.loaders = loaderObjects;
    loaderContext.loaderIndex = 0;//当前正在执行的loader的索引
    loaderContext.callback = null;//后面在执行 loader的时候会赋值 返回多个值
    loaderContext.async = null;//后面在执行 loader的时候会赋值 把loader的执行从同步变成异步
    Object.defineProperty(loaderContext, 'request', {
        get() {//request = 所有的loader!要加载的模块
            return loaderContext.loaders.map(l = l.path).concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext, 'remainingRequest', {
        get() {//request = 所有的loader!要加载的模块
            return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(loader => loader.path).concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext, 'currentRequest', {
        get() {//request = 所有的loader!要加载的模块 currentRequest 不是仅仅自己,而包括自己和后续的
            return loaderContext.loaders.slice(loaderContext.loaderIndex).map(loader => loader.path).concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext, 'previousRequest', {
        get() {//从第一个loader到当前的loader,不包含当前的loader
            return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(loader => loader.path).concat(loaderContext.resource).join('!')
        }
    });

    Object.defineProperty(loaderContext, 'data', {
        get() {//从第一个loader到当前的loader,不包含当前的loader
            return loaderContext.loaders[loaderContext.loaderIndex].data;
        }
    });
    let processOptions = {
        resourceBuffer: null,//存放原始内容对应的Buffer 用loader转换前的内容Buffer
        readResource  //fs.readFile
    }
    //开始从左往后执行每个loader的pitch方法
    iteratePitchLoaders(processOptions, loaderContext, (err, result) => {
        finalCallback(
            err, {
            result,
            resourceBuffer: processOptions.resourceBuffer
        }
        );
    });
}


exports.runLoaders = runLoaders;
/**
[
  'post1-loader',//loader的绝对路径
  'post2-loader',
  'inline1-loader',
  'inline2-loader',
  'normal1-loader',
  'normal2-loader',
  'pre1-loader',
  'pre2-loader'
]
 */