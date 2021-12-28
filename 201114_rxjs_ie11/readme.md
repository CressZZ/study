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


# 정리
일단 위 내용이 이슈였는데, 결국 node_moduels 의 rxjs의 의존모둘인 immediate.js 의 promise 을 어떻게 polyfill을 적용 할거냐의 문제이다. 

## 전역 polyfill 사용
바닦페이지에 bluebird.js 같은거 하나면 충분

## babel 사용
바베에서 preset-env 옵션중 useBuiltIns 을 디폴트 값인 `false` 로 놓고 바벨을 적용하려면 수동으로 `core-js` 와 `regenerator-runtime` 을 수동으로 넣어줘야 하고, 그렇게 되면 이건 전역으로 들어간다. 

사실 `fasle` 고 `usage` 고 다 전역으로 들어 가니까 아무튼 이거만 쓰면 rxjs 도 폴리필이 적용된다. 
(*추가: 200424_babelrc 쪽 보면 알겠지만, babel 이 node_module에 있는것도 트렌스 파일링 하려면 .babelrc 가 아니라 babel.config.js 파일을 사용해야 한다. (덤으로 웹펙에서 include옵션으로 node_modules/rxjs/ 도 넣어 줘야 하고) )

문제는 바벨에서 `transform-runtime` 을 사용할 경우이다. 
이건 전역변수가 아니라, 모듈을 사용하는 그곳에 polyfill 을 지역 변수로 만들어 버리니, 다른 스코프에서는 사용할수가 없다. 

## 그런데 이번에 문제가 생긴건 이거다
문제가 생긴 두 프로젝트 모두 `@babel/preset-env` 는 사용하지만, `babel-poylfill` 또는 `core-js`, `regenerator-runtime` 을 따로 import 하여 사용하고 있지 않았다. 그렇다고 `builtIn` 옵션에 `usage`를 넣은 것도 아니어서 자동으로 import 된것도 아니었다.
결국 바벨이 es6 이상의 메서드 문법은 transfile 해주지도 않고 있었다는 이야기다. 
아니 근데 promise 도 안쓸수 있나? 라고 생각이 들수 있다. 
promise 는 두 프로젝트 모두 `promise-polyfill.js` 개별적으로(필요한 곳에 import 해서) 사용 하고 있었다. 두둥!
결국 바벨이 polyfill 해주는 곳은 아무데도 없었다 라는 이야기
........그렇다는 이야기!!!



