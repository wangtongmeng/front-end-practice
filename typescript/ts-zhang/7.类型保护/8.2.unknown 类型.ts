// unknown 类型
/* 
就像所有类型都可以被归为 any，所有类型也都可以被归为 unknown。这使得 unknown 成为 TypeScript 类型系统的另一种顶级类型（另一种是 any）
任何类型都可以赋值给unknown类型
*/

{
    let value: unknown;

    value = true;             // OK
    value = 42;               // OK
    value = "Hello World";    // OK
    value = [];               // OK
    value = {};               // OK
    value = Math.random;      // OK
    value = null;             // OK
    value = undefined;        // OK
    value = new TypeError();  // OK
}

// unknown类型只能被赋值给any类型和unknown类型本身
{
    let value: unknown;
    let value1: unknown = value;   // OK
    let value2: any = value;       // OK
    let value3: boolean = value;   // Error
    let value4: number = value;    // Error
    let value5: string = value;    // Error
    let value6: object = value;    // Error
    let value7: any[] = value;     // Error
    let value8: Function = value;  // Error
}
export { }