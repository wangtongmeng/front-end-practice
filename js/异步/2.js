let p = () => Promise.resolve('promise')
function fn1(){
    console.log(p())
    console.log('first')
}
async function fn2 () {
    console.log('second')
    console.log('second', await p())
    console.log('three')
}

fn1()
fn2()


/* 

Promise { 'promise' }
first
second
second promise
three
*/