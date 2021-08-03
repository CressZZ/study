import {a} from './a';

// var ele = document.getElementsByClassName("container")[0];
// console.log(a)
// ele.innerText = `${a}`;


console.log(module.a);
console.log(module.hot);
var ele = document.getElementsByClassName("container")[0];
console.log('ddd');


;( async function(){

  var test = await fetch('http://wstatic-cdn.plaync.com/i18n/preorder-record/en.json');

  console.log(await test.json());
  window.console.log('aa')
})();

// ele.innerText = 'sd';

// if (module.hot) {
//   module.hot.accept();

// }
