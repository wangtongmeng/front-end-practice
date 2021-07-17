var User = /** @class */ (function () {
    function User(myname) {
        this.myname = myname;
    }
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this.myname;
        },
        set: function (value) {
            this.myname = value;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
var user = new User('zhangsan');
user.name = 'lisi';
console.log(user.name);
