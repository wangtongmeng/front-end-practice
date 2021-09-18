/* 
变量提升
*/
var a = 1;
function fn(m) { console.log('fn'); }
function fn(m) { console.log('new_fn'); }
function a() { console.log('fn_a'); }
console.log(a);
fn(1);
var fn = 'var_fn';
console.log(fn);
//1
//new_fn
//var_fn


/* 
变量提升
function fn(m) { console.log('new_fn'); }
var a

执行
a = 1
console.log(a); // 1
fn(1); // new_fn
fn = 'var_fn';
console.log(fn);  // var_fn
*/

