# 바벨은 필요할까?
- 이론적으로 바벨은 `Use next generation JavaScript, today.` 이기 때문에 ES6 뿐 아니라, 최신 ES문법을 사용할수 있게 해주기 때문에 쓰는게 좋을거 같다. (https://babeljs.io/)

## TSC 의 트랜스 파일 (타입스크립트 프로그래밍 pg.308)
- 모든 자바스크립트 환경이 모든 자바스크립트 기능을 기본으로 지원하는 것은 아니지만 코드는 가능하면 최신 버전으로 작성하는 것이 좋다. 이렇게 해도 구버전 플랫폼에서 동작하게 할 수 있는데, 방법은 두가지 이다. 
- TSC는 코드를 예전 자바스크립트 버전으로 트랜스 파일하는 기능을 기본으로 지원하지만, 폴리필은 자동으로 해주지 않는다. 
### target
- 트랜스파일하려는 자바스크립트 버전을 설정한다. (es5, es2015 등).
- TSC의 내장 트랜스 파일러는 대부분의 자바스ㅡㅋ립트 기능을 예쩐 자바스크립트 버전으로 변활할 수 있다. 즉, 여러분이 최신 타입스크립트 버전으로 코딩한 다음 필요한 버전의 자바스크립트 코드로 변활 할수 있다느 의미다. 타입 스크립트는 최신 자바스크립트 기능을 지원하므로 내장 트랜스파일러를 이용 해 NodeJs 와 브라우저가 이해할수 있는 코드로 변환하는 일이 자주 생길 것이다. 
### module
- 대상 모듈 시스템을 설정한다.(es2015 모듈, commonjs 모듈, systemjs 모듈 등).
### lib
- 타입스크립에게 대상 환경에서 어떤 자바스크립트 기능을 지원하는지 알려준다.(es5기능, es2015 기능, dom 등). 실제로 기능을 구현하는 것은 아니지만(따라서 폴리필이 필요함) 적어도 이런 기능들을이용할 수 있다는 사실을 타입스크립트에서 알려준다. (네이티브 또는 폴리필을 이용).
- 코드를 예전 자바스크립트 버전으로 트랜스파일할 때 한가지 유의사항이 있다. 대부분의 언어 기능은 안전하게 변환되지만 (let 을 var 로, 혹은 class를 function으로) 대상 환경에서 `새로운` 기능을 지원하지 않으면 폴리필로 직접 제공해야 한다는 사실이다. promise, reflect, Map, Set, Symbol등의 유틸리티를 사용하는 상황이 좋은 예다. 최신 브라우저는 폴리필을 제공할 필요가 없지만, 오래된 버전 또는 대부분의 Nodejs 환경이라면 빠진 기능을 채울 폴리필을 제공해야 한다. 
- 이건 core-js 를 써서 직접 넣거나, 바벨을 사용하면 된다. 
### 트랜스 파일(자동 변환등) 
- 최신버전의 자바스크립트를 대상 플랫폼에서 지원하는 가장 낮은 자바스크립트 버전으로 변환하다. 예를 들어 for..of 루프와 async/await는 자동으로 for 루프와 .then 호출로 변환된다.
### 폴리필
-  실행하려는 자바스크립트 런타임이 포함하지 않는 최신 기능을 폴리필로 제공한다. 자바스크립트 표준 라이브러리에서 제공하는 기능(Promise, Map, Set)과 프로토타입 메서드(Array.prototype.include 와 Function.prototype.bind)를 제공할 때 사용한다. 

# 웹팩(빌드 도구)는 필요할까?
## 개요
- node_modeuls 에 들어 올때 dist 폴더 형태로? 들어오면 빌드가 된 건인가?
## 사례
### axios 
- webpack에서 rollup 으로 변경 했다. (2022월 2월에)
- axios는 브라우저에서도 로드해서 쓰니까 필요한가?
### lodash
- 빌드툴, 타입스크립트 등을 안쓰는 듯 함
### pnia
- 롤업 씀


# package.json (https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
## main
기본 필드는 프로그램의 기본 진입점인 모듈 ID입니다. 즉, 패키지 이름이 foo이고 사용자가 이를 설치한 다음 require('foo')를 수행하면 기본 모듈의 내보내기 개체가 반환됩니다.
패키지 폴더의 루트에 상대적인 모듈이어야 합니다.
대부분의 모듈의 경우 기본 스크립트를 갖는 것이 가장 합리적이며 다른 경우는 많지 않습니다.
main이 설정되지 않은 경우 기본적으로 패키지의 루트 폴더에 있는 index.js로 설정됩니다.
# browser
- 이 browser필드는 모듈 작성자가 클라이언트 측 사용을 위해 모듈을 패키징할 때 javascript 번들러 또는 구성 요소 도구에 대한 힌트로 제공됩니다. 이 필드는 일반적으로 프로젝트 소스 트리의 루트에 있는 package.json파일( 여기 에 설명됨)에서 찾을 수 있습니다.
- 필드에 대해 단일 문자열을 지정하면 해당 문자열 browser이 대체 main되고 모듈 진입점이 됩니다. 이 main필드는 모듈에 대한 진입점을 지정하므로 모듈을 교체하면 브라우저 사용을 위해 번들러가 모듈을 패키징할 때 진입점을 교체할 수 있습니다.
- https://github.com/webpack/webpack/issues/4674
- https://github.com/defunctzombie/package-browser-field-spec
- https://github.com/TheLarkInn/compare-webpack-target-bundles

# module
- https://stackoverflow.com/questions/42708484/what-is-the-module-package-json-field-for
-  모듈 필드는 Node.js에서 공식적으로 정의하지 않았으며 지원 계획도 없습니다. 대신 Node.js 커뮤니티는 더 다재다능하다고 생각하는 `export`  정착했습니다.
- 실질적인 이유로 JavaScript 번들러는 모듈 필드를 계속 지원할 것입니다. esbuild 문서는 모듈을 사용하는 시기와 관련 필드 기본 및 브라우저를 설명합니다.

# main vs module
- The main field makes sure that Node users using require will be served the UMD version. The module field is not an official npm feature but a common convention among bundlers to designate how to import an ESM version of our library.(https://levelup.gitconnected.com/code-splitting-for-libraries-bundling-for-npm-with-rollup-1-0-2522c7437697?gi=b6e0b96e263c#9f6f)
- https://esbuild.github.io/api/#main-fields

# UMD
- AMD, CommonJS, 그리고 기존처럼 window에 추가하는 방식까지 모든 경우를 커버할 수 있는 모듈

# unpkg
-  npm에 등록된 패키지를 CDN으로 바로 활용 가능한 서비스.
```html
<!-- React -->
<script src="https://unpkg.com/react@15.3.1/dist/react.min.js"></script>
<!-- Lodash -->
<script src="https://unpkg.com/lodash@4.17.4/lodash.min.js"></script>
<!-- Bootstrap css -->
<script src="https://unpkg.com/bootstrap@3.3.7/dist/css/bootstrap.min.css"></script>
```
# exports
## webpack의 이야기
- https://webpack.kr/blog/2020-12-08-roadmap-2021/#exportsimports-packagejson-field
- Node.js 14는 패키지의 엔트리 포인트를 정의할 수 있도록 package.json의 exports 필드에 대한 지원을 추가했습니다. Webpack 5는 이를 따랐고 production/development과 같은 추가 조건을 추가했습니다.
- 그 직후 Node.js는 이에 대한 추가 기능을 추가했습니다. 그들은 또한 개인 수입을 위한 imports 필드를 추가했습니다.
- 우리가 추가하고 싶은 것중 하나입니다.
## node 의 이야기
- https://nodejs.org/api/packages.html#nodejs-packagejson-field-definitions



# 이미지리소스가 있는 node package module은 어떤 것들이 있을까?
- swiper 의 경우 오른쪽 왼쪽 버튼 svg => 그마저도 폰트로 만들어 버림
- 그냥 안넣는게 좋을거 같다.(?)



# 쿠키생성 유틸 함수에 대해
- path 도 받아야 할거 같습니다

# css 는 어떻게 생성 할것인가?
## swiper 
- js는 rollup, css는 직접 less 써서 빌드 함.

```json
"exports": {
    ".": "./swiper.esm.js",
    "./core": "./swiper.esm.js",
    "./swiper.esm.js": "./swiper.esm.js",
    "./bundle": "./swiper-bundle.esm.js",
    "./swiper-bundle.esm.js": "./swiper-bundle.esm.js",
    "./css": "./swiper.min.css",
    "./swiper.min.css": "./swiper.min.css",
    "./swiper.css": "./swiper.css",
    "./css/bundle": "./swiper-bundle.min.css",
    "./swiper-bundle.min.css": "./swiper-bundle.min.css",
    "./swiper-bundle.css": "./swiper-bundle.css",
    "./css/a11y": "./modules/a11y/a11y.min.css",
    "./css/autoplay": "./modules/autoplay/autoplay.min.css",
    "./css/controller": "./modules/controller/controller.min.css",
    "./css/effect-coverflow": "./modules/effect-coverflow/effect-coverflow.min.css",
    "./css/effect-cube": "./modules/effect-cube/effect-cube.min.css",
    "./css/effect-fade": "./modules/effect-fade/effect-fade.min.css",
    "./css/effect-flip": "./modules/effect-flip/effect-flip.min.css",
    "./css/effect-creative": "./modules/effect-creative/effect-creative.min.css",
    "./css/effect-cards": "./modules/effect-cards/effect-cards.min.css",
    "./css/free-mode": "./modules/free-mode/free-mode.min.css",
    "./css/grid": "./modules/grid/grid.min.css",
    "./css/hash-navigation": "./modules/hash-navigation/hash-navigation.min.css",
    "./css/history": "./modules/history/history.min.css",
    "./css/keyboard": "./modules/keyboard/keyboard.min.css",
    "./css/lazy": "./modules/lazy/lazy.min.css",
    "./css/manipulation": "./modules/manipulation/manipulation.min.css",
    "./css/mousewheel": "./modules/mousewheel/mousewheel.min.css",
    "./css/navigation": "./modules/navigation/navigation.min.css",
    "./css/pagination": "./modules/pagination/pagination.min.css",
    "./css/parallax": "./modules/parallax/parallax.min.css",
    "./css/scrollbar": "./modules/scrollbar/scrollbar.min.css",
    "./css/thumbs": "./modules/thumbs/thumbs.min.css",
    "./css/virtual": "./modules/virtual/virtual.min.css",
    "./css/zoom": "./modules/zoom/zoom.min.css",
```



# FE 동향
https://github.com/naver/fe-news
