// 一个字节是8位，位存储0/1，8位最大值255,所以一个字节最多表示255个数
let sum = 0
for (let i = 0; i <= 7; i++) {
    sum += 1 * Math.pow(2, i)
}
console.log(sum) //255


console.log(2 ** 8 -1) // 255