function readonly (target, name, descriptor) {
  descriptor.writable = false
  return descriptor
}
class Person {
  constructor () {
    this.first = 'A'
    this.last = 'B'
  }

  @readonly
  name () {
    return `${this.first} ${this.last}`
  }
}

var p = new Person()
console.log(p.name())
p.name = function () {return '1'}