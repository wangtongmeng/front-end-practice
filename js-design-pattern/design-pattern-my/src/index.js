class Adaptee {
  specificRequest () {
    return '德国标准插头'
  }
}

class Target {
  constructor () {
    this.Adaptee = new Adaptee()
  }
  request () {
    let info = this.Adaptee.specificRequest()
    return `${info} - 转换器 - 中国标准插头`
  }
}

// 测试
let target = new Target()
let res = target.request()
console.log(res)

