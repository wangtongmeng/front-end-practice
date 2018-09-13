// 模块化
import util1 from './util1.js'
import {fn1, fn2} from './util2'

console.log(util1);
fn1()
fn2()
// babel es6 转 es5
// [1,2,3].map(item => (item + 1))

// Class 语法
{
    class MathHandle {
        constructor(x, y) {
            this.x = x
            this.y = y
        }
        add() {
            return this.x + this.y
        }
    }
    const m = new MathHandle(1, 2)
    console.log('Class 语法', m.add());
}