// 参数属性

class User {
    constructor(public myname: string) {}
    get name() {
        return this.myname;
    }
    set name(value) {
        this.myname = value;
    }
}

let user = new User('zhangsan');
console.log(user.name); 
user.name = 'lisi'; 
console.log(user.name);

export {}