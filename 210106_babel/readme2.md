# 잠깐 햇갈리니까 다시 정리해보자
[babel plugin vs polyfill](https://ui.dev/compiling-polyfills/)
- 플러그인은 문법
- 폴리필은 메서드

# 그러니까 바벨은 문법 변환기인데, 플러그인이 없으면 이것도 변환 안해준다.
- 이때 일단 preset
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

