class Father {
    static staticFatherName = "FatherName"
    static staticGetFatherName = function () {
        console.log(Father.staticFatherName);
    }
    constructor(name) {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
}
class Child extends Father {
    static staticChildName = "ChildName"
    static staticGetChildName = function () {
        console.log(Child.staticChildName);
    }
    constructor(name, age) {
        super(name);
        this.age = age;
    }
    getAge() {
        console.log(this.age);
    }
}
let child = new Child('lisi', 10);
child.getName(); // lisi
child.getAge(); // 10
Child.staticGetFatherName(); // FatherName
Child.staticGetChildName(); // ChildName