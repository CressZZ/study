# 잠깐 햇갈리니까 다시 정리해보자
[babel plugin vs polyfill](https://ui.dev/compiling-polyfills/)
- 바벨은 크게 문법과 기능(메서드) 를 변환해주는 역할을 한다

https://babeljs.io/docs/en/babel-preset-env#how-does-it-work
> JavaScript syntax or browser feature, as well as a mapping of those syntaxes and features to Babel transform plugins and core-js polyfills.

- 플러그인은 문법 을 변환시켜주고 
- 폴리필은 메서드 를 변환(? 혹은 대체) 시켜준다.

# 문법은 플러그인이 가지고 있다. 

# 폴리필은 corejs 와 regenerator-runtime/runtime 이 가지고 있다. 
- corejs 가 대부분 가지고 있는데, 
- 유독 gernerator 관련 폴리필은 페북이 만든 regenerator-runtime/runtime 이 가지고 있다. 

# regenerator-runtime/runtime 에 대해서...
- 가령 아래의 문법이 있다고 보자
```js
async function f() {}
```

- preset-env 를 안쓴다고 하고 아래의 플러그인만 있다고 보자 `@babel/plugin-transform-async-to-generator`
```json
{
    "plugins": [
      "@babel/plugin-transform-async-to-generator"
    ]
}
```

- 그럼 아래와 같이 변환된다
- 말그대로 async 함수를 generator 함수로 변경 하였다.
```js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


function f() {
  return _f.apply(this, arguments);
} 


function _f() {
  _f = _asyncToGenerator(function* () {});
  return _f.apply(this, arguments);
}

```

- 그리고 아래의 플러그인을 추가한다고 하자 `@babel/plugin-transform-regenerator`
```json
{
    "plugins": [
      "@babel/plugin-transform-async-to-generator",  "@babel/plugin-transform-regenerator"
    ]
}
```

```js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


function f() {
  return _f.apply(this, arguments);
} 

function _f() {
  _f = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _f.apply(this, arguments);
}

```

- `_f = _asyncToGenerator(function* () {});` 부분이 아래와 같이 변경됬다. 
- `regeneratorRuntime` 이 추가 된것이다
```js
 _f = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));

```

- 아니 그럼 regeneratorRuntime 은 어디 있는가?
- 바로 여기가 중요한데 regeneraotrRuntime 은 `regenerator-runtime/runtime` 폴리필에 있다.
- 그럼 `regenerator-runtime/runtime`은 어떻게 추가 하는가?

## @babel/plugin-transform-runtime 플러그인 추가
```json
  {"plugins": [
       ["@babel/plugin-transform-runtime"],  "@babel/plugin-transform-async-to-generator",  "@babel/plugin-transform-regenerator"
    ]}

```
- `@babel/plugin-transform-runtime` 문서를 보면 `@babel/plugin-transform-runtime`는 `@babel/runtime` 을 디펜던시로 가지고있고 확용하는데, 
- `@babel/runtime` 이란 문법변환 플러그인을 헬퍼 함수의 모듈로 가지고 있고, 추가로 `regenerator-runtime` 을 가지고 있다고 나온다. 
- 플러그인(전역 오염을 방지하기 위한 핼퍼 모듈)에 더하여 `regenerator-runtime` 폴리필을 가지고 있는것이다. 
  
> @babel/runtime is a library that contains Babel modular runtime helpers and a version of regenerator-runtime. 

- 다시 살펴보면 regenrator 폴리필을 `@babel/runtime/regenerator` 에서 가져오는 것을 볼수 있고, `@babel/plugin-transform-runtime` 의 주요 특징과 같이 전역 변수 (window)를 오염시키지 않고 `_regenerator`라는 변수로 불러오는 것을 볼수 있다.!

```js
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _f() {
  _f = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      //.....

```
- 일단 나중에 중요한 부분으로 언급하겠지만 `@babel/plugin-transform-runtime` 이 가지고 있는 `@babel/runtime`은 `regenerator-runtime` 밖에 가지고 있지 않지만, [@babel/runtime-corejs2](https://babeljs.io/docs/en/babel-runtime-corejs2) 와 [@babel/runtime-corejs3](https://www.npmjs.com/package/@babel/runtime-corejs3) 은 `core-js` 도 가지고 ㅇㅆ다. 
- 위에서 말했듯이 바벨의 폴리필은 두개가 나눠 가지고 있다. `core-js` 와 `regenerator-runtime` 이다. 

# 중요한 점은 왜 두개로 나누어 있을까 하는점인데
- 바벨의 문법은 플러그인이 있어야 적용된다. 
- 폴리필은 그냥 삽입하는거다, 전역변수 (window.Array, window.Proomise) 등을 변환하기 위해서는 문법수정이 필요하지 않고 그냥 전역 변수 오염시키는 모듈만 있으면 된다. 
- 그런데 async 나 regenerator 의 경우에는 
- 문법 변환도 필요하고, 폴리필도 필요하다. 
- regenerator 를 변환 하려면 일단 `plugin-transform-regenerator` 이 있어야 한다. 
- - plugin-transform-regenerator 만 있는경우 generator 함수가 어떻게 변환 되는지 보면 아래와 같다. 즉 1차 적으로 문법이 변경된 것이다

```js
// "@babel/plugin-transform-regenerator"
var _marked = /*#__PURE__*/regeneratorRuntime.mark(foos);

function foos() {
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

- 이 상태에서 우리는 regenrator 에 대한 폴리필이 필요한 것이다. 
- preset-env로 폴리필을 삽입해 보자 (useBuiltIns 설정)
```js
require("regenerator-runtime/runtime.js");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(foos);

function foos() {
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

- 혹은 `@babel/plugin-transform-runtime` 플러그인을 이용해 `@babel/runtime`으로 폴리필을 넣어 보자

```js
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _marked = /*#__PURE__*/_regenerator.default.mark(foos);

function foos() {
  return _regenerator.default.wrap(function foos$(_context) {
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

# async의 경우에는 async 를 generator로 먼저 문법 변환하고, generator 를 다시 문법 변환한후 폴리필을 넣어 줘야 한다. 

# 잠깐 정리하면
- `@babel/plugin-transform-runtime` 은 `@babel/runtime`을 가지고 있는데, `@babel/runtime` 은 주요 폴리필 중(폴리필 모음중) `regenerator-runtime`을 자체 적으로 가지고 있어서, 적절한 문법 변환이 이루어 진다면 자체적으로 폴리필을 **지역적으로** 삽입한다. 라는 이야기 이다. 
(`@babel/runtime` 이 플러그인을 가지고 있지는 않다. `"@babel/plugin-transform-async-to-generator"`,  `"@babel/plugin-transform-regenerator"` 플러그인이 필요하다. )
- `@babel/plugin-transform-runtime` 옵션중 `corejs` 를 수정하여 `@babel/runtime` 대신 `@babel/runtime-corejs2` 등을 활요하면 다른 폴리필 등도 `corejs` 등을 활용하여 **지역적으로** 삽입한다.

# 애초에 폴리필은 플러그인이 아니다 라는것을 다시 확인하면 좋다. 
- 폴리필은 그냥 모듈로 삽입하는거지, 문법 변환 처럼 플러그인으로 동작하는게 아니다. 
- 그래서 babel 초반에 [`@babel/polyfill`](https://babeljs.io/docs/en/babel-polyfill) 을 (자체적으로 `core-js/stable` 과 `regenerator-runtime/runtime` 을 가지고 있음) 작성한 코드 상단에 수동으로 import 해줬던 것이다. (전역을 오염시켜도 OK 라고 보고... 뭐 지금도 그렇지만)

# preset-env 는 이러한 폴리필을 
환경에 맞게 필요한 것만 싹싹 넣어 주는 것이고

# @babel/plugin-transform-runtime (corejs 옵션과 함께사용할경우) 는 사용한 모든 메서드에대한 폴리필을 !지역적으로! 넣어 버린다. 
- 환경 설정이 없다. 타겟이 없다는 이야기이다. Promise 를 사용했으면 Promise에 대한 폴리필을 삽입한다. 
```js
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
_Promise.resolve(1); 
```

# 단 @babel/plugin-transform-runtime 은 자체적으로 문법 변환은 못한다. 플러그인이 있어야 해당 문법에 대한 처리를 일단 플러그인이 하고, 거기에 맞는 헬퍼 모듈을 가지고 오는 식이다. (엄청 중요하고 햇갈린다)

# 다시말하지만 regenerator 도 @babel/plugin-transform-runtime 만 사용하면 아무것도 못한다. 
- 최소한 `"@babel/plugin-transform-regenerator"` 을 플러그인으로 쓰던가, 
- `preset-env`를 사용하여 (플러그인 집합체 이다.) 플러그인이 자동으로 삽입되게 해야!
- 문법 변환후 -> 폴리필이 삽입된다. 
- Promise 같은건 문법 변환 할게 없으니까, 플러그인이 없어도, ` @babel/plugin-transform-runtime` 이 Promise 가 감지되면 알아서 폴리필을 넣어 버린다.




# 그러니까 바벨은 문법 변환기인데, 플러그인이 없으면 아래의 문법도 변환 안해준다.
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
- 폴리필이라기 보다는 메서드를 변환시켜주는 건 runtime, corejs 등으로 불리기도 한다. 
## @babel/polyfill
- core-js/stable 와 regenerator-runtime/runtime 을 가지고 있다.
### core-js
JavaScript용 모듈식 표준 라이브러리. 2021년까지 ECMAScript용 폴리필 포함: 약속, 기호, 컬렉션, 반복자, 형식화된 배열, 기타 여러 기능, ECMAScript 제안, 일부 교차 플랫폼 WHATWG/W3C 기능 및 URL과 같은 제안. 필요한 기능만 로드하거나 전역 네임스페이스 오염 없이 사용할 수 있습니다.

### regenerator-runtime/runtime
This package implements a fully-functional source transformation that takes the syntax for generators/yield from ECMAScript 2015 or ES2015 and Asynchronous Iteration proposal and spits out efficient JS-of-today (ES5) that behaves the same way.

## @babel/runtime
위에서는 플러그인 으로 쓰인거 아니냐? 라고 할지 몰라도
- 일단 바벨 프리셋에 의해서(혹은 수동으로) 플요한 플러그인이 삽입되면
- 그 플러그인에 따라 헬퍼 함수를 모듈로 불러오는 역할을 하는 것이다. 

그리고 추가로!
- regenerator-runtime의 헬퍼 함수도 가지고 있다.
  
왜 럼타임 헬퍼와 regenerator-runtime 를 나누어서 설명했을까?
> @babel/runtime is a library that contains Babel modular runtime helpers and a version of regenerator-runtime.

모르겠는데;;

아무튼 바벨 폴리필에서 regenerator 는 특별한 위치를 갖는다. (페북에서 만들어서?)

아무튼 regenerator-runtime 헬퍼 모듈을 가지고 있는거니까 사용하려면 regeneraotr 플러그인인  "@babel/plugin-transform-regenerator" 이 있거나, @babel/env 를 가지고 있어야 한다. 
@babel/env 는 corejs 와 더불어 regenerator-runtime/runtime 을 가지고 있기 때문이다. 

그러니까.. 정리하면 "@babel/transform-runtime"] 은 폴리필을 가지고 있는게 아니라
폴리필을 위한 헬퍼 함수 모듈을 가지고 있는거다!

아니다!!!!!!!!!!!!!!!!!!!!! 

regenerator-runtime를 헬퍼함수로 가지고 있는게 아니라 
그냥 폴리필을 가지고 있는 거다. 

이건 메서드 폴리필 개념이므로 헬퍼 형식의 모듈이 아니라
항상 모듈 형식이다! 

메서드의 폴리필이 항상 메서드인것 처럼

그래서 잘보면 아래 helper 는 말그대로 문법 헿퍼이고 
나머지는 폴리필이다
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
- 아씨...맞나?
  
- 일단 위의 이야기 범위에서는 벗어난 이야기이지만, 일단 향후 프로세스를 설명하면 `generator`가 감지 되었으므로 `@babel/runtime` 은 혹은 `preset-env`는 `regenerator-runtime/runtime` 폴리필을 추가 할것이다.

# 만약 preset-env corejs3 과 @babel/plugin-transform-runtime corejs3을 같이 사용하면?
- @babel/plugin-transform-runtime  이 이긴다. (지역적으로 폴리필과) 헬퍼 함수를 넣는다는 이야기

# 몰론  preset-env corejs3 과 @babel/plugin-transform-runtime 을 같이 사용하면?
- @babel/plugin-transform-runtime 에 corejs 옵션이 생략되어 있으니까, `regenerator-runtime` 을 제외한 폴리필은 preset-env 에 의해 전역으로 들어간다. 

