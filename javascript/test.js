function test (x){
    console.log(x)
}
for(var i = 1; i < 10;i ++) {
    test('var', test(i))
}