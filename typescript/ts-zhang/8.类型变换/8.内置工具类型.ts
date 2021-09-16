/* 
内置类型
TS 中内置了一些工具类型来帮助我们更好地使用类型系统
utility-types)
TypeScript中增加了对映射类型修饰符的控制
具体而言，一个 readonly 或 ? 修饰符在一个映射类型里可以用前缀 + 或-来表示这个修饰符应该被添加或移除

符号	含义
+?	变为可选
-?	变为必选

*/


/* 
1.Partial
Partial 可以将传入的属性由非可选变为可选，具体使用如下：
*/
namespace a {
    type Partial<T> = { [P in keyof T]?: T[P] };

    interface A {
        a1: string;
        a2: number;
        a3: boolean;
    }

    type aPartial = Partial<A>;

    const a: aPartial = {}; // 不会报错
}


/* 
2.类型递归
*/
namespace b {
    interface Company {
        id: number
        name: string
    }

    interface Person {
        id: number
        name: string
        company: Company
    }
    type DeepPartial<T> = {
        [U in keyof T]?: T[U] extends object
        ? DeepPartial<T[U]>
        : T[U]
    };

    type R2 = DeepPartial<Person>
}


/* 
3.Required
Required 可以将传入的属性中的可选项变为必选项，这里用了 -? 修饰符来实现。
*/
namespace c {
    interface Person {
        name: string;
        age: number;
        gender?: 'male' | 'female';
    }
    /**
     * type Require<T> = { [P in keyof T]-?: T[P] };
     */
    let p: Required<Person> = {
        name: 'lisi',
        age: 10,
        gender: 'male'
    }
}


/* 
4.Readonly
Readonly 通过为传入的属性每一项都加上 readonly 修饰符来实现。
*/
namespace d {
    interface Person {
        name: string;
        age: number;
        gender?: 'male' | 'female';
    }
    //type Readonly<T> = { readonly [P in keyof T]: T[P] };
    let p: Readonly<Person> = {
        name: 'lisi',
        age: 10,
        gender: 'male'
    }
    // p.age = 11; 不能赋值


    // 如果只想让其中某一项是只读的，可以利用交叉类型
    type ReadOnlyNamePerson = Person & {
        readonly name: string;
    };
    let p2: ReadOnlyNamePerson = {
        name: 'lisi',
        age: 11
    }
    // p2.name = '' // Cannot assign to 'name' because it is a read-only property.ts(2540)
}


/* 
5.Pick
Pick 能够帮助我们从传入的属性中摘取某一项返回
*/
namespace e {
    interface Person {
        name: string;
        age: number;
        gender: number
    }
    let person: Person = { name: 'lisi', age: 11, gender: 1 };
    type KeyOfPerson = keyof Person;// 'name'|'age'|'gender'
    type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };
    type PickPerson = Pick<Person, 'name' | 'age'>;
}



/* 
6.Extract
*/
namespace f {
    type Extract<T, U> = T extends U ? T : never;
    //string|number
    //有条件类型分发
    type E = Extract<string | number | boolean, string | number>;
    let e: E = '1';
}


/* 
7.Record
Record 是 TypeScript 的一个高级类型
他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
*/
namespace g {
    type Record<K extends keyof any, T> = {
        [P in K]: T;
    };

    function mapObject<K extends string | number, T, U>(obj: Record<K, T>, map: (x: T) => U): Record<K, U> {
        let result: any = {};
        for (const key in obj) {
            result[key] = map(obj[key]);
        }
        return result;
    }
    let names = { 0: 'hello', 1: 'world' };
    let lengths = mapObject<string | number, string, number>(names, (s: string) => s.length);
    console.log(lengths);//{ '0': 5, '1': 5 }


    type Point = 'x' | 'y';
    type PointList = Record<Point, { value: number }>
    const cars: PointList = {
        x: { value: 10 },
        y: { value: 20 },
    }
}
export { }