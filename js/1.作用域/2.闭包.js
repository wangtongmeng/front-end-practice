var lastA;
var lastD;
function one() {
    var a = { name: 1 };
    var name = 'one';
    function two() {
        var b = 2;
        var name = 'two';
        function three() {
            var c = 3;
            var name = 'three';
            return () => {
                var d = { name: 4 };
                console.log(a === lastA, d === lastD);
                lastA = a;
                lastD = d;
                console.log(a, b, c, d);
            }
        }
        return three();
    }
    return two();
}
var fn = one();
fn();
fn()
fn();

//
let globalEC = {
    this: globalThis,
    outer: null,
    VE: { one: () => { }, fn: undefined }
}
//globalEC.VE.fn = globalEC.VE.one();
let oneEC = {
    outer: globalEC,
    VE: { a: 1, two: () => { } }
}

let twoEC = {
    outer: oneEC,
    VE: { b: 2, three: () => { } }
}

let threeEC = {
    outer: twoEC,
    VE: { c: 3 }
}
var closures = [{ c: 3 }, { b: 2 }, { a: 1 }];
let fnEc = {
    outer: globalEC,
    closures,
    VE: { d: 4 }
}
console.log(getValue('a', fnEc), getValue('b', fnEc), getValue('c', fnEc));
let fnEc2 = {
    outer: globalEC,
    closures,
    VE: { d: 4 }
}
function getValue(name, ec) {
    if (name in ec.VE) {
        return ec.VE[name];
    }

    for (let i = ec.closures.length - 1; i >= 0; i--) {
        if (name in ec.closures[i]) {
            return ec.closures[i][name];
        }
    }

    if (ec.outer) {
        return getValue(name, ec.outer);
    }
    return null;
}