var foo = 'bar'

function add(x, y) {
  return x + y
}
module.exports = 'hello'
module.exports = function (x, y) {
  return x + y
}
module.exports = {
  add: function () {
    return x + y
  },
  str: 'hello'
}