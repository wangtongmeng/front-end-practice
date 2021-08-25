new Promise((resolve, reject) => {
    // reject(new Promise((resolve, reject) => {
    //    setTimeout(() => {
    //     resolve(100)
    //    }, 1000);
    // }))
    resolve(new Promise((resolve, reject) => {
        setTimeout(() => {
         resolve(100)
        }, 1000);
     }))
}).then(data=>{
    console.log(data);
},err=>{
    console.log(err,'err');
})