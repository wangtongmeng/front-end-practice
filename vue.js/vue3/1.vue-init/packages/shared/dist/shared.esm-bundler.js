function isObject(val) {
    return typeof val == 'object' && val !== null;
}
// ...
function hasChanged(oldValue, newValue) {
    return oldValue !== newValue;
}
var isArray = Array.isArray;
var extend = Object.assign;
var isIntegerKey = function (key) {
    return parseInt(key) + '' === key;
};
var hasOwn = function (target, key) { return Object.prototype.hasOwnProperty.call(target, key); };

export { extend, hasChanged, hasOwn, isArray, isIntegerKey, isObject };
//# sourceMappingURL=shared.esm-bundler.js.map
