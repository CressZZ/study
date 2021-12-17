
--- 
# 다시 처음으로 돌아가자! 그러니까 바벨은 문법 변환기인데, 플러그인이 없으면 아래의 문법도 변환 안해준다.
```js
// Input
var a = 1;
var b = 2;

if (a === 1) {
  var a = 11; // 전역 변수
  let b = 22; // if 블록 변수

  console.log(a);  // 11
  console.log(b);  // 22
}

console.log(a); // 11
console.log(b); // 2

```
# 그런데 만약 @babel/plugin-transform-block-scoping 이라는 플러그인을 설정 했다고 해보자 
- 그럼 변환해준다
```json
{

    "plugins": [
        ["@babel/plugin-transform-block-scoping"]
    ]
}
```
```js
// Input
var a = 1;
var b = 2;

if (a === 1) {
  var a = 11; // 전역 변수
  let b = 22; // if 블록 변수

  console.log(a);  // 11
  console.log(b);  // 22
}

console.log(a); // 11
console.log(b); // 2
```

```js
// Output
var a = 1;
var b = 2;

if (a === 1) {
  var a = 11; // 전역 변수

  var _b = 22; // if 블록 변수

  console.log(a); // 11

  console.log(_b); // 22
}

console.log(a); // 11

console.log(b); // 2

```

# 여기까지는 뭐... 그리고 이 플러그인을 환경에 따라 필요한걸 넣어주는게 prest-env 이다. 
- 환경이라 함은 `targets` 이거나(우선 반영됨) `browserslist` 이다.
```json
{
    "presets": [
        [
            "@babel/env",
            {
                "targets": "ie 10"
            }
        ]
    ]
}
```

# prest-env 는 그뿐만 아니라 core-js와 regenerator-runtime/runtime => 폴리필을 가지고 있어서 필요에 따라 넣어 줄수 있다. (useBuildIns 를 활용해서)
# 여기까지도 뭐.. 다 아는 이야기 그런데 한번 class 를 트렌스파일링 한다고 생각해 보자 
- 필요한 플러그인은 `@babel/plugin-transform-classes` 이다. 
- 물론 `@babel/preset-env` 로 할수도 있고..
```js
// Input

class Person {}

```

```js
// Output
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

let Person = /*#__PURE__*/_createClass(function Person() {
  _classCallCheck(this, Person);
});
```

이상한 함수 3개가 위에 선언되어 있다. 
let 을 var로 변경하는 것과 달리, class 를 변환하는 것은 보다 복잡하기 때문에 `helper`!! (중요) 함수가 필요한 것이다. 
일반적으로 바벨은 이렇게 헬퍼 함수를 넣는다.

# 그런데 모듈 형식으로 여러게의 파일에 class 문법을 쓴다면
a.js 에도 위의 헬퍼 함수가, 
b.js 에도 위의 헬퍼 함수가 들어간다. 

webpack 으로 말아도 마찬가지이다. 
헬퍼함수가 파일마다 들어가있기 때문에, 빌드되 파일에도 모듈갯수(파일갯수) 만큼 헬퍼 함수가 정의 되어 버린다. 

# 이때 필요한게 @babel/transform-runtime 정식명칭은 @babel/plugin-transform-runtime 이다
- plugin-transform-runtime 을 사용하면 아래와 같이 트렌스 파일링 되어서, 웹펙으로 말면 헬퍼 함수를 모듈로 말아 버리기때문에 한번만 정의 되는걸로 끝낼수 있다. 
```js
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var Person = /*#__PURE__*/(0, _createClass2.default)(function Person() {
  (0, _classCallCheck2.default)(this, Person);
});
```

여기서 헬퍼함수의 모듈을 잘 보면 `@babel/runtime` 이란 곳에서 끌고 온것을 볼수 있는데, 
`@babel/plugin-trnasform-runtime` 이 `@babel/runtime`을 사용하는 것이다. 
즉 플러그인은 바벨과 `@babel/runtime`을 연결해주는 역할을 할뿐, 핵심 기능은 `@babel/runtime`이 가지고 있는 것이다.!! 햇갈리고 중요함!

# 그럼 폴리필 관련해서 정리 해보자
## @babel/polyfill
- core-js/stable 와 regenerator-runtime/runtime 을 가지고 있다.
### core-js
JavaScript용 모듈식 표준 라이브러리. 2021년까지 ECMAScript용 폴리필 포함: 약속, 기호, 컬렉션, 반복자, 형식화된 배열, 기타 여러 기능, ECMAScript 제안, 일부 교차 플랫폼 WHATWG/W3C 기능 및 URL과 같은 제안. 필요한 기능만 로드하거나 전역 네임스페이스 오염 없이 사용할 수 있습니다.

### regenerator-runtime/runtime
This package implements a fully-functional source transformation that takes the syntax for generators/yield from ECMAScript 2015 or ES2015 and Asynchronous Iteration proposal and spits out efficient JS-of-today (ES5) that behaves the same way.

## @babel/runtime with corejs2/corejs3
- with corejs2/corejs3 이 굉장히 중요하다. 
- @babel/runtime 은 regenerator-runtime 폴리필만 가지고 있으나,
- @babel/runtime-corejs2, @babel/runtime-corejs3 는 corejs 도 가지고 있다. 

# 그런데 generator 함수의 폴리필을 삽입하려면 (폴리필을 regenerator-runtime) 반드시 문법 변환 부터 해야줘야 한다. 
- generator 함수의 독특한 점인데, 
- generator 함수는 우선 `@babel/plugin-transform-regenerator` 이 있거나, `@babel/env` 을 통해 문법변환을 하여야
- 전역 혹은 지역(`@babel/plugin-transform-runtime`을 사용하여 `@babel/runtime` 을 사용한경우)적으로 `regeneratorRuntime`을 정의할것이고, 
- 이 `regeneratorRuntime`이 정의 되면 이제 이거에 대한 폴리필이 필요한데!
- 여기서 `regenerator-runtime` 폴리필이 필요해진다.

- 잘보면 아래 helper 는 말그대로 문법 헬퍼이고 나머지는 폴리필이다
```js

// Output - ["@babel/transform-runtime", {"corejs":3}], 
var _regeneratorRuntime2 = require("@babel/runtime-corejs3/regenerator"); // 폴리필
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault"); // 헬퍼
var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes")); // 폴리필
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator")); // 폴리필
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass")); // 헬퍼
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck")); // 헬퍼
```

```js

// Output - ["@babel/transform-runtime", {"corejs":3}], 
require("core-js/modules/es.array.includes.js");// 폴리필
require("core-js/modules/es.string.includes.js");// 폴리필
require("regenerator-runtime/runtime.js");// 폴리필

var _marked = /*#__PURE__*/regeneratorRuntime.mark(foos);

// 헬퍼
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
// 헬퍼
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
// 헬퍼
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }```
```

## @babel/runtime 
@babel/runtime is a library that contains Babel modular runtime helpers and a version of regenerator-runtime.

## @babel/runtime-corejs2
@babel/runtime-corejs2 is a library that contain's Babel modular runtime helpers and a version of regenerator-runtime as well as core-js

## @babel/runtime-corejs3
corejs: 3 also supports instance properties (e.g. [].includes).

## 음....regenerator runtime에 대해서 
```js
// Otput - "@babel/transform-runtime" 이 없고 "@babel/plugin-transform-regenerator" 이 없으면 
function* foos() {}
```
```js
// Otput - "@babel/transform-runtime" 이 있고 "@babel/plugin-transform-regenerator" 이 없으면 
function* foos() {}
```
```js
// Otput - "@babel/transform-runtime" 이 없고 "@babel/plugin-transform-regenerator" 이 있으면 
// regeneratorRuntime 의 정의가 없다.
var _marked = /*#__PURE__*/regeneratorRuntime.mark(foos);

return regeneratorRuntime.wrap(function foos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```
```js
// Otput - "@babel/transform-runtime" 이 있고 "@babel/plugin-transform-regenerator" 이 있으면 
import _regeneratorRuntime from "@babel/runtime/regenerator";

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(foos);
function foos() {
  return _regeneratorRuntime.wrap(function foos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```
```js
// Otput - "@babel/env"가 있고, useBuiltIns 없고, "@babel/plugin-transform-regenerator" 이 있으면 
// regeneratorRuntime 의 정의가 없다.
var _marked = /*#__PURE__*/regeneratorRuntime.mark(foos);

return regeneratorRuntime.wrap(function foos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```
```js
// Otput - "@babel/env"가 있고, useBuiltIns 있고, "@babel/plugin-transform-regenerator" 이 있으면 

require("regenerator-runtime/runtime.js");
var _marked = /*#__PURE__*/regeneratorRuntime.mark(foos);

return regeneratorRuntime.wrap(function foos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```
```js
// Otput - "@babel/env"가 있고, useBuiltIns 없고, "@babel/plugin-transform-regenerator" 이 있으면 
// regeneratorRuntime 의 정의가 없다.
var _marked = /*#__PURE__*/regeneratorRuntime.mark(foos);

return regeneratorRuntime.wrap(function foos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```


# [https://github.com/babel/babel/issues/9853](https://github.com/babel/babel/issues/9853) 에서 말한 내용중

> Babel includes helpers from @babel/runtime! These helpers can depend on some global features to be available. In this case, that feature is Promise. The code in @babel/runtime/helpers/asyncToGenerator uses Promises!. Now you may think: But with useBuiltIns: 'usage' I included polyfills for my targeted browsers?. Yes, that's true, but with that config babel includes polyfills when you use that feature in your code! And you haven't used Promise anywhere! Now you have a problem. You need a way to transpile the babel helpers, and that's not good. This is the case that @zloirock refers to, when he says that you need to transpile the helpers. You will get away here if you use Promise in your app, because then globally pollutable polyfill for Promise will be injected like this: require("core-js/modules/es6.promise"); As you can see, this is not predictable, and very difficult to configure. Note about the cases where I said that you will get away if you have @babel/runtime-corejs3 or @babel/runtime-corejs2 as dependencies instead of @babel/runtime. In this case polyfills from core-js-pure will be injected, like this: var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator")); (corejs option should be set on @babel/transform-runtime as well)

내용을 살펴보자

- 내가 `async` 문법을 사용하고, 
- `@babel/plugin-transform-runtime` 을 사용하고, 
- `corejs` 옵션 없이
- `@babel/runtime` 을 사용한다고 했을때 
- 아 물론 플러그인으로 `@babel/plugin-transform-async-to-generator` 을 사용하고 있거나
- `preset-env`를 사용하여 플러그인을 자동으로 넣어준다고 했을때, 
- 바벨은 플러그인을 통하여 `async` 문법을 `generator`로 변환 할것이고, 
- 원래는 플러그인이 헬퍼 함수를 만들어서 코드에 직접 삽일 할것이지만,
- `@babel/plugin-transform-runtime` 은 `generator`로 변환하는 플러그인을 헬퍼 모듈인 `require("@babel/runtime/helpers/asyncToGenerator")` 로 바꿔서 사용 할것이다. 
- 그런데 `async` 문법을 `generator` 로 변환하는 헬퍼 함수 및 헬퍼 모듈은 내부적으로 `promise`를 사용해야 하는데, 
- 아무리 `preset-env (useBuildIns)`를 사용했다 하더라고, 
- 헬퍼 함수는 변경 할수 있는데 (코드에 프로미스가 있으니까?) 헬퍼 모듈안에 있는 Promise 는 감지 할수 없어서, Promise 에 대한 폴리필을 넣을수 없다는 이야기 이다. 
  
- 일단 위의 이야기 범위에서는 벗어난 이야기이지만, 일단 향후 프로세스를 설명하면
- `generator` 로 변환된 내용을 다시 
- `@babel/plugin-transform-regenerator` 이 있거나, `@babel/env` 을 통해
- `regeneratorRuntime`을 정의할것이고, 
- 이 `regeneratorRuntime`이 정의 되면 이제 이거에 대한 폴리필이 필요한데!
- 여기서 `regenerator-runtime` 폴리필이 필요해진다.
-  `regenerator-runtime`가 감지 되었으므로 `@babel/runtime` 은 혹은 `preset-env`는  `regenerator-runtime/runtime` 폴리필을 추가 할것이다.

# 만약 preset-env corejs3 과 @babel/plugin-transform-runtime corejs3을 같이 사용하면?
- @babel/plugin-transform-runtime  이 이긴다. (지역적으로 폴리필과) 헬퍼 함수를 넣는다는 이야기

# 몰론  preset-env corejs3 과 @babel/plugin-transform-runtime (corejs 없이) 을 같이 사용하면?
- @babel/plugin-transform-runtime 에 corejs 옵션이 생략되어 있으니까, `regenerator-runtime` 을 제외한 폴리필은 preset-env 에 의해 전역으로 들어간다. 

