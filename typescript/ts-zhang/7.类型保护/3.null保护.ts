// null保护

// 如果开启了strictNullChecks选项，那么对于可能为null的变量不能调用它上面的方法和属性
function getFirstLetter(s: string | null) {
    //第一种方式是加上null判断
    if (s == null) {
        return '';
    }
    //第二种处理是增加一个或的处理
    s = s || '';
    return s.charAt(0);
}
//它并不能处理一些复杂的判断，需要加非空断言操作符
function getFirstLetter2(s: string | null) {
    function log() {
        console.log(s!.trim());
    }
    s = s || '';
    log();
    return s.charAt(0);
}
export {}