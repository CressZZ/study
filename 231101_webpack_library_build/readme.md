# Webpack 으로 npm library 빌드 할때의 이슈

# 온갖곳에서 아래와 같이 세팅 하라고 한다
```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'test.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'test',
      type: 'umd',
    },
    libraryExport: 'default',
    globalObject: 'this',
  },
  mode: 'production',
};

```


- 일단 세세한건 넘어가고, 
- 위와 같이 하면 일단 된다. export default 가 되기 때문에, 프로젝트에서 `import test from 'test'` 라고 하면 잘 동작 한다. 
- 문제는 두가지 이다. 
- entry 에 배열로 다른 .js 파일을 여러개 넣을경우
- entry 에 배열로 .css 를 넣고, 플러그인으로 `mini-css-extract-plugin` 을 썻을 경우

# mini-css-extract-plugin 의 경우 

## mini-css-extract-plugin 썼을때 빌드 결과 
```js

	var __webpack_exports__ = {};

	(() => {
    /** 문제 코드 */
	var __webpack_exports__ = {};
	__webpack_require__.r(__webpack_exports__);
	__webpack_require__.d(__webpack_exports__, {
		"default": () => (__WEBPACK_DEFAULT_EXPORT__)
	});
	const __WEBPACK_DEFAULT_EXPORT__ = ({name: 'test'});

	})();

/** 문제 코드 */
	(() => {
	__webpack_require__.r(__webpack_exports__);
	})();

	__webpack_exports__ = __webpack_exports__["default"];
/** // 문제 코드 */

	return __webpack_exports__;
})()

```

## 안썼을때 결과
```js

	var __webpack_exports__ = {};

	(() => {
	__webpack_require__.r(__webpack_exports__);
	__webpack_require__.d(__webpack_exports__, {
		"default": () => (__WEBPACK_DEFAULT_EXPORT__)
	});
	const __WEBPACK_DEFAULT_EXPORT__ = ({name: 'test'});

	__webpack_exports__ = __webpack_exports__["default"];
	})();

	return __webpack_exports__;
})()
;

```


- mini를 썼을때를 보면 __webpack_exports__ 의 할당이 스코프가 이상하게 나온것을 볼수 있다. 
- 전역에 한번 선언되고, 그걸 계속 사용해서 선언해야 하는데, 첫번째 주석의 `문제코드` 와 같이 IIEF 에 ㄷ른 스코프로 같은 이름의 변수가 선언외고, 거기에 할당을 하고, 
- 이후에 return은 전역에 선언될걸 리턴 해버리니까 빈 객체가 리턴된다. 
- 거기다가 중간의 `문제코드` 를 보면, 저거 mini 때문에 생긴 IIEF 인데, 이상한게 하나 더생긴다. 하나 더생기건 entry 가 두개라서 그렇다. 
- 안 썼을때를 보자. 전역에 한번만 `__webpack_exports__` 이 선언되고, `__webpack_exports__`에 값이 할당되고 그게 리턴된다. 
- 잘동작 한다. 

# entry 에 배열로 다른 .js 파일을 여러개 넣을경우

```js
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./js/md-share/App.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({name: 'test'});

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*****************************!*\
  !*** ./js/md-share/App2.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({name: 'test2'});

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()

```

- 이렇게 IIEF가 두개 생성되고, 
- 첫번째 에는 __webpack_exports__ 변수가 다른 스코프로 하나더 생기는데, 또 희안하게 두번째에는 __webpack_exports__ 변수가 생기지는 않는다. 그럼 전역에 있는걸 가져다 쓸태고, 
- 마지막 줄의 `__webpack_exports__ = __webpack_exports__["default"];` 이부부은 전역 변수의 __webpack_exports__ 를 사용 하며ㅡ 
- 아무튼 ` const __WEBPACK_DEFAULT_EXPORT__ = ({name: 'test2'});` 이게 default export 로 되어 버린다. 

# 결론
- 모듈 만들거면 
- entry 는 하나만 쓰던가
- 롤업으로 넘어가던가