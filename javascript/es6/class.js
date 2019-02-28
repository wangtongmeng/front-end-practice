class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  class Bar extends Foo {
    static lalal() {
      return super.classMethod() + ', too';
    }
  }
  
  Bar.lalal() // "hello, too"
  console.log(  Bar.lalal() )
  console.log(Bar.classMethod())