// bind
{
  var bar = function () {
    console.log(this.x);
  }
  var foo = {
    x: 3
  }
  bar(); // undefined
  var func = bar.bind(foo);
  func(); // 3
}

// apply、call、bind比较
{
  var obj = {
    x: 81,
  };

  var foo = {
    getX: function () {
      return this.x;
    }
  }

  console.log(foo.getX.bind(obj)()); //81
  console.log(foo.getX.call(obj)); //81
  console.log(foo.getX.apply(obj)); //81
}