/**
 * 当我们写一个类时，会得到2个类型
 * 1. 构造函数类型的函数类型
 * 2. 类的实例类型
 */
namespace a {
  class Component {
    static myName: string = '静态名称属性'
    myName: string = '实例名称属性'
  }
  // Component类名本身表示的是实例的类型
  // ts 冒号后面的是类型，=后面的是值
  
  let c: Component = new Component()
  let f: typeof Component = Component
}