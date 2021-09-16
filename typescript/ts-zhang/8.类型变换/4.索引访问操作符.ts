// 索引访问操作符

// 可以通过[]获取一个类型的子类型


interface Person{
    name:string;
    age:number;
    job:{
        name:string
    };
    interests:{name:string,level:number}[]
}
let FrontEndJob:Person['job'] = {
    name:'前端工程师'
}
let interestLevel:Person['interests'][0]['level'] = 2; // 类型是number


export {}