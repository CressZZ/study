- 221222_npm_package

# module / moduleResolution
## module
- 생성되는 js의 모듈 형태
- 이게 변경되면 moduleResolution도 변경된다
### default
- CommonJS if target is ES3 or ES5,
- ES6/ES2015 otherwise.

## moduleResolution
- 모듈 탐색 방법 (Specify the module resolution strategy)
### default
- Classic if module is AMD, UMD, System or 
- ES6/ES2015,,Matches if module is node12 or nodenext,
- ,Node otherwise.

### node12 또는 nodeNext 값으로 넣으면..
- https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#ecmascript-module-support-in-node-js
- node12 부터 지원하는 기능을 쓸수 있다.
- 기능은 package.json의 module 필드라던가, export 필드 등이있다

# 일단 모듈이라는 걸 생각해보자

# 1. 모듈을 탐색해야 하는 아이들!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
- node (기본적으로 모듈을 require/import 해서 사용할 수 있다.)
- **webpack (모듈을 찾아서 번들링)**
- **typescript (정적 타입이니까 진짜 모듈이 있는지 봐야 한다)**

# 2. 코드를 변환해야 하는 아이들 (트렌스파일)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
- **webpack (번들링 해주니까)**
- **typescript (.ts 파일을 .js 파일로 트렌스파일)**
- babel (트렌스 파일)

## 코드를 변환해야 하는 아이들의 특징
- target 이 있어야 한다. 지금 내가 작성하고 있는 파일을 어떤 모듈 형태의 파일로 만들지 정해야 한다는것
- 즉, 난 esModule 형태로 코드를 작성 하고 있지만, 트랜스파일 되는 결과물은 cjs가 될수도 있고, ejs가 될수도 있다. 


# package.json의 "type" 필드에 대해
- node12 부터? 노드가 ejs 를 지원하는데, 이 필드에 "type": "module" 이 없으면 `node a.js` 처럼 순수하게(?) 빌드나 트렌스 파일링 없이 노드로 파일을 실행시켰을때, 그 파일에서 import 구문(esm)을 사용하고 있으면 실행이 되지 않는다. 
- 반대로  "type": "module" 로 되어 있으면, require 구문(commonjs)에서 에러가 난다
- https://nodejs.org/api/packages.html#type를 참조하면, 히스토리 부분에 아래의 내용이 있는데, 
- v12.0.0 Add support for ES modules using .js file extension via package.json "type" field.
- 아무튼 노드12 는 esmodule 을 지원 하는데,import 구문의 경로에 .js파일 확장자 명이 있어야 하고 (import test from './something.js';), pakage.json에 type 필드가 있어야 한다고 나온다
- 실재로 노드에서 esmodule를 사용하고자 할때, import 구문 경로에 확장자(.js)를 누락하면 애러가 난다.
- 일단 기본적으로 .mjs, .cjs 는 설정과 무관하게 알아서 잘 동작 한다. 

# CJS vs EJS
- https://toss.tech/article/commonjs-esm-exports-field
- cjs는 트리쉐이킹이 힘들고 ejs는 편하다 (트리쉐이킹은 아무튼 번들러툴 에서 해주는 것이다. 당연히 트렌스 파일링으로는 안된다. 노드도 안되지!)
- 트리쉐이킹이 되는 이유는 EJS 는 import 구문에 동적 경로를 사용할수 없고, export는 항상 최상위 스코프에서만 가능 하기때문에 
- 사용하는 것과 사용하지 않는 것에 대해 정적으로 판별이 가능 하기 때문이다. (런타임까지 안가도 알수 있다는 의미)

## 트리 쉐이킹(https://toss.tech/article/commonjs-esm-exports-field)
- 트리쉐이킹이 되는 이유는 EJS는 import 구문에 동적 경로를 사용할수 없고, 
- EJS는 export는 항상 최상위 스코프에서만 사용할 수 있습니다.
- CJS는 반대입니다. 
- 따라서 CJS는 빌드 타임에 정적 분석을 적용하기가 어렵고, 런타임에서만 모듈 관계를 파악할 수 있습니다.

# pckagejson 의 export / main / modules / browsers
- [webpack에서] exports field is preferred over other package entry fields like main, module, browser or custom ones.
- export 가 우선인다

## pckagejson 의 modules / browser
- 일단 빌드 툴들이 사용했던 임시 필드. 노드의 정식 지원 필드가 아니었고, 노드는 export를 채용했다
- https://stackoverflow.com/questions/42708484/what-is-the-module-package-json-field-for
- https://esbuild.github.io/api/#main-fields
- The module field is not officially defined by Node.js and support is not planned. Instead, the Node.js community settled on package exports which they believe is more versatile.

### browser
- 이 browser필드는 모듈 작성자가 클라이언트 측 사용을 위해 모듈을 패키징할 때 javascript 번들러 또는 구성 요소 도구에 대한 힌트로 제공됩니다. 이 필드는 일반적으로 프로젝트 소스 트리의 루트에 있는 package.json파일( 여기 에 설명됨)에서 찾을 수 있습니다.
- 필드에 대해 단일 문자열을 지정하면 해당 문자열 browser이 대체 main되고 모듈 진입점이 됩니다. 이 main필드는 모듈에 대한 진입점을 지정하므로 모듈을 교체하면 브라우저 사용을 위해 번들러가 모듈을 패키징할 때 진입점을 교체할 수 있습니다.
- https://github.com/webpack/webpack/issues/4674
- https://github.com/defunctzombie/package-browser-field-spec
- https://github.com/TheLarkInn/compare-webpack-target-bundles

### module
- https://stackoverflow.com/questions/42708484/what-is-the-module-package-json-field-for
-  모듈 필드는 Node.js에서 공식적으로 정의하지 않았으며 지원 계획도 없습니다. 대신 Node.js 커뮤니티는 더 다재다능하다고 생각하는 `export`  정착했습니다.
- 실질적인 이유로 JavaScript 번들러는 모듈 필드를 계속 지원할 것입니다. esbuild 문서는 모듈을 사용하는 시기와 관련 필드 기본 및 브라우저를 설명합니다.

# package.json 의 browserslist 필드
- 이건 전혀 다른거.
- browserslist : https://github.com/browserslist/browserslist

# babel
- babel은 기본적으로 esm 을 cjs로 변환하는 것이고, (preset-env 내장)
- 플러그인을 써서(https://github.com/tbranyen/babel-plugin-transform-commonjs) cjs를 esm으로 변환할수 있다.
```js
// 바벨 변환전 cjs
var { readFileSync } = require('path');
exports.readFileSync = readFileSync;

// 바벨 변환후 esm
import { readFileSync as _readFileSync } from "path";
var module = {
  exports: {}
};
exports.readFileSync = _readFileSync;
export const readFileSync = _readFileSync;
export default module.exports;
```


# nodeNext 모듈 시스템을 쓸때, 
- mjs 에서는 상대경로 import 를 쓸때, 확장자명을 써야 한다. 
- https://nodejs.org/api/packages.html#extensions-in-subpaths



# 스크립트 모드 파일 찾는방법
- 요약 하면 nodeNext 도입으로 인해 스크립트 모드의 정의가 조금 바꼈다. 
- 원래는 import/export 없으면 스크립트 모드라는 이름 아래 글로벌적으로 적용되는 파일이었지만, 
- nodeNext가 도입되면서, (기존의 node 가 동작하는 방법과 맞지 않는다고 해서...)
- moduleDetection 이란 옵션이 추가 되었고, 디폴트는 auto 이다. 
- 아무튼 예전처럼 import/export 없으면 스크립트 모드라고 하고 싶으면 해당 값을 'legacy' 로 놓으면 된다. 
- 아 물론 이건 모두 module 옵션을 'nodeNext' 로 설정 했을때 이야기 이다. 

- One issue with the introduction of modules to JavaScript was the ambiguity between existing "script" code and the new module code. JavaScript code in a module runs slightly differently, and has different scoping rules, so tools have to make decisions as to how each file runs. For example, Node.js requires module entry-points to be written in a .mjs, or have a nearby package.json with "type": "module". TypeScript treats a file as a module whenever it finds any import or export statement in a file, but otherwise, will assume a .ts or .js file is a script file acting on the global scope.

- This doesn’t quite match up with the behavior of Node.js where the package.json can change the format of a file, or the --jsx setting react-jsx, where any JSX file contains an implicit import to a JSX factory. It also doesn’t match modern expectations where most new TypeScript code is written with modules in mind.

- That’s why TypeScript 4.7 introduces a new option called moduleDetection. moduleDetection can take on 3 values: "auto" (the default), "legacy" (the same behavior as 4.6 and prior), and "force".

- Under the mode "auto", TypeScript will not only look for import and export statements, but it will also check whether

- the "type" field in package.json is set to "module" when running under --module nodenext/--module node16, and check whether the current file is a JSX file when running under --jsx react-jsx

- In cases where you want every file to be treated as a module, the "force" setting ensures that every non-declaration file is treated as a module. This will be true regardless of how module, moduleResoluton, and jsx are configured.

- Meanwhile, the "legacy" option simply goes back to the old behavior of only seeking out import and export statements to determine whether a file is a module.