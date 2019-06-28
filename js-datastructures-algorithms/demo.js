function factorial(n) {
    console.trace()
    if (n === 1 || n === 0) {
        return 1
    }
    return n * factorial(n -1)
}
console.log(factorial(5))