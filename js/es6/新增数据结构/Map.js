let map = new Map()

let keyObj = {}
let keyFunc = function () { }
let keyString = 'stirng'
// 添加值
map.set(keyObj, 1)
map.set(keyFunc, 2)
map.set(keyString, 3)
map.set(NaN, 4);
// 大小
console.log(map.size); // 3
// 读取值
console.log(map.get(keyObj)); // 1
console.log(map.get(keyFunc)); // 2
console.log(map.get(keyString)); // 3
console.log(map.get(NaN)); // 4  NaN作为Map的键来说是没有区别的
// 迭代 for of
for (let [key, value] of map) {
    console.log(key, value);
    // {} 1
    // [Function: keyFunc] 2
    // stirng 3
    // NaN 4
}
for (let key of map.keys()) {
    console.log(key);
    // {}
    // [Function: keyFunc]
    // stirng
    // NaN
}
for (let value of map.values()) {
    console.log(value); // 1234
}
for (let [key, value] of map.entries()) {
    console.log(key, value);
    // {} 1
    // [Function: keyFunc] 2
    // stirng 3
    // NaN 4
}
// 使用 forEach() 方法迭代 Map
map.forEach((value, key) => {
    console.log(key, value);
    // {} 1
    // [Function: keyFunc] 2
    // stirng 3
    // NaN 4
})