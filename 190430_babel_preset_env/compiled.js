"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } var descriptor = privateMap.get(receiver); if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

console.log('dd');
new Promise(function () {}); // console.log(var2)

var2 = "d";

function test() {
  return _test.apply(this, arguments);
}

function _test() {
  _test = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return test3();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _test.apply(this, arguments);
}

function test3() {
  console.log('aa');
}

var Test = function Test() {
  var _this = this;

  _classCallCheck(this, Test);

  _age.set(this, {
    writable: true,
    value: 319
  });

  _defineProperty(this, "a", 2);

  _defineProperty(this, "boundFunction", function () {
    return _this.instanceProperty;
  });
};

var _age = new WeakMap();

var Person =
/*#__PURE__*/
function () {
  function Person() {
    _classCallCheck(this, Person);

    _increaseAge.add(this);

    _aged.set(this, {
      writable: true,
      value: 1
    });
  }

  _createClass(Person, [{
    key: "birthday",
    value: function birthday() {
      _classPrivateMethodGet(this, _increaseAge, _increaseAge2).call(this);

      alert("Happy Birthday!");
    }
  }]);

  return Person;
}();

var _aged = new WeakMap();

var _increaseAge = new WeakSet();

var _increaseAge2 = function _increaseAge2() {
  var _this$aged;

  _classPrivateFieldSet(this, _aged, (_this$aged = +_classPrivateFieldGet(this, _aged)) + 1), _this$aged;
};
