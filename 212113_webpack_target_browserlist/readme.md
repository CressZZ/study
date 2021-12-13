```js
// webpack.config.js

module.exports = {
    mode:'development',
    target: ['web', 'es6'],
    devtool: 'source-map'
}

```

```text
// browserslist

IE 11
```
# 맨날 햇갈리는거
wbepack의 target 은 웹팩이 생성하는 코드에 대한 타겟이다. 
내가 작성한 코드는 바벨등을 통해서 트렌스파일링 된는거지 웹펙의 target에 따라 변경되지 않는다. 
babel-loader 가 없으면 내가 작성한 코드 그대로 들어간다. 

그럼 webpack 이 생성하는 코드는 무엇이냐 하면 
모듈 시스템을 구축하기 위한 코드 이다. 
음... 예를 들면 웹팩으로 빌드된 파일의 첫줄이 바로 그것인데

아래 코드에서 IEEF 함수가 화살표 함수인지 아닌지는 webpack.config.js 의 target 설정에 따른다. 

만약 target 이 node 라면 모듈 시스템을 함수로 구현하지 않고 그냥 commonJs를 써서 빌드 뒤는 것 같다. (이거 잘 모르겠음 )


```js

// dist/main.js

/******/ (function() { // webpackBootstrap <=== 이부분!!!!
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/a.js":
/*!******************!*\
  !*** ./src/a.js ***!
  \******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const a = 4;

```



# 결론
결론적으로 웹팩의 target이 우선이다. 

웹팩의 target 이 `target: ['web', 'es6']` 이면 browserslist 파일에 문법 애러가 있어도, browserslist 파일 자체를 참조 하지 않는다. 

웹펙의 target이 `target: ['web']` 처럼 es 버전이 없어도 browserslist 파일 자체를 참조 하지 않고 그냥 es6로 보는것 같다 (웹펙이  arrowfunctio 사용 )

웹팩의 target 이없어야 browserslist를 참조 한다. 
