let person = {
    married: true,
    age: 10,
    name: 'zhangsan',
    girlfriend: null,
    boyfriend: undefined,
    flag: Symbol('man'),
    home: { name: '北京' },
    set: new Set(),
    map: new Map(),
    getName: function () { console.log('zhangsan') },
    hobbies: ['1', '2', '3'],
    error: new Error('我错了'),
    pattern: /^reg$/,
    math: Math,
    json: JSON,
    //document: document,
    //window: window
}

/* 方案1 JSON.parse(JSON.stringify(obj)*/
// console.log(JSON.parse(JSON.stringify(person)))
// {
//     married: true,
//     age: 10,
//     name: 'zhangsan',
//     girlfriend: null,
//     boyfriend丢失  undefined被忽略了
//     flag丢失       symbol不能识别
//     home: { name: '北京' },
//     set: {}, 不能识别
//     map: {},不能识别
//     getName函数丢失
//     hobbies: [ '1', '2', '3' ],
//     error: {}, 不能识别
//     pattern: {}, 不能识别
//     math: {}, 不能识别
//     json: {} 不能识别
//   }

/* 方案2 简单地deepClone */
function deepClone1(source, map = new Map()) {
    if (typeof source === 'object' && source !== null) {
        if (map.get(source)) { // 如果引用类型引用了自己，则直接返回，防止递归死循环
            return map.get(source)
        }
        let target = Array.isArray(source) ? [] : {};
        map.set(source, target)
        for (const key in source) {
            target[key] = deepClone1(source[key]);//对象或数组的还要递归深拷贝
        }
        return target;
    }
    return source;//基本类型值 直接拷贝
}
console.log(deepClone1(person));
// {
//     married: true,
//     age: 10,
//     name: 'zhangsan',
//     girlfriend: null,
//     boyfriend: undefined,
//     flag: Symbol(man),
//     home: { name: '北京' },
//     set: {},不能识别
//     map: {},不能识别
//     getName: [Function: getName],
//     hobbies: [ '1', '2', '3' ],
//     error: {},不能识别
//     pattern: {},不能识别
//     math: {},不能识别
//     json: {}不能识别
//   }