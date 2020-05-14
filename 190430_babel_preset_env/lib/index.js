"use strict";

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("./babelTest");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// import "core-js";
// import "regenerator-runtime/runtime";
// import "./babelTest";
// async function test(){
//     await Promise.all([
//          test2(),
//          test3()
//     ]);
//     console.log('end')
// }
function test2() {
  return new Promise(function (res) {
    setTimeout(function () {
      console.log('done test2');
      res(true);
    }, 2100);
  });
}

// require("./compiled");
// function test3(){
//     return new Promise(res=>{
//         setTimeout(()=>{
//             console.log('done test3')
//             res(true)
//         },2000)
//     })
// }
// test2().then(r=>console.log(r))
// // test()
// console.log('a');
// export const a = 1;
// exports.v = 1;
// console.log(exports);
console.log(_typeof([1, 2]));
var a = 2;
if (a === 1) (void 0)._node.find('iframe').attr('src', '');
exports.Modal = 1;