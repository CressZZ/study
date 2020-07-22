/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./util.js");

let products = [{
  name: 'product_1',
  price: 1000,
  quantity: 3
}, {
  name: 'product_2',
  price: 2000,
  quantity: 4
}, {
  name: 'product_3',
  price: 1500,
  quantity: 2
}, {
  name: 'product_4',
  price: 1200,
  quantity: 5
}, {
  name: 'product_5',
  price: 4200,
  quantity: 3
}];

const add = (a, b) => a + b;

const sum = Object(_util__WEBPACK_IMPORTED_MODULE_0__["curry"])((f, iter) => Object(_util__WEBPACK_IMPORTED_MODULE_0__["go"])(iter, Object(_util__WEBPACK_IMPORTED_MODULE_0__["map"])(f), Object(_util__WEBPACK_IMPORTED_MODULE_0__["reduce"])(add))); // go( products, map(p=>p.quantity), reduce(add), log )

const total_quantity = sum(p => p.quantity);
const total_price = sum(p => p.price);
Object(_util__WEBPACK_IMPORTED_MODULE_0__["log"])('total_quantity :', total_quantity(products), '\ntotal_price : ', total_price(products));

/***/ }),

/***/ "./util.js":
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/*! exports provided: curry, reduce, map, go, pipe, filter, log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curry", function() { return curry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return reduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "go", function() { return go; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
// iterable : iterator 객체를 리턴하는 [Symbol.iterator] 메서드를 가지고 있는 객체
// iterator : next() 메서드를 통해 {valule, done} 를 리턴하는 객체
// Well Fomred Iterator : 자기자신을  리턴하는 [Symbol.iterator] 메서드를 가지고 있는 iterator
// generator : Well Fomred Iterator을 반환하는 함수 / iterator이자 iterable을 반환하는 함수,
// curry : 함수를 받아서 함수를 리턴한 후, 이후 인자를 받으면, 인자가 원하는 갯수일 경우 함수를 실행한다. 
const curry = f => function (a) {
  for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arg[_key - 1] = arguments[_key];
  }

  return arg.length ? f(a, ...arg) : function () {
    for (var _len2 = arguments.length, arg2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      arg2[_key2] = arguments[_key2];
    }

    return f(a, ...arg2);
  };
}; // reduce: 반복할 함수, 초기값, 이터럴을 받아서 누적값을 구한다.

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(a, acc); // 인자로 받은 함수를 '현재 값'과 '누적 값'을 인자로 실행한다. 
  }

  return acc;
}); // map

const map = curry((f, iter) => {
  let res = [];

  for (const e of iter) {
    res.push(f(e));
  }

  return res;
}); // go : [하나의 값과, 함수들]로 이루어진 인자들을 배열로 바꾼다음에 reduce의 iter매개변수에 던지고,
// iter에 있는 함수를 누적값으로 실행하는 함수 

const go = function go() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return reduce((a, acc) => a(acc))(args);
}; // pipe : go함수를 함수 팩토리 취급하여 go 함수를 만드는데, 인자로는 초기값을 던지는 함수를 만든다. 

const pipe = function pipe(firstFs) {
  for (var _len4 = arguments.length, fs = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    fs[_key4 - 1] = arguments[_key4];
  }

  return function () {
    return go(firstFs(...arguments), ...fs);
  };
}; // filter

const filter = curry((f, iter) => {
  let res = [];

  for (const e of iter) {
    f(e) && res.push(e);
  }

  return res;
});
const log = function log() {
  return console.log(...arguments);
};

/***/ })

/******/ });
//# sourceMappingURL=main.js.map