# Babel

- 기본적은 문법 변환 장치이다. 
- Transform syntax
- 그러니까 문장만 변경 할수 있다. 
- 컴파일 할때 한다는 것이다. 

## 주요개념
- @babel/plugin-{}
- @babel/polyfill
- core-js (바벨꺼 아님)
- regenerator-runtime (바벨꺼 아님)
- @babel/plugin-transofrm-runtime - Babel의 주입된 도우미 코드를 재사용하여 codesize를 절약할 수 있는 플러그인입니다.
  - [corejs 옵션과 함께 사용하면 폴리필도 포함한다.](https://babeljs.io/docs/en/babel-plugin-transform-runtime#corejs)
- @babel/preset

## @babel/plugin-{}
- babel 이 문법 변환하려면 어떻게 변환 해야 하는지 지침이 있어야 하는데, 
- 이것이 plugin 
- 즉 plugin 없으면 인풋과 아웃풋의 문법이 동일하다. 
- Babel은 컴파일러입니다(소스 코드 => 출력 코드). 다른 많은 컴파일러와 마찬가지로 구문 분석, 변환 및 인쇄의 3단계로 실행됩니다.
- 이제 기본적으로 Babel은 아무 것도 하지 않습니다. 기본적으로 const babel = code => code; 코드를 구문 분석한 다음 동일한 코드를 다시 생성합니다. Babel이 무엇이든 하려면 플러그인을 추가해야 합니다.


- Babel is a compiler (source code => output code). Like many other compilers it runs in 3 stages: parsing, transforming, and printing.
-  Now, out of the box Babel doesn't do anything. It basically acts like const babel = code => code; by parsing the code and then generating the same code back out again. You will need to add plugins for Babel to do anything.

- 중요!! 꼭 문법 말고 폴리필도 다 포함이다. @babel/pollyfil 이 너무 다 가지고 있어서 플러그인에 넣을 필요가 없었던 것 **같다**
## polyfill (@babel/pollyfil, core-js, regenerator-runtime)
- 플러그 인이 문법을 어떻게 변환해야하는지 알려주는 지침이라면
- 폴리필은 메서드를 어떻게 변환할지 알려주는 지침이다. (지침이라기 보다는 그냥 그 메서드를 구현해 놓은 함수 집합체의 느낌)
- 즉, Promise 또는 WeakMap과 같은 새로운 내장 기능, Array.from 또는 Object.assign과 같은 정적 메서드, Array.prototype.includes와 같은 인스턴스 메서드 및 생성기 기능(재생성 플러그인을 사용하는 경우)을 사용할 수 있습니다. 폴리필은 이를 수행하기 위해 String과 같은 기본 프로토타입뿐만 아니라 전역 범위에 추가합니다.

- this means you can use new built-ins like Promise or WeakMap, static methods like Array.from or Object.assign, instance methods like Array.prototype.includes, and generator functions (provided you use the regenerator plugin). The polyfill adds to the global scope as well as native prototypes like String in order to do this.

[babel plugin vs polyfill](https://ui.dev/compiling-polyfills/)
### @babel/pollyfil
- core-js 와 regenerator-runtime 을 둘다 가지고 있는그냥 집합체
- core-js 와 egenerator-runtime을 항상 같이 사용할 필요가 없기때문에 deprecated 되었다. 

### core-js
- 일반적인 built-ins, static methods, instance methods 등의 폴리필을 가지고 있는 모듈

### regenerator-runtime
- generator function 관련 폴리필을 가지고 있는 모듈
- 참고로 async generator 구현이기때문에 이게 필요하다. 

## @babel/preset-env
- 모든 문법 플러그인을 가지고 있고 주어진 환경에 따라 (browserlist 나 env 옵션중 target 으로 설정해야 한다.) 사용할 플러그인을 import 한다. 
- `usage` 옵션을 통하여 polyfill 계열도 주어진 환경에 따라 사용할 polyfil 만 골라서 import 한다. 
- 즉 preset-env 는 기본적으로 분법 플러그인을 위한거라고 생각하면 되고, `usage` 옵션을 어떻게 설정하냐에 따라 polyfill 도 적용할지 안할지 할수 있다는 것

## (추가)  @babel/plugin-transform-runtime
- 단 @babel/plugin-transform-runtime 은 자체적으로 문법 변환은 못한다. 플러그인이 있어야 해당 문법에 대한 처리를 일단 플러그인이 하고 (헬퍼 함수를 삽입하고), 그 헬퍼 함수에 맞는 헬퍼 모듈을 가지고 와서 함수대신 import 하는 식이다. (엄청 중요하고 햇갈린다)
- 정의 : Babel의 주입된 도우미 코드를 재사용하여 codesize를 절약할 수 있는 플러그인입니다.
- 그러니까 메서드를 변환하려면 core-js 와 refenrator-runtime 이 필요하다. 
- 즉, 위에서 보면 core-js와 refenrator-runtime를 직접 넣던지, @babel/polyfill 으로 넣던지 인데, 
- core-js@3 과 함게 @babel/plugin-transform-runtime 을 사용하면 @babel/runtime 대신 @babel/runtime-corejs3 을 사용하며 이건 core-js 기반의 core-js-pure를 사용하여 전역을 오염시키지 않고 polyfill을 적용한다.  (https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelruntime)
- **corejs 옵션없이 @babel/plugin-transform-runtime 사용면 폴리필 적용이 안된다(@baebl/runtime 은 폴리필을 가지고 있지 않으므로)**
  - https://babeljs.io/docs/en/babel-plugin-transform-runtime#corejs
- 폴리필은 일반적인 문법 plugin 과 다르다

- 사용하는 이유는 일반적인 polyfill 은 기본적으로 전역을 덮어 쓰는데,
- Babel은 _extend와 같은 일반적인 기능에 매우 작은 도우미를 사용합니다. 기본적으로 이것은 필요한 모든 파일에 추가됩니다. 특히 애플리케이션이 여러 파일에 분산되어 있는 경우 이러한 복제가 필요하지 않은 경우가 있습니다.
- 여기에서 @babel/plugin-transform-runtime 플러그인이 제공됩니다. 모든 도우미는 컴파일된 출력에서 ​​중복을 피하기 위해 @babel/runtime 모듈을 참조합니다. 런타임이 빌드로 컴파일됩니다.
  - Babel uses very small helpers for common functions such as _extend. By default this will be added to every file that requires it. This duplication is sometimes unnecessary, especially when your application is spread out over multiple files.
  - This is where the @babel/plugin-transform-runtime plugin comes in: all of the helpers will reference the module @babel/runtime to avoid duplication across your compiled output. The runtime will be compiled into your build.
- orejs 옵션으로 core-js@3 을 사용하면 @babel/plugin-transform-runtime 을 사용하면 그 전역으로 덮어쓴 폴리필을 지역을로 바꿀수 있다
- 참고사항 : Instance methods such as "foobar".includes("foo") will only work when using corejs: 3.
- 참고사항 : [The reason babel is including the polyfills is because the @babel/transform-runtime plugin doesn't have an option to specify targets, ](https://github.com/babel/babel/issues/11539)

## @babel/runtime
- `문법(플러그인) 모음`과 `regenerator-runtime` 을 가지고 있는 라이브러리.
- 이것은 Babel 플러그인 @babel/plugin-transform-runtime과 함께 런타임 종속성으로 사용하기 위한 것입니다. 사용법은 해당 패키지의 설명서를 확인하십시오.
- This is meant to be used as a runtime dependency along with the Babel plugin @babel/plugin-transform-runtime. Please check out the documentation in that package for usage.

# @babel/plugin-transform-runtime 과 @babel/preset-env 를 같이 쓰면 안된다?
https://github.com/babel/babel/issues/9853#issuecomment-619587386
# 참고 할만한 페이지
https://simsimjae.medium.com/%EA%B0%9C%EB%B0%9C%EC%9D%84-%ED%95%98%EB%8B%A4%EB%B3%B4%EB%8B%88-%EC%9D%B4%EB%9F%B0-%EC%97%90%EB%9F%AC%EA%B0%80-%EC%83%9D%EA%B2%A8%EC%84%9C-%EC%9B%90%EC%9D%B8%EC%9D%84-%EC%B0%BE%EB%8B%A4%EA%B0%80-%ED%8F%B4%EB%A6%AC%ED%95%84-%EB%AC%B8%EC%A0%9C%EB%9D%BC%EB%8A%94%EA%B1%B8-%EA%B9%A8%EB%8B%AB%EA%B3%A0-%EC%A0%95%EB%A6%AC%ED%95%A9%EB%8B%88%EB%8B%A4-217a207f8181

https://tech.kakao.com/2020/12/01/frontend-growth-02/