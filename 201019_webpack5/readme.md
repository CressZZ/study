# Webpack 5 release [2020-10-10]
웹팩 4는 많은 변화 없이 릴리지됬지만, 이번에는 다를 거다. 많은 사람들이 웹팩 설정 건드리는거 안좋아하는 건 아는데, API 수정없이 기능 개선에는 한계가 있다. 

## Common Questions
### So what does the realese mean?
릴리즈란 주요 변경이 끝났다라는 것을 의미한다. 다수의 리펙토링과, 아키텍처 업그레이드 및 지금 있는 그리고 나중에 추가될 주요 기능을 위해 기반을 다졌다. 

### So when is the time to upgrade?
글쎄... 아무튼 업그레이드는 실패할수 있고, 두 세번 시도해야 할수 있다. 감당 할수 있으면 지금 업그레이드를 하고 웹팩, 플러그인, 로더에 대한 피드백을 달라. 우리가 수정해줄께.

## Spnosoring update
trivago가 3년동안 큰 금액을 스폰 해줬지만, 이번엔 코로나 19때문에 스폰을 해주지 못했다.모든 스폰서에게 감사합니다. 

## General direction
이번 릴리즈는 다음과 같은 사항에 중점을 두었다. 
- 영구적인 캐싱을 통한 빌드 성능 향상.
- 더 나은 알고리즘과 default값을 통한 롱텀 캐싱기능 향상.
- 더 나은 트리 쉐이킹과 코드 generation을 통한 빌드 사이즈 개선.
- **웹플랫폼과의 호환성 향상.**
- 큰 변경 없이, V4에서 성능개선을 하며 생성된 비정상적인 구조를 정리함.
- 큰 변경을 통하여 앞으로 추가될 수 있는 기능을 위해 준비함. 이건 v5를 더 오래 쓸수 있게 해줄 것임.
  
## Migration Guide
[마이그레이션 문서 참조](https://webpack.js.org/migrate/5)

## Major Changes: Removals
### Removed Deprecated Items
v4에서 deprecated 된 모든 아이템이 제거 되었다.
**MIGRATION:** v4에서는 deprecated 된 아이템에 대해 경고문구를 표시하지 않았다는 것을 기억하라. (그러니까 v5에서 우리가 예상 못한 Deprecate 관련 예러가 나올 수 있다는 것임.)

아래는 v4에서 deprecated **관련** 경고를 출력하지 않았던 deprecate 내용이다. 
- 지금부터 [IgnorePlugin](https://webpack.js.org/plugins/ignore-plugin/)과 [BannerPlugin](https://webpack.js.org/plugins/banner-plugin/)는 object, string 또는 function 으로 된 한개의 인자만 넘겨 줘야 한다. 
  
### Deprecation Codes
새로운 deprecation code 가 추가된다.

## Syntax derprecated
default 값에서 [`require.include`](https://webpack.js.org/api/module-methods/#requireinclude) 가 deprecated 되어 있고, 경고 메시지를 출력한다. 
[`Rule.parser.requireinclude`](https://webpack.js.org/configuration/module/#ruleparser) 옵션에서 `require.include`를 allowed, deprecate 또는 disabled 로 설정할 수 있다. 

## Automatic Node.js Polyfills Removed
옛날에는 Node.js 의 core module에 대한 polyfill을 제공했기때문에 너희가 Node.js의 모듈을 마음껏 쓸 수 있었지만, 잘 쓰지도 않고 용량만 커서 polyfill을 삭제했다. 
우리의 목표는 프론트엔드 호환성 향상이다.  
**역주:** Pollyfill 없이 Node.js 의 crypto를 webpack에서 사용하려면 애러가 발생할것이다. 왜냐하면 crypto는 Node.js를 위하여 아마도 C++ 코드로 번들링된 모듈이지 Javascript를 위한게 아니기 때문이다. [참조](https://medium.com/hackernoon/using-core-node-js-modules-in-react-native-apps-64acd4d07140)
**MIGRATION**
- 가능하면 프론트엔드 모듈을 사용하라. 
- Node.js 코어 모듈의 polyfill을 수동으로 추가하는 건 가능하다. 폴리필이 없어서 애러메시지가 출력될 경우 이에대한 힌트를 줄거다. 
- `package.json` 의 `browser` 필드를 상용하자. 

## Major Changes: Long Term Caching
### Deterministic Chunk, Module IDs and Export names
모드가 `production` 일때, 다음과 같은 옵션이 디폴트로 되는데 `chunkIds: "deterministic" moduleIds: "deterministic" mangleExports: "deterministic"`여기서 deterministic 라는 것이 신개념 알고리즘을 통해 생성되는 Id 이름이다. 이 알고리즘은 3이나 5 digits 의 숫자가 modules와 chunk의 아이디로 되고, 2charaters의 문자가 exports의 아이디로 된다고 한다. (mangleExports 가 export된 파일의 이름인지는 잘 모르겠음...) 뭐 기존의 `hash` 옵션보다 더 효율적이라고 하는데... (잘 모르겠음)

### Real Content Hash
contenthash 를 사용할 경우 코멘트나, 변수 명이 변경되었을때는 캐시가 갱신되지 않아 롱텀 캐싱에 효과적이다. (잘 모르겠음)

## Major Changes: Development Support
### Named Chunk Ids
모드가 development 일때 Chunk 파일의 이름을 사람이 읽을수 있는 이름으로 하는 옵션이 디폴트가 되었다. 물론 production 모드에서도 `chunkIds: "named"` 으로 하면 가능하지만, 민감한 정보를 제공 할수 있으니 마라. production 모드에서의 `chunkIds` 기본 옵션값은 `deterministic` 이다. 

**MIGRATION:** 만약 청크 파일이름을 사람이 읽을수 있는 파일로 바꾸기 싫으면 기존의 것과 똑같이 나오게 할수 있다. `natural` 옵션을 통해서 (`deterministic`은 새로운 알로리즘으로 만든 이름)

### Module Federation
v5 에서 모듈 연합이라는 새로운 개념이 생겼다. 이건 여러개의 웹팩으로 밸드된 파일을 함께 동작하도록 구현 될수 있다. 
자세한건 [여기참조](https://webpack.js.org/concepts/module-federation)

## Major Changes: New Web Platform Features
### JSON modules
JOSN 모듈이 프로포절 상태가 되었다. [지금은 draft 상태](https://github.com/tc39/proposal-json-modules) `defaut export` 형식으로 모듈을 import 하지 않으면 webpack에서 경고메시지를 출력할 것이다. ESModule을 사용하면 JSON 모듈은 named exports 를 사용할수 없다. 
**MIGRATION:** default export를 사용하시오
**역주:** [tc39](https://github.com/tc39/proposal-json-modules)를 참고해보면 JSON 모듈은 `named exports` 가 지원되지 않는다고 나온다. 대충 해석하면 `JSON 문서를 파일에서 나란히있는 여러 가지가 아니라 개념적으로 '단일 것'으로 생각하는 것이 합리적입니다.` 라는 내용이 나온다. 

`default export`로 JSON 모듈을 import 해도 `optimization.usedExports` 로 사용하지 않는 프로퍼티가 drop 될수 있고 `optimization.mangleExports` 로  프로퍼티가 mangled 될수 있다.
**역주:** `optimization.usedExports`는 사용된/사용되지않은 모듈을 각각 별도로 표기할거냐(트리쉐이킹 등에 사용)라는 옵션 이고, `optimization.mangleExports`은 export 된 모듈명(?-잘모름)을 mangled 처리 할거냐 묻는 옵션이다.

JSON-like 파일(toml, yaml, json5 등) 모듈을 사용하려면, custom JSON parser 를 사용하면 된다. 

### import.meta
- import.meta.webpackHot is an alias for module.hot which is also available in strict ESM
  - hotmodule 쓰는지 혹인하는 정보
- import.meta.webpack is the webpack major version as number
  - 웹팩 메이저 버전 정보
- import.meta.url is the file: url of the current file (similar to __filename but as file url)
  - 현재 파일 url  wjdqh

### Asset modules
일단 Rules.type에  `raw-loader`, ` url-loader`, `file-load`를 대체 할 수 있는 웹팩 네이티스 옵션이 생겼다. [https://webpack.js.org/guides/asset-modules/]
이 옵션으로 asset module을 지정해줄수 있는데, 이건 별도의 file로 output 디렉토리에 생성할수 있거나, DataURI를 통해서 inline 형식으로 번들할수 있다. 이 두경우 모두 모듈이 있는 URL이 필요한데, 이건 아래와 같이 사용할수 있다. 
- import url from "./image.png" and setting type: "asset" in module.rules when matching such import. (old way - **왜 old way인줄 모르겠음. v5 에서 새로 낭온거면서**)
- new URL("./image.png", import.meta.url) (new way)
new way인 경우 웹팩을 통한 번들링 없이도 사용가능한 native ECMASciprt 모듈이다. 

**참조:** [https://webpack.js.org/guides/asset-modules/]

 ### Native Worker Support
`new Worker(new URL("./worker.js", import.meta.url))` 을 통하여 웹팩은 자동적으로 새로운 `web worker` 에 대한 entrypoint를 생성 한다. 이것도 웹팩을 통한 번들링 없이도 사용가능한 native ECMASciprt 모듈이다. 

### URIs (잘 모르겠음...)
Webpack 5 supports handling of protocols in requests.

- data: is supported. Base64 or raw encoding is supported. Mimetype can be mapped to loaders and module type in module.rules. Example: import x from "data:text/javascript,export default 42"
- file: is supported.
- http(s): is supported, but requires opt-in via new webpack.experiments.schemesHttp(s)UriPlugin()
	- By default when targeting "web", these URIs result in requests to external resource (they are externals)
- Fragments in requests are supported: Example: ./file.js#fragment

