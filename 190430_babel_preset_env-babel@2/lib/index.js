"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// import "core-js";
// import "regenerator-runtime/runtime";
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
} // import "./babelTest";
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
if (a === 1) (void 0)._node.find('iframe').attr('src', ''); // exports.Modal = 1;