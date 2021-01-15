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
- @babel/plugin-transofrm-runtime
- @babel/preset

## @babel/plugin-{}
- babel 이 문법 변환하려면 어떻게 변환 해야 하는지 지침이 있어야 하는데, 
- 이것이 plugin 
- 즉 plugin 없으면 인풋과 아웃풋의 문법이 동일하다. 
- Babel is a compiler (source code => output code). Like many other compilers it runs in 3 stages: parsing, transforming, and printing.
-  Now, out of the box Babel doesn't do anything. It basically acts like const babel = code => code; by parsing the code and then generating the same code back out again. You will need to add plugins for Babel to do anything.
  
## polyfill (@babel/pollyfil, core-js, regenerator-runtime)
- 플러그 인이 문법을 어떻게 변환해야하는지 알려주는 지침이라면
- 폴리필은 메서드를 어떻게 변환할지 알려주는 지침이다. (지침이라기 보다는 그냥 그 메서드를 구현해 놓은 함수 집합체의 느낌)
- this means you can use new built-ins like Promise or WeakMap, static methods like Array.from or Object.assign, instance methods like Array.prototype.includes, and generator functions (provided you use the regenerator plugin). The polyfill adds to the global scope as well as native prototypes like String in order to do this.

### @babel/pollyfil
- core-js 와 regenerator-runtime 을 둘다 가지고 있는그냥 집합체
- core-js 와 egenerator-runtime을 항상 같이 사용할 필요가 없기때문에 deprecated 되었다. 

### core-js
- 일반적인 built-ins, static methods, instance methods 등의 폴리필을 가지고 있는 모듈

### regenerator-runtime
- generator function 관련 폴리필을 가지고 있는 모듈
- 참고로 프로미스도 generator 구현이기때문에 이게 필요하다. 

## @babel/preset-env
- 모든 문법 플러그인을 가지고 있고 주어진 환경에 따라 (browserlist 나 env 옵션중 target 으로 설정해야 한다.) 사용할 플러그인을 import 한다. 
- usage 옵션을 통하여 polyfill 계열도 주어진 환경에 따라 사용할 polyfil 만 골라서 import 한다. 
- 즉 preset-env 는 기본적으로 분법 플러그인을 위한거라고 생각하면 되고, usage 옵션을 어떻게 설정하냐에 따라 polyfill 도 적용할지 안할지 할수 있다는 것

## (추가)  @babel/plugin-transform-runtime
- 그러니까 메서드를 변환하려면 core-js 와 refenrator-runtime 이 필요하다. 
- 즉, 위에서 보면 core-js와 refenrator-runtime를 직접 넣던지, @babel/polyfill 으로 넣던지 인데, 
- 
-  @babel/plugin-transform-runtime 을 사용하면 core-js 기반의 core-js-pure를 사용하여 전역을 오염시키지 않고 polyfill을 적용한다.  (https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelruntime)
-  
- 일반적인 문법 plugin 과 다르다
- Babel uses very small helpers for common functions such as _extend. By default this will be added to every file that requires it. This duplication is sometimes unnecessary, especially when your application is spread out over multiple files.
- polyfill 은 기본적으로 전역을 덮어 쓴다. 
- This is where the @babel/plugin-transform-runtime plugin comes in: all of the helpers will reference the module @babel/runtime to avoid duplication across your compiled output. The runtime will be compiled into your build.
- 그 전역으로 덮어쓴 폴리필을 지역을로 바꿀수 있다. 