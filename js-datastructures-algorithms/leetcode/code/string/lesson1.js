export default str => {
  // 1. 字符串按空格分隔，转为数组
  // 2. 遍历数组，对每个元素反转
  // 3. 转为字符串 
  return str.split(' ').map(item => {
    return item.split('').reverse().join('')
  }).join(' ')
}