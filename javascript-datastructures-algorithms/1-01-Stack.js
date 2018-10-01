function Stack() {

    let items = [];

    this.push = function(element){
        items.push(element);
    };

    this.pop = function(){
        return items.pop();
    };

    this.peek = function(){
        return items[items.length-1];
    };

    this.isEmpty = function(){
        return items.length == 0;
    };

    this.size = function(){
        return items.length;
    };

    this.clear = function(){
        items = [];
    };

    this.print = function(){
        console.log(items.toString());
    };

    this.toString = function(){
        return items.toString();
    };
}

let stack = new Stack()
let stack1 = new Stack()
console.log(stack);
console.log(stack1);
stack.push(1)
console.log(stack.size());
console.log(stack1.size());



