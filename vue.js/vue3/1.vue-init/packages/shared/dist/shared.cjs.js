'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.extend = extend;
exports.hasChanged = hasChanged;
exports.hasOwn = hasOwn;
exports.isArray = isArray;
exports.isIntegerKey = isIntegerKey;
exports.isObject = isObject;
//# sourceMappingURL=shared.cjs.js.map
