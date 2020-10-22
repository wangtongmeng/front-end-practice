function fn1() {
    return new Promise ((resolve, reject)=> {
        setTimeout(() => {
            console.log(1)
            resolve()
        }, 1000)
    })
}
function fn2() {
    return new Promise ((resolve, reject)=> {
        setTimeout(() => {
            console.log(2)
            resolve()
        }, 500)
    })
}
function fn3() {
    setTimeout(()=> {
        console.log(3)
    },1000)
}

process.nextTick(async () => {
    await fn1()
    await fn2()
})
