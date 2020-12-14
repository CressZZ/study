RXJS의 버전 변경 ( rxjs: ^6.5.2 - package.json) : ^은 6.9.9 까지 자동으로 버전을 올림
기존 : < v6.5.4
이슈가 생기는 버전 : >= v.6.5.4
RXJS의 버전이 올라가면서 RXJS내부에서 Promise.resolve() 를 즉시 실행 함수로 사용하도록 변경
https://github.com/ReactiveX/rxjs/issues/5470
RXJS자체에는 애초에 Promise 폴리필이 없었으며, 아마도 popup-0.0.4.min.js에 바벨로 Promise가 전역으로 폴리필 되어 있었고,( https://github.com/ReactiveX/rxjs/issues/5358 )
Promise.resolve() 가 즉시 실행이 아니고  popup-0.0.4.min.js 로딩후에 실행되어었기 때문에 정상 동작 했던 것으로 보임
일단 버전을 내리면 정상 동작 함
나중에 이슈가 또 발생시, search.js 에 promise폴리필을 전역으로 넣어 주는 방법 또는 bluebird.js 를 html 에서 호출 하면 될것 같음
 

참고로 이슈가 생기는 버전인  >= v.6.5.4 에서 애러 나는 상황을 보면 
검색을 할때(즉, search.js를 사용하는 페이지)는 항상 애러가 나는데,
태그검색을 할때(즉, tag.js를 사용하는 페이지)는 간헐적으로 애러가 나는것을 확인했는데, 
search.js를 사용하는 페이지에서는 Promise가 전역으로 선언되었을거라고 생각되는 popup-0.0.4.min.js  파일을 동적으로 로딩하는 파일인 cnb.js 가 search.js 보다 나중에 불러오게 되어 있고, 
tag.js를 사용하는 페이지에서는 cnb.js 가 search.js 보다 먼저 불러오게 되어 있다. 
 

 

 

 

If you would like to add a global Promise object (Node or Browser) if native Promise doesn't exist (polyfill Promise). Use the method below. This is useful it you are building a website and want to support older browsers. Javascript library authors should NOT use this method.
 import 'promise-polyfill/src/polyfill';
—

AFAICT, prior to that change you would still have needed a polyfill, as RxJS does not provide one. The change you referenced necessitates that Promise needs to be polyfilled before RxJS is loaded, but that is what applications should be doing anyway, so IMO this is not a bug.

--- 

This is not a bug.

IE11 does not support Promise. If you want to use RxJS in a application that has to support IE11, you will have to polyfill Promise yourself. It is not the responsibility of packages - like RxJS - to polyfilll features that were incorporated into the JavaScript language in 2015.