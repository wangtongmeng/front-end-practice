let button = document.getElementById('load')
button.addEventListener('click', ()=>{
    // import 是js的内置语法，webpack遇到import方法时，会把它当成一个天然的代码分割点
    import(/* webpackChunkName: "title" */'./title').then(result => {
        console.log(result);
    })
})