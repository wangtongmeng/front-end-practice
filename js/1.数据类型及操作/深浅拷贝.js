/* 
深拷贝 拷贝前后是没有关系的
浅拷贝 拷贝前后是有关系的

*/



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
// console.log(deepClone1(person));
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


/* 方案3  */
function deepClone2(obj, hash = new WeakMap) {
    // null undefined
    if (obj == null) return obj
    // Date RegExp...
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    // 普通值
    if (typeof obj !== 'object') return obj
    // 对象 {} []
    if (hash.get(obj)) return obj // 防止自己引用自己死循环
    let cloneObj = new obj.constructor
    hash.set(obj, cloneObj) // 缓存对象类型值
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 递归拷贝
            cloneObj[key] = deepClone2(obj[key], hash)
        }
    }
    return cloneObj

}
console.log(deepClone2(person));




/* 浅拷贝 */
{
    // ...运算符只拷贝一层
    let obj = {name: 'lisi', address: {x:100,y:100}}
    let o = {...obj}
    obj.address.x = 200
    console.log(o.address.x); // 200

    let a = [1,2,3]
    let arr = [a]
    let newArr = arr.slice()
    newArr[0][0] = 100
    console.log(arr); // [ [ 100, 2, 3 ] ]
}