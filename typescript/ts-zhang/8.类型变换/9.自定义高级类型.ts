/* 
 自定义高级类型
 https://github.com/piotrwitek/utility-types
*/


/* 
Proxy
*/
namespace a {
    type Proxy<T> = {
        get(): T;
        set(value: T): void;
    }
    type Proxify<T> = {
        [P in keyof T]: Proxy<T[P]>
    }
    function proxify<T>(obj: T): Proxify<T> {
        let result = {} as Proxify<T>;
        for (const key in obj) {
            result[key] = {
                get: () => obj[key],
                set: (value) => obj[key] = value
            }
        }
        return result;
    }
    let props = {
        name: 'lisi',
        age: 10
    }
    let proxyProps = proxify(props);
    console.log(proxyProps);

    function unProxify<T>(t: Proxify<T>): T {
        let result = {} as T;
        for (const k in t) {
            result[k] = t[k].get();
        }
        return result;
    }

    let originProps = unProxify(proxyProps);
    console.log(originProps);
}


/* 
SetDifference (same as Exclude)
*/
namespace b {
    type SetDifference<A, B> = A extends B ? never : A;

    type A = string | number;
    type B = number | boolean;
    type AB = SetDifference<A, B>; // 类型是string
}


/* 
Omit
Exclude 的作用是从 T 中排除出可分配给 U的元素.
Omit<T, K>的作用是忽略T中的某些属性
Omit = Exclude + Pick
*/
namespace c {
    type SetDifference<A, B> = A extends B ? never : A;
    type Omit<T, K extends keyof any> = Pick<T, SetDifference<keyof T, K>>;

    type Props = { name: string, age: number, visible: boolean };
    type OmitAgeProps = Omit<Props, 'age'>;
    // {name:string,visible:boolean};
}


/* 
Diff
*/
namespace d {
    type SetDifference<A, B> = A extends B ? never : A;
    type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>;

    type Props = { name: string, age: number, visible: boolean };
    type DefaultProps = { age: number };
    type DiffProps = Diff<Props, DefaultProps>;//{name:string,visible:boolean};
}


/* 
Intersection 交叉属性

*/
namespace e {
    type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>;

    type Props = { name: string, age: number, visible: boolean };
    type DefaultProps = { age: number };
    //type InterProps = Props & DefaultProps;
    type DuplicateProps = InterSection<Props, DefaultProps>;
}

/* 
Overwrite
Overwrite<T, U>顾名思义,是用U的属性覆盖T的相同属性.
mapped-types https://github.com/piotrwitek/utility-types/blob/master/src/mapped-types.ts
*/
namespace f {
    type SetDifference<A, B> = A extends B ? never : A;
    type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>;
    type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>;
    type Overwrite<
        T extends object,
        U extends object,
        // {name: string,visible: boolean }  &  {age:string}  {name: string,visible: boolean,age:string }
        I = Diff<T, U> & InterSection<U, T>
        > = Pick<I, keyof I>


    type OldProps = { name: string, age: number, visible: boolean };
    type NewProps = { age: string, other: string };
    //{ name: string,visible: boolean ,age:string}



    //{ name: string, age: string, visible: boolean };
    //{ name: string, age: string, visible: boolean,other:string };
    //type ReplacedProps = Overwrite<OldProps, NewProps>;
    //type ReplacedProps = OldProps& NewProps;
    type ReplacedProps = Overwrite<OldProps, NewProps>;
    let p: ReplacedProps = { name: '', age: '', visible: true }

}


/* 
Merge
Merge<O1, O2>的作用是将两个对象的属性合并:
Merge<O1, O2> = Compute + Omit<U, T>
*/

namespace g {
    //Compute的作用是将交叉类型合并
    type Compute<A extends any> = A extends Function ? A : { [K in keyof A]: A[K] };
    type Merge<O1 extends object, O2 extends object> = Compute<
        O1 & Omit<O2, keyof O1>
    >;


    type O1 = { id: number; name: string; };
    type O2 = { id: number; age: number; };

    type R1 = Compute<{ x: "x" } & { y: "y" }>;
    type R2 = Merge<O1, O2>;
}


/* 
Mutable
将 T 的所有属性的 readonly 移除
*/
namespace h {
    type Mutable<T> = {
        -readonly [P in keyof T]: T[P]
    }

    type person1 = {
        readonly name: string;
        age: number
    }
    let p: Mutable<person1> = {
        name: 'lisi',
        age: 10
    }
    p.name = 'wangwu'
}
export { }