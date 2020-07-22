"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function delayPromiseFactory(callback, ms) {
  return new Promise(function (response) {
    setTimeout(function () {
      callback();
      response();
    }, ms);
  });
}

var sayGoodmorning = function sayGoodmorning() {
  console.log('good morning');
};

var sayHi = function sayHi() {
  console.log('hi');
};

var delaySayGoodmoring = delayPromiseFactory(sayGoodmorning, 1000);

function conversation() {
  return _conversation.apply(this, arguments);
}

function _conversation() {
  _conversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            startTimer();
            _context.next = 3;
            return delaySayGoodmoring;

          case 3:
            sayHi();
            endTimer();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _conversation.apply(this, arguments);
}

conversation();
var time = 1;
var timer;

function startTimer() {
  timer = setInterval(function () {
    console.log(time++);
  }, 100);
}

function endTimer() {
  clearInterval(timer);
}