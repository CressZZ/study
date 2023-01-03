# 잠깐 햇갈리니까 다시 정리해보자
중요!! : [babel plugin vs polyfill](https://ui.dev/compiling-polyfills/)
- 바벨은 크게 문법과 기능(메서드) 를 변환해주는 역할을 한다

https://babeljs.io/docs/en/babel-preset-env#how-does-it-work
> JavaScript syntax or browser feature, as well as a mapping of those syntaxes and features to Babel transform plugins and core-js polyfills.

- 플러그인은 문법 을 변환시켜주고 
- 폴리필은 메서드를 변환(혹은 대체) 시켜준다.

# 문법은 플러그인이 가지고 있다. 

# 폴리필은 corejs 와 regenerator-runtime/runtime 이 가지고 있다. 
- `corejs` 가 대부분 가지고 있는데, 
- 유독 gernerator 관련 폴리필은 페북이 만든 `regenerator-runtime/runtime` 이 가지고 있다. 

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
- transform-async-to-generator => 말그대로 async 함수를 generator 함수로 변경 하였다.
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
- 이건 `generator`함수를 `regeneratorRuntime` 으로 문법 변환 시킨다.
```json
{
    "plugins": [
      "@babel/plugin-transform-async-to-generator",  
      "@babel/plugin-transform-regenerator"
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

- 아니 그럼 regeneratorRuntime 은 어디 있는가? 어디에 정의 되어 있어야 하는거 아닌가??
- 바로 여기가 중요한데 regeneraotrRuntime 은 바로바로 `regenerator-runtime/runtime` 폴리필에 있다.
- 그럼 `regenerator-runtime/runtime`은 어떻게 추가 하는가?

## @babel/plugin-transform-runtime 플러그인을 통해 `regenerator-runtime/runtime` 폴리필 삽입
```json
  {"plugins": [
       ["@babel/plugin-transform-runtime"],  
       "@babel/plugin-transform-async-to-generator",  
       "@babel/plugin-transform-regenerator"
    ]}

```
- `@babel/plugin-transform-runtime` 문서를 보면 `@babel/plugin-transform-runtime`는 `@babel/runtime` 을 디펜던시로 가지고있고 활용 하는데, 
- `@babel/runtime` 이란 문법변환 플러그인이 가지고있는 헬퍼 함수를 => 헬퍼 모듈로(함수는 파일마다 삽입해야 하는데, 모듈은 파일마다 import 해도 실질적으로 삽입되는 코든 모듈안에 있는 코드 하나이다.) 가지고 있고, 추가로 `regenerator-runtime` 폴리필 을 가지고 있다고 나온다. 
- `문법변환 핼퍼 모듈`(전역 오염을 방지하기 위한 핼퍼 모듈)에 더하여 `regenerator-runtime` `폴리필`을 가지고 있는것이다. 
  
> @babel/runtime is a library that contains `Babel modular runtime helpers` and a version of `regenerator-runtime`. 

- 다시 살펴보면 regenrator 폴리필을 `@babel/runtime/regenerator` 에서 가져오는 것을 볼수 있고, `@babel/plugin-transform-runtime` 의 주요 특징과 같이 전역 변수 (window)를 오염시키지 않고 `_regenerator`라는 변수로 불러오는 것을 볼수 있다.!

```js
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _f() {
  _f = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      //.....

```

- 위에서 `@babel/runtime` 이 가져온 `@babel/runtime/regenerator` 에는 어떤 내용이 있을까
```js
 
// node_modules/@babel/runtime/regenerator/index.js
module.exports = require("regenerator-runtime");


// 결국 @babel/runtime/regenerator는 regenerator-runtime 을 그냥 불러오는 모듈이다
```
- 일단 나중에 중요한 부분으로 다시 언급하겠지만 `@babel/plugin-transform-runtime` 이 가지고 있는 `@babel/runtime`은 폴리필을 `regenerator-runtime` 밖에 가지고 있지 않지만, [@babel/runtime-corejs2](https://babeljs.io/docs/en/babel-runtime-corejs2) 와 [@babel/runtime-corejs3](https://www.npmjs.com/package/@babel/runtime-corejs3) 은 `core-js` 도 가지고 있다. 
- 위에서 말했듯이 자바스크립트이ㅡ 폴리필은 두개가 나눠 가지고 있다. `core-js` 와 `regenerator-runtime` 이다. 

# 중요한 점은 왜 폴리필이 corejs / regenerator-runtime 두개로 나누어 있을까 하는점인데
- 바벨의 문법 변환은 플러그인이 있어야 적용된다. 
- 그에 반해 폴리필은 그냥 삽입하는거다.
- 전역변수 (window.Array, window.Proomise) 등을 변환하기 위해서는 문법수정이 필요하지 않고 그냥 전역 변수 오염시키는 모듈만 있으면 된다. 
- 그런데  `generator` 함수 의 경우에는 (`async`는 `generator` 로 문법 변환이 먼저되어야 한다.)
- `regeneratorRuntime`으로 문법 변환도 필요하고, `regeneratorRuntime`에 대한 폴리필도 필요하다. 
- `generator` 함수를 `regeneratorRuntime` 으로 변환 하려면 일단 문법변환 플러그인인 `plugin-transform-regenerator` 이 있어야 한다. 
- 폴리필인 `regenerator-runtime` 없이 문법변환 플러그인인 `plugin-transform-regenerator`만 있는경우 `generator` 함수가 어떻게 변환 되는지 보면 아래와 같다. 즉 1차 적으로 문법이 변경된 것이다

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
- `regeneratorRuntime` 이란 전역 객체가 생겼는데, 이게 import 되는게 아무대도 없다. 그냥 문법만 변환시킨 것이다.
- 이 상태에서 우리는 regenrator 에 대한 폴리필이 필요한 것이다. 


# `preset-env`로 폴리필을 삽입해 보자 (`useBuiltIns` 설정)
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
- 짜잔 `regenerator-runtime/runtime.js` 가 import 되었다.
- 브라우저에서 `regeneratorRuntime` 을 console 창에 입력하면 이것이 전역 객체임을 알수 있다.!!!! (좀 위험하지 않나? 음..)
- 
# 혹은 `@babel/plugin-transform-runtime` 플러그인을 이용해 `@babel/runtime`으로 폴리필을 넣어 보자 => 넣을수 있는건 단하나 regenerator 만이다. 기본적으로 `@babel/runtime`은 폴리필(regenerator-runtime 을 제외한 corejs)을 가지고 있지 않다. (`@babel/runtime-corejs2`는 corejs도 가지고 있다.)
-  `corejs` 옵션 추가 하면 다른 폴리필도 넣을수 있다.(`@babel/runtime-corejs2` 사용)
-  `**(폴리필 넣는건 별도로 플러그인이 필요 없다. 필요하면 알아서 넣어준다)**`

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
- 짜잔 지역 변수로 `_regenerator` 를 정의했다. 
- 이렇게 되면 당연히 브라우저 콘솔에서 `_regenerator` 나 `regeneratorRuntime` 을 입력해도 `undefined` 가 뜰것이다

# 다른 이야기인데...async의 경우에는 async 를 generator로 먼저 문법 변환하고, generator 를 다시 문법 변환한후 폴리필을 넣어 줘야 한다. 

# 잠깐 정리하면
- `@babel/plugin-transform-runtime` 은 `@babel/runtime`을 가지고 있는데, `@babel/runtime` 은 주요 폴리필 중(폴리필 모음중 => `corejs` 와 `regenerator-runtime` 중) `regenerator-runtime` 만을 자체 적으로 가지고 있어서(굳이 따지자면 디펜더시로 가지고 있어서)
- `generator`함수가 `regeneratorRumtime`으로 적절한 문법 변환이 이루어 진다면 자체적으로 `regenerator-runtime` 폴리필을 **지역적으로** 삽입한다. 라는 이야기 이다. 
- `@babel/runtime` 은 `generator`  함수가 `regeneratorRumtime`로 변환해주는 문법 변환 플러그인을 가지고 있지는 않다.
-  `"@babel/plugin-transform-async-to-generator"`,  `"@babel/plugin-transform-regenerator"` 플러그인이 필요하다. (첫번째꺼는 `async`를 `genertor`함수로 변환해주는 문법 변화 플러그인)
- `@babel/plugin-transform-runtime` 옵션중 `corejs` 를 수정하여 `@babel/runtime` 대신 `@babel/runtime-corejs2` 등을 활요하면 다른 폴리필 등도 `corejs` 등을 활용하여 **지역적으로** 삽입한다. (물론 자동으로)

# 애초에 폴리필은 플러그인이 아니다 라는것을 다시 확인하면 좋다. 
- 폴리필은 그냥 모듈로 삽입하는거지, 문법 변환 처럼 플러그인으로 동작하는게 아니다. 
- 그래서 babel 이 생겼을때 쯤 초반에는 [`@babel/polyfill`](https://babeljs.io/docs/en/babel-polyfill) 을 (자체적으로 `core-js/stable` 과 `regenerator-runtime/runtime` 을 가지고 있는 모듈) 작성한 코드 상단에 수동으로 import 해줬던 것이다. (전역을 오염시켜도 OK 라고 보고... 뭐 지금도 그렇지만)

# preset-env 는 이러한 폴리필을 
환경에 맞게 필요한 것만 싹싹 넣어 주는 것이고
- `useBuiltIns: entry` => 수동으로 `core-js/stable` 과 `regenerator-runtime/runtime`을 코드 상단에 넣어주면 주어진 환경(`target` or `browseslist`)에 필요한 모든 폴리필을 넣음
- `useBuiltIns: usage` => 수동으로 안넣어줘도 자동으로 내가 사용한 기능/메서드에 맞게 폴리필을 넣어줌. 
- useBuiltIns은 플러그인과는 관계없다! 폴리필 관련 기능이다! (폴리필은 `corejs` / `regenerator-runtime`)

# @babel/plugin-transform-runtime (corejs 옵션과 함께사용할경우) 는 사용한 모든 메서드에대한 폴리필을 **지역적으로** 넣어 버린다. 
- 일단 `@babel/plugin-transform-runtim` 은 타겟 환경 설정이 없다. 타겟이 없다는 이야기이다. Promise 를 사용했으면 Promise에 대한 폴리필을 삽입한다. (내가 크롬에서만 돌릴지라도...)
- 약간 `preset-env`의 usage 와 비슷하지만, (내가 사용한것에 대한 폴리필만 넣는다는 점에서)
- `preset-env` 타겟이 IE 6 정도로 맞춰져 있다고 보면 될거 같다. (환경에 상관없이 내가 사용한 모든 메서드에 대한 폴리필 삽입)
```js
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
_Promise.resolve(1); 
```

# 단 @babel/plugin-transform-runtime 은 자체적으로 문법 변환은 못한다. 플러그인이 있어야 해당 문법에 대한 처리를 일단 플러그인이 하고 (헬퍼 함수를 삽입하고), 그 헬퍼 함수에 맞는 헬퍼 모듈을 가지고 와서 함수대신 import 하는 식이다. (엄청 중요하고 햇갈린다)

# 다시말하지만 generator 함수를 사용했다고 하더라도(혹은 async 를 사용했다고 하더라도 -> async는 generator 함수로 변환되어야 한다) @babel/plugin-transform-runtime 만 사용하면 아무것도 못한다. 
- 최소한 `"@babel/plugin-transform-regenerator"` 을 문법변환 플러그인과 함께 쓰던가 (`generator` 함수를 `regeneratorRuntime`  객체를 사용하는 형태로 으로 문법변환)
- `preset-env`를 사용하여 플러그인이 자동으로 삽입되게 해야한다. (`preset-env`는 플러그인 집합체 이다.)
- `generator`함수에서 `regeneratorRuntime`으로 문법 변환후 -> `regeneratorRuntime` 에 대한 폴리필인 `regenarot-runtime`이 삽입된다. 
- `Promise` 같은건 문법 변환 할게 없으니까, 플러그인이 없어도, `@babel/plugin-transform-runtime` 이 Promise 가 감지되면 알아서 폴리필을 넣어 버린다.
- 물론  `@babel/plugin-transform-runtime` 을 이용하여 `Promise`에 대한 폴리필을 넣으려면 `corejs` 옵션을 줘서 `@bable/runtime` 대신 `@babel/runtime-corejs2` / `@babel/runtime-corejs3` 등을 사용해야 한다. 
- 기본 `@baebl/runtime`은 `regenerator-runtime` 말고는 다른 플러그인이 없다. 

# 오 이제 좀 알겠다.

# 하나더
https://github.com/facebook/regenerator

- 에 보면 facebook이 generator 함수를 regenerator 로변환하는  `regenrator-transform`도 만들었고, regenrator 폴릴필인 (runtime 이라고 하는데) `regenrator-runtime` 도 만들었는데
- 결국 `@babel/plugin-transform-regenerator` 는 `regenrator-transform` 을 끌어다 쓰는 플러그인에 지나지 않는다. 
- `regenerator` 는 `facebook` 꺼라는 이야기 이다