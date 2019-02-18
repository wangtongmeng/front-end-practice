// 求数组中的最大和最小值
{
    let arr = [1,2,3,89,46]
    let max = Math.max.apply(null,arr) //89
    let min = Math.min.apply(null,arr) //1
}
// 类数组转数组
{
    // let trueArr = Array.prototype.slice.call(arrayLike)
    let domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"));
}
// 数组之间追加
{
    let arr1 = [1,2,3]
    let arr2 = [4,5,6]
    let total = [].push.apply(arr1, arr2) //6
    // arr1 [1, 2, 3, 4, 5, 6]
    // arr2 [4,5,6]
}

// 验证是否是数组
{
    function isArray(obj){
        return Object.prototype.toString.call(obj) === '[object Array]'
    }
    console.log('[]是否是数组', isArray([])); // true
    console.log('{}是否是数组', isArray({})); // false
}

// 实现 log 函数，传参数不确定
{
    // 传入参数不确定
    function log() {
        console.log.apply(console, arguments);
    }
    log(1); // 1
    log(1, 2) // 1 2
    // 给每一个 log 消息添加一个"(app)"的前辍
    function log1() {
        var args = Array.prototype.slice.call(arguments)
        args.unshift('(app)')

        console.log.apply(console, args)
    }
    log1(1) // (app) 1
    log1(1, 2) // (app) 1 2
}