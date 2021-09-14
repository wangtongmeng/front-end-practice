


/* 属性装饰器 */
/* 
属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数
属性装饰器用来装饰属性
  第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  第二个参数是属性的名称
方法装饰器用来装饰方法
  第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  第二个参数是方法的名称
  第三个参数是方法描述符

*/

namespace d {
  //修饰实例属性
  function upperCase(target: any, propertyKey: string) {
      let value = target[propertyKey];
      const getter = function () {
          return value;
      }
      // 用来替换的setter
      const setter = function (newVal: string) {
          value = newVal.toUpperCase()
      };
      // 替换属性，先删除原先的属性，再重新定义属性
      if (delete target[propertyKey]) {
          Object.defineProperty(target, propertyKey, {
              get: getter,
              set: setter,
              enumerable: true,
              configurable: true
          });
      }
  }
  //修饰实例方法
  function noEnumerable(target: any, property: string, descriptor: PropertyDescriptor) {
      console.log('target.getName', target.getName);
      console.log('target.getAge', target.getAge);
      descriptor.enumerable = true;
  }
  //重写方法
  function toNumber(target: any, methodName: string, descriptor: PropertyDescriptor) {
      let oldMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
          args = args.map(item => parseFloat(item));
          return oldMethod.apply(this, args);
      }
  }
  class Person {
      @upperCase
      name: string = 'zhangsan'
      public static age: number = 10
      constructor() { }
      @noEnumerable
      getName() {
          console.log(this.name);
      }
      @toNumber
      sum(...args: any[]) {
          return args.reduce((accu: number, item: number) => accu + item, 0);
      }
  }
  let p: Person = new Person();
  for (let attr in p) {
      console.log('attr=', attr);
  }
  p.name = 'lisi';
  p.getName();
  console.log(p.sum("1", "2", "3"));
}

export { }