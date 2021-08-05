import {a} from './a';

// var ele = document.getElementsByClassName("container")[0];
// console.log(a)
// ele.innerText = `${a}`;


console.log(module.a);
console.log(module.hot);
var ele = document.getElementsByClassName("container")[0];
console.log('ddd');


;( async function(){

  var test = await fetch('/check');
  var test = await fetch('/common/js/lib/jquery-3.1.0.min.js');
  var test = await fetch('https://op-wstatic.ncsoft.com/uikit/preorder/js/preorders-5.1.0.js');

  console.log(await test.json());
  window.console.log('aa')
})();

// ele.innerText = 'sd';

// if (module.hot) {
//   module.hot.accept();

// }
