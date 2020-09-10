# webpack code split
# 개요
webpack을 이용한 코드 스플릿에 대해 알아보고, 현재 우리 프로젝트에 적용 할수 있는지 확인해 본다. 

# webpack split을 익히기전에 알아야 할 개념

## dynamic import의 개념과 webpack에서 사용하는 방법
```js
import 'jquery' // 기본 import 
import('jqueyr').then(m => window.$ = m.jquery) // dynami import
```

promise를 이용하여 모듈 import를 동적으로 할수 있게 한다. 
아직 ECMAScript의 제안단계로서 표준이 아니다. 따라서 기본적으로 사용하려면 바벨 플러그인(babel-plugin-syntax-dynamic-import)이 필요하다. 바벨의 preset-env의 경우 표준만 지원 하기 때문이다. 

[It is important to note that @babel/preset-env does not support stage-x plugins.](https://babeljs.io/docs/en/babel-preset-env)

다만 webpack에서는 dynamic import를 자체적으로 지원하기 때문에 webpack을 사용할 경우 해당 바벨 플러그인이 필요하지 않다. 

[Version 2 of webpack supports ES6 module syntax natively, meaning you can use import and export without a tool like babel to handle this for you. Keep in mind that you will still probably need babel for other ES6+ features. The following methods are supported by webpack:](https://webpack.js.org/api/module-methods/#import-1)

단, babel의 preset-env가 wepack에서 사용 하는 import()가 리턴하는 값을 프로미스로 인식하지 않기 때문에, 구형 브라우저의 프로미스 구현을 위해 아래 두가지 방법중 하나가 필요하다. 

1. core-js 직접 삽입하기 : @babel/preset-env가 promise가 있는지 모르기 때문에 자동으로 필요한 core-js 모듈을 삽입하지 않는다. 따라서 수동으로 넣어 준다. (참고로 아래 링크에서 core-js/modules/es.promise 뿐 아니라 core-js/modules/es.array.iterator로 삽입 해주는 이유는 Promise.all([])등에서 해당 모듈을 사용하기 때문!)

[Currently, @babel/preset-env is unaware that using import() with Webpack relies on Promise internally. Environments which do not have builtin support for Promise, like Internet Explorer, will require both the promise and iterator polyfills be added manually.](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)

2. 그냥 babel-plugin-syntax-dynamic-import 를 사용한다. 

[As import() returns a promise, it can be used with async functions. However, this requires using a pre-processor like Babel and the Syntax Dynamic Import Babel Plugin. Here's how it would simplify the code:](https://webpack.js.org/guides/code-splitting/)

결론은 webpack에서 쓸거면 깔끔하게  babel-plugin-syntax-dynamic-import 을 사용한다. 

## webpack SplitChunksPlugin
webpack 에서 split하기 위하 사용했던 플러그인인데, webpack v4 부터는 해당 플러그인이 삭제되고 webpack의 optimization.splitChunks 옵션을 통하여 split을 진행한다. 그런데 webpack 문서를 보면 optimization.splitChunks에 대한 문서는 SplitChunksPlugin 문서에 나와 있다. (바꿨으면 문서도 옮기지...)
[By default webpack v4+ provides new common chunks strategies out of the box for dynamically imported modules. See available options for configuring this behavior in the SplitChunksPlugin page.](https://webpack.js.org/configuration/optimization/#optimizationsplitchunks)

## 크게 코드 스플릿을 사용하는 경우 
1. 동적으로 불러오는 모듈의 경우
동적으로 불러오는 라이브러리의 경우 처음부터 번들링 할 필요 없이 필요할때마다 불러오게 하면 버들된 파일 크기를 줄일 수 있다. 즉, 페이지 로딩시 불러오는 스크립트의 용량을 줄이고, 나중에 필요한 모듈은 나중에 서버에서 받아오면 된다. 

2. 정적으로 불러오는 모듈의 경우
예를 들어 어떤 사이트에서 modal.js라는 파일과 coupon.js라는 파일을 사용한다고 하자. 그 두개의 파일은 각각 `jquery`가 필요하다. 그럼 modal.js와 coupon.js 모두 `jquery`를 가진체 빌드 되는게 좋을까? 아니면 `jquery`를 별개의 파일로 분리한체 modal.js 와 coupon.js 가 그 파일을 참조 하는게 좋을까? 아래에서도 다시 언급하겠지만 사실이게 좀 애매하다. 다수의 크기가 작은 파일을 받아오는 것과 몇몇 개의 큰 파일을 불러오는 것중 효율이 좋은 것을 선택 해야 한다. 기본적으로 웹팩은 정적 모듈에 대한 split은 설정되어 있지 않다.

## webpack에서 code split 이란?
1. Entry Point를 두개 이상으로 설정하여 빌드를 여러 파일로 나누기 
    - 필요에 따라 빌드를 두개이상으로 나눈다.
2. Entry dependencies 설정 하기 
    - 나누어진 빌드에서 사용하는 디펜던시(라이브러리 등)를 Entry Point 설정에서 depenOn 옵션을 통해 빌드를 분리할수 있다. 
```js

module.exports = {
    mode: 'development',
    entry: {
        index: { import: './src/index.js', dependOn: 'shared' },
        another: { import: './src/another-module.js', dependOn: 'shared' },
        shared: 'lodash',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

```
3. optimization.splitChunks 설정하기 
    - 코드 스플릿의 핵심. Entry Point설정과 별개로 동작한다.

4. 동적 import() 사용하기
    - 동적 import()를 사용하면 optimization.splitChunks의 default 설정으로 인해 자동으로 코드 split이 된다. 

# optimization.splitChunks 사용하기

## split의 기본 조건

- 필요에 따라 로딩되는 dynamic impport를 사용하는 모듈의 경우 webpack이 기본적으로 split 해준다. 정적 모듈의 경우에는 자동으로 split 되지 않는데 왜냐하면, 동적 import의 경우 webpack이 알아서 import가 필요한 시점에 해당 파일을 서버로부터 불러들이는 코드를 만들 수 있는데 반해, 정적 모듈은 사용자가 직접 html에 split 된 chunk를 불러오기 위한 script tag를 작성해야 하기 때문이다. 따라서 아래에 나열된 4가지의 조건들은 말 그대로 기본 조건일 뿐이며 아래 조건을 충족한다고 해서 정적 모듈이 split 되는건 아니고, 정적 모듈을 split하려면 별도로 splitChunks.chunks을 'all' 이나 'initial'로 변경해 설정해줘야 한다. 

- split되어 만들어질 Chunk는 두곳 이상에서 import되는 모듈 이거나, node_module폴더 안에 존재하는 모듈이다. 
- split되어 만들어질 Chunk는 30kb 이상이다 (옵션에서 변경가능)
- 모듈이 필요해질때 동적으로 동시에 서버로부터 받아오는 모듈이 6개 이하이다. 즉 한번에 6개 이상의 동적 모듈이 필요할때는 chunk로 만들어 지지 않는다. (옵션에서 변경가능)
- 처음 페이지가 로딩 되었을때 서버로부터 받아오는 정적 모듈이 4개 이하이다. 즉 페이지 로딩시 4개 이상의 적적 모듈이 필요할때는 chunk로 만들어 지지 않는다. (옵션에서 변경가능)

3번째 4번째의 경우가 이해하기 힘들 수 있는데, 3번째의 경우부터 살펴보면 한순간에 갑자기 서버에서 새로운 파일 여러개를 호출 하는 것보다, 오히려 덩치가 큰 하나의 빌드가 더 성능적으로 괜찮다는 이야기 이다. 다만, HTTP/2의 경우에는 Multiplexing 이 되므로 큰 문제는 되지 않는 것으로 생각되나, webpack은 일단 위의 조건을 기본값으로 가지고 있다. 

4번째도 마찬가기로, 여러파일을 동시에 불러오는 것보다 덩치가 큰 하나의 빌드가 더 성능에 좋다는 뜻이다. 

## optimization.splitChunks 의 주요 옵션들
- 옵션에 대해 알아보기전에 염두해야 할 점은, optimization.splitChunks에 대한 공식문서가 정말 알아보기 힘들고 부정확하다는 점과, 옵션 변경에 따른 사이드 이펙트가 너무 많아서 반복적인 테스트에도 불구하고 옵션변경에 따른 100% 예상된 결과를 얻지 못했다는 점이다. 

- 중요한 것 하나는 optimization.splitChunks 를 사용할때 chashGroup 옵션을 꼭 사용하여 default 로 설정된 값들을 덮어 쓰는 것이다. 

- 더 좋은 것은 웹팩에서 설정된 기본값을 사용하는 것이다. 

> The default configuration was chosen to fit web performance best practices, but the optimal strategy for your project might differ. If you're changing the configuration, you should measure the impact of your changes to ensure there's a real benefit.

### optimization.splitChunks.cacheGroups
임의의 그룹별로 기본 설정되어 있는 splitChunks의 값들을 덮어 쓴다. 
그룹은 다양하게 구성할수 있으며 각 그룹은 고유의 설정을 가진다. 

### optimization.splitChunks.chunks
async, all, initial 값을 설정 해줄수 있다. 
- async: 설정안하면 들어가는 기본 값이다. 같은곳에서 불러오는 동적 모듈만 split 하여 chunk 파일을 만든다. (참고로 all, initial의 경우에도 동적 모듈을 split 시킨다.)

- initial: 같은곳에서 불러오는 정적 모듈을 split 시킨다. 동적 모듈 또한 split 된다. 단 정적 모듈과 동적 모듈에 해당하는 chunk 파일이 따로 생성 된다. 

- all : 같은곳에서 불러오는 정적 모듈과 동적 모듈을 하나로 묶어서 하나의 chunk 파일을 생성 한다. 

### optimization.splitChunks.maxAsyncRequests
- 동시에 불러올수 있는 최대 동적 모듈 숫자. 즉, 너무 많은 모듈을 동적으로 불러옴으로서 발생하는 성능 저하를 방지할 목적이다. 
### optimization.splitChunks.maxInitialRequests
- 페이지 로딩시 불러오는 최대 모듈 숫자. 즉, 너무 많은 모듈을 한번에 가져 옴으로서 발생하는 성능 저하를 방지할 목적이다. 

### optimization.splitChunks.minChunks
- 최소한 몇번 sharing 되고 있는지를 정한다. 즉 너무 적은곳에서 참조하고 있는 모듈이라면 별도로 분리 하지 않겠다는 의미다. 
- 단, 해당 옵션을 사용할때 꼭 cacheGroup 옵션 내에서 사용해야 한다.(개인적인 테스트 결과) 그렇지 않으면 너무 예상하지 못한 결과들이 나온다. 또한 webpack github issue 에도 관련 글이 있으나, 공식문서에서는 왜 이렇게 해야 하는지 정확히 파악 할수 없었다. (https://github.com/webpack/webpack/issues/7702)
- 웹팩 문서는 정말 좋지 않다.

# 결론 
코드 스플릿이라는것을 알고 있었으나 사용하는 것이 흔하지 않았기 때문에 전체적으로 검토를 해보았다. 그러나, 코드 스플릿은 싱글 페이지 어플리케이션에 매우 좋은 선택이 될것으로 생각되나 현재 우리의 상황에는 그다지 사용할 일이 없다 라는 것을 깨달았다. 우리 프로젝트들은 페이지 단위의 개발 환경이 아니라 기능별 구성에 가깝기 때문에 즉, 번들링 작업을 한번만 하는 것이 아니라 기능 별로 하기 때문에 벤더 파일을 하나로 묶는것이 어려울 뿐더러 적합하지도 않다. 

만약 코드 스플릿을 사용하게 된다면 싱글페이지 구성에서, 더욱이 세부적인 옵션 조정을 하기 보다는 기본 설정을 통해 하는 것이 성능면에서도 더 좋을 것으로 생각 된다. 

단, 밴더파일의 스플릿과는 별개로 동적 import()의 경우만 생각 해본다면 해당 기능은 잘 사용 하면 매우 유용 할것 같으며 필요시 우리 프로젝트에서도 활용이 가능 할 것으로 보인다. 

그리고 웹팩 문서는 별로다.









