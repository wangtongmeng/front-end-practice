/* 
示例 1：

输入：s = "()"
输出：true
示例 2：

输入：s = "()[]{}"
输出：true
示例 3：

输入：s = "(]"
输出：false
示例 4：

输入：s = "([)]"
输出：false
示例 5：

输入：s = "{[]}"
输出：true
 

提示：

1 <= s.length <= 104
s 仅由括号 '()[]{}' 组成
*/


var isValid = function (s) {
    let map = {
        ')': '(',
        '}': '{',
        ']': '['
    }
    let stack = []
    for (let i = 0; i < s.length; i++) {
        if (stack.length === 0) {
            stack.push(s[i])
        } else {
            let last = stack[stack.length - 1]
            if (last !== map[s[i]]) {
                stack.push(s[i])
            } else {
                stack.pop()
            }
        }
    }
    return stack.length === 0
}


console.log(isValid("()[]{}"));