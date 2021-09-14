// 泛型类
class MyArray<T>{
    private list: T[] = [];
    add(value: T) {
        this.list.push(value);
    }
    getMax(): T {
        let result = this.list[0];
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i] > result) {
                result = this.list[i];
            }
        }
        return result;
    }
}
let arr = new MyArray<number>();
arr.add(1); arr.add(2); arr.add(3);
let ret = arr.getMax();
console.log(ret); // 3


// 泛型与 new
function factory<T>(type: { new(): T }): T {
    return new type(); // This expression is not constructable.
}

export { }