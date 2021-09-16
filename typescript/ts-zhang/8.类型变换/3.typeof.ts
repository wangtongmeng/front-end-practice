// typeof

// 可以获取一个变量的类型

//先定义类型，再定义变量
namespace a {
    type People = {
        name: string,
        age: number,
        gender: string
    }
    let p1: People = {
        name: 'zhangsan',
        age: 10,
        gender: 'male'
    }
}


//先定义变量，再定义类型
namespace b {
    let p1 = {
        name: 'zhangsan',
        age: 10,
        gender: 'male'
    }
    type People = typeof p1;
    function getName(p: People): string {
        return p.name;
    }
    getName(p1);
}
export { }