// 声明Set
const set = new Set([1, 2, 3, 4, 4]);

console.log(set) // Set { 1, 2, 3, 4 }
// set长度
console.log(set.size) // 4
// 转数组
console.log([...set]) // [ 1, 2, 3, 4 ]

// 数组去重
console.log([...new Set([1, 1, 2])]) // [ 1, 2 ]
console.log(Array.from(new Set([1, 2, 3, 4, 5, 5]))); // [ 1, 2, 3, 4, 5 ]
// 字符去重
console.log([...new Set('ababbc')].join('')) // abc

// 操作方法 增add删delete改查
let s = new Set()
s.add(1).add(2).add(2)
console.log(s) // Set { 1, 2 }
console.log(s.size) // 2
console.log(s.has(1)) // true
console.log(s.delete(1)) // true
console.log(s.has(1)) // false
// 遍历方法  keys() values() entries() forEach()

{
  let set = new Set(['red', 'green', 'blue']);

  // keys方法、values方法、entries方法返回的都是遍历器对象
  for (let item of set.keys()) {
    console.log(item);
  }
  // red
  // green
  // blue

  for (let item of set.values()) {
    console.log(item);
  }
  // red
  // green
  // blue


  for (let x of set) { // 默认遍历就是values()
    console.log(x);
  }
  // red
  // green
  // blue

  for (let item of set.entries()) {
    console.log(item);
  }
  // ["red", "red"]
  // ["green", "green"]
  // ["blue", "blue"]


  let set1 = new Set([1, 4, 9]);
  set1.forEach((value, key) => console.log(key + ' : ' + value)) // 键名就是键值（两者是同一个值）
  // 1 : 1
  // 4 : 4
  // 9 : 9
}