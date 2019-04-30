"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldSet(receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } var descriptor = privateMap.get(receiver); if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

class Test {
  constructor() {
    _increaseAge.add(this);

    _defineProperty(this, "property", 1);

    _defineProperty(this, "method", function () {
      console.log(this.property);

      _classPrivateMethodGet(this, _increaseAge, _increaseAge2).call(this);

      console.log('age:', _classPrivateFieldGet(this, _age));
    });

    _age.set(this, {
      writable: true,
      value: 19
    });
  }

}

var _age = new WeakMap();

var _increaseAge = new WeakSet();

var _increaseAge2 = function _increaseAge2() {
  var _this$age;

  _classPrivateFieldSet(this, _age, (_this$age = +_classPrivateFieldGet(this, _age)) + 1), _this$age;
};

const test = new Test();