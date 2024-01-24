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
- mini 를 써도  entry 는 .js 파일 하나에, 그 .js 안에서 css 를 임포트 하면 문제 없음

# 추가!
- entry 에 여러 진입점을 넣는다는 것은 (css 포함 + mini ) 웹펙이 빌드를 할때, 
- 웹팩의 디폴트 템플릿에 
- 두개의 진입점에 대한 (진입점이 두개니까 서로의 진입점 간의 의존성이 없다고 가정하고 (import/export))
- 내용이 하나의 빌드에 들어가야한다. 
- 이때, 웹팩은 두개의 진입점을 별도의 모듈로 생각하고, 
- GPT 의 말에 따르면 
- 만약 entry가 배열로 설정되어 여러 파일이 포함되어 있다면, 
- 각 파일은 독립적인 모듈로 취급되며, 각각의 __webpack_exports__ 변수가 생성되어 해당 모듈의 내보내기를 관리한다. 
- 이 경우, Webpack은 `배열의 마지막 항목`을 `최종적인 내보내기`로 취급하는 경향이 있다. 
- 결과적으로, 첫 번째 파일의 내보내기가 덮어쓰여지거나 무시될 수 있어, 이는 default export가 undefined로 되는 원인이 될 수 있어.
- 여기서 `배열의 마지막 항목`과 `최종적인 내보내기` 라는 단어가 중요한데,
- 내가 보통 mini 를 쓸때, entry 포인트의 마지막 배열에 css 를 쓰기때문에, 
- 웹팩은 최종적인 내보내기가 css 라고 판단하고, 이걸 export 시켜 버리는데, 
- mini로 뺐으니 아무것도 남아 있지 않았던 것이다. 
- 그래서 undefined 나온건데, 
- entry 포인트의 배열순서를 바꿔주면 해결 되긴 한다. ( [css, ts] 순서로 )


# vscode 내부 설정에서 (tsconfig 없을때)
- moduleResolution 설정하는 곳은 없다
- tsconfig 만들던가


# tsconfig moduleResolution
- 아 자꾸 햇갈리는데
- tsconfig 에 있는건 허상이고
- webpack 은 알아서 잘한다. 
- 즉, webpack 은 그냥 5버전 기준으로 node에서 package.json 의 exports 필드 지원한다면 잘 빌드 하는데 (subpath 까지 해줄거 같은데, webpack 이 몇버전부터 멀 지원해주는지는 확실히 모르겠다)
- tsconfig 에 moduleResolution이 node 로 되어 있으면 (node16 말고) vscode 에서 애러나는데,
- vscode 에서 애러나는건 typescript 애러인거고, 실제 빌드 할때는 이슈 없이 빌드 된다. 
- tsconfig 에 moduleResolution이 node16으로 되면 vscode 에서 애러도 없고,
- 타입힌트도 잘준다
- 아 맨날 햇갈림

# 스크립트 모드
- 타입은 전역타입 그러니까 스크립트 모드 타입을 안써야 한다
- 젠장! 왜냐하면 ts 를 프로젝트 내에서 사용할땐 상관없는데, 
- A 라는 프로젝트에서 d.ts 를 스크립트 모드로 전역으로 쓰고 있다고 해보자
- A 라는 프로젝트 내에서는 상관없다. 하지만, 이게 B라는 프로젝트에 설치형으로 설치 되고, B 프로젝트 node_modules 에 들어가게 되면, 
- 자동으로 프로젝트 범위에서 빠져 버리기때문에 스크립트 모드로 선언한 전역 타입을 쓸수 없다. 
- typeRoots 설정에 해당 node_modules/A/ 를 포함 시키지 않는한...

## 스크립트 모드 - GPT 답변
- "프로젝트 전체"라는 범위에 대해 명확히 설명하자면, 이는 tsconfig.json 파일이 적용되는 범위 내에서 TypeScript 코드에 대한 설정과 규칙을 정의하는 것을 말해. 이 범위는 일반적으로 tsconfig.json 파일이 위치한 디렉토리와 그 하위 디렉토리들을 포함하지만, exclude 옵션으로 제외된 파일이나 폴더는 제외돼.
- node_modules 폴더의 경우, TypeScript 프로젝트에서 기본적으로 제외되는 경로 중 하나야. 이 폴더 내의 파일들은 프로젝트의 코드와 직접적으로 연관되지 않은 종속성을 관리하는 데 사용되기 때문에, TypeScript 컴파일러는 일반적으로 이 폴더를 무시해. 그렇기 때문에 node_modules 내에 있는 전역 타입 설정들은 typeRoots 또는 다른 명시적인 구성 없이는 프로젝트에서 기본적으로 사용되지 않아.
- 결론적으로, tsconfig.json의 범위 내에서 선언된 전역 타입들은 해당 설정 파일이 적용되는 모든 파일에 영향을 미치지만, node_modules와 같이 기본적으로 제외되는 경로에 있는 타입 선언들은 별도의 설정이 없으면 적용되지 않아.

## 그럼 전역 선언 타입은 어떻게 하지?
- /// <reference path="./interface/IShare.d.ts" />
- 을 사용하자. 각종 라이브러리에  triple-slash-directives 쓰는 이유다
- https://www.typescriptlang.org/ko/docs/handbook/triple-slash-directives.html


# css-loader 에서 
- 우리는 scss-loader 에서 resolve-url-loader 가 필요하다는 것을 안다. 
- 근데, node_modules 의 css를 import 할때
- 그 css 안에서 참조하는 node_modules안의 이미지는 잘 빌드 한다. 
- css-loader 의 url 옵션이 알아서 url경로를 해석하고, 해당하는 파일을 모듈화 시키며
- asset-module 이 (구버전의 경우 url-loader 가) 모듈화된 파일을 개별 파일로 뽑아 내는 식이기 때문이다. 
- sass 는 css-loader 동작하기전에 파일을 하나로 합치게 될텐데, 이때 resolve-url-loader가 없으면 무지성으로 상대경로 같은 패스를 그냥 그대로 합쳐 버린다. 
- 하위 폴더에있는걸 상위 폴에서에서 합쳐버리니, 애러가 나는거고 그래서 resolve-url-loader 을 쓰는건데, 
- css-loader 까지 경로만 잘 물고 있으면 (scss 의 경우 resolve-url-loader 가 css파일이 기준으로 변환해준 경로이며, node_module의 경우 그냥 그대로 css파일이 참조한 이미지가 있는 경로)
- 알잘딱 파일 경로를 잘 뽑아내어서 
- asset-module이 그 경로의 이미지를 dist 폴더에 파일로 뽑아 내준다.!!!!!!!

# webpack 의 output.library.type 에 대해서
- https://webpack.kr/configuration/output/#outputlibrarytarget
- 이 옵션은 엔트리 포인트의 반환 값(export한 엔트리 포인트에 관계없이)을 output.library에 정의된 이름으로 특정 객체에 할당합니다.
- output.library에 빈 문자열이 할당된 경우 기본 동작은 엔트리 포인트에서 반환된 모든 프로퍼티가 다음 코드를 통해 output.libraryTarget에 정의된 대로 객체에 할당되는 것입니다.
- 그러니까 이게 뭔소리냐 하면, 
- 


# webpack5 의 ㅡmode 에 대하여
- production 은 필요 없는걸 싹 날린다.
- 



# 
User
esm 모듈에서 cjs를 import 한 파일을 webpack 이 번들링할꺼야.

근데, 하나는 node_modules에 있는 cjs 파일이고, 
하나는 같은 프로젝트에 있는 cjs 파일이야. 

이때, 아래와 같은 애러 메시지는 하나의 같은 프로젝트에 있는 cjs파일을 import 할때 만 발생하더라고. 왜그런거야?
export 'default' (imported as 'ncui') was not found in '../../dist/bb.js' (module has no exports)



# 중요한거, webpack, babel 그리고 node_modules
- 자자자
- 내가 A 라는 프로젝트를 webpack 으로 library.type = 'commonjs2' 로 해서 빌드를 했는데, 
- node_modules 에 안 넣고, B 프로젝트 src 폴더에 넣고, B의 index.js 에서 import 로 불러와서, 
- webpack 으로 돌렸는데, 아래와 같은 애러가 났다. 
- `export 'default' (imported as 'ncui') was not found in './ncui.js' (module has no exports)`
- 왜 났을까?
- node_modules/A/dist/index.js 에 있는걸 import 하면 애러가 안난다. 
- 이상하지 않은가?
- A 에서 빌드된 파일을 동시에 썼고, A는 웹팩에서 빌드 해줬기 때문에, 그것도 commonjs 로 빌드 해줬기 때문에
- module.exports 도 잘 가지고 있고, 
- webpack 은 cjs를 esm에서 import 해줘도 잘 처리 해줘야 하는데 애러가 생긴다!
- 그것도 src 폴더에서.!
- 정답은 바로 babel 이다. 
- bable-loader 는 webpack 설정할때 node_modules 를 exclude해버리기 때문에, 
- 일단 src 에 있는 A를 import 하는 것과, node_modules 에 있는 A를 import 하는 것은 다를 것이다. 라고
- 이제 감이 잡히는데, 그럼 구체적으로 뭐가 어떻게 다르지?
- 정답은 babelrc 의 @babel/preset-env의 옵션중 modules 옵션이다. 
- 이걸 false로 넣으면 src 폴더에 있는 A를 import 할때 해당 애러가 나오고, 'coommonjs' 로 하면 해당 애러가 안나온다,
- 왜?
- modules 은 타겟 js 파일의 esm을 cjs로 바꾸는거 뿐 아니라, 
- 지가 들어갈때, 그니까 core-js 가 들어갈때도 바꿀지 안바꿀지 결정하는 것으로 보인다. ( !이거 아님, 뒤에 추가로 넣었음.! 바벨은 그냥 죄다 import 로 때려 넣고 본다. sourceType 옵션을 unambiguous 로 바꿔 줘야 한다.)
- 그러니까, 원래 A 라는 프로젝트가 cjs였으니까, modules를 false로 넣고, A 프로젝트 안에 promise 같은게 있으면 core-js를 import 하게 된다 
- 근데, modules 가 commonjs 라면 croe-js를 require로 불러온다.!!!
- 그리도, 생각해보면 A는 이미 빌드 된거라서, core-js 가 이미 들어가 있다고 생각되어 지는데, 만약 node_modules 에 있었다면, babel-loader가 exclude 되서 개입을 안하지만, 이렇게 src 에 있다면, 그냥 그 빌드된 코드를 보고, promise가 있네? 하면 또 babel이 넣어주는 거다. 
- 그래서 결국, modules가 false B 프로젝트에서 import 로 A 프로젝트를 불러오는 건 그냥 import 로 두고, A 프로젝트 자체는 cjs 니까 이 코드도 그대로 두는데, cjs인 A 프로젝트 안에 바벨이 import 로 들어가 버리면서, (아직 웹펙이 파일을 하나로 모드기 전이다.)
- A 프로젝트 파일안에 cjs와 esm이 공존 하게 된것이다. 
- 이제 이걸 B에서 import 할때는 A 프로젝트의 module.exports 를 잘 해석해서 알아서 잘 가져 오지만, 
- 가져온 파일안에 import 가 살아 있게 된다.
- 만약 babel 이 없었다면, bebel 이 import 문법으로 드어가지 않았다면, 
- 이슈는 없었을 것이다.

- 우아, 내용이 190430_babel_preset_env 에 그대로 있다. (심지어 해결책까지)
```
important!!!!!!!!! 바벨에서 ESModule 과 Commonjs 모듈을 혼용하고 + preset 설정중 useBuiltIns를 usage로 하고 modules를 auto(babel-loader 사용시) 및 false로 하면 애러가 생긴다. 
해결책은 babel 옵션중 `sourceType` 을 `unambiguous`로 설정함 )
```

# 아씨 알았다!
- A프로젝트가 cjs임에도 불구하고 왜 위에서 바벨이 cores-js를 import 구문으로 가져 왔냐 하면 
- 바벨은 기본적으로 모든 파일을 esm으로 판단하고 죄다 import 로 때려 넣기 때문이다. 
## 1번
- 그럼 preset 옵션중 modules를  'commonjs' 했을때 애러가 안나는 이유는
- 일단 A프로젝트(cjs) 안에 import 로 core-js를 때려 놓고 (혼용상태)
- 그 다음 modules 옵션에 따라 core-js를 import 한 esm 구문을 cjs 로 바꾸고, 
- 그 다음 웹펙이 말아 버리는데, 
## 2번
- 바벨 옵션 sourceType 을 unambiguous로 설정하면
- 바벨한테 '아 무조건 import 로 core-js 때려 넣지 말고, 파일을 좀 보고 module.exports 같은거 있으면 require로 넣으라고!' 라고 말해줘서
- core-js를 require로 넣고, 
- modules 옵션이 뭐든 아무튼 변화 없고 (modules 옵션은 esm 문법으 바꿀지 말지 결정하는 거니까)
- 웹펙이 말면 이상이 없다. 
## 3번
- 바벨 옵션 sourceType 없이 modules를 false 로 하면
- 바벨이 죄다 import 로 core-js 때려 넣은뒤
- modules 옵션에 따라 그 import 구문을 건드리지 않고, 
- 웹팩은 이렇게 cjs와esm 이 혼용되어 있는 파일을 빌드 하려다
- 애러남...! ㅋㅋㅋ