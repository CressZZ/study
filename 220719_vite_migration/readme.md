# "isolatedModules": true
https://vitejs.dev/guide/features.html#typescript

esbuild는 타입 정보 없이 타입스크립트를 자바스크립트로 변환하는 업무만 수행하기 때문에 const enum 및 암시적 유형 전용 가져오기와 같은 특정 기능을 지원하지 않습니다.


# comomnjs에 대해

나의 결론은 그냥 쓰지 말아라 

## 빌드 할때 (데브 서버 말고, 프리뷰 등)
@rollup/plugin-commonjs 을 vite가 내장 하고 있다.  https://vite-rollup-plugins.patak.dev/
그래서 그냥 config 옵션중에 `build.commonjsOptions` 에 옵션을 넣어주면 알아서 설정된다. 
중요한건 `include` 옵션인데, `/src/*` 등으로 설정 해주자
```js
  build:{
    commonjsOptions: {include:['/src/*']}
  }
```
암튼 이렇게 하면, module.exports 던 rquire 던 잘 변환해준다. 

## 데브 서버
문제는 이건데...데브서버에서 rquire를 사용할 방법을 못찾겠다.
일단 여라가지 테스트를 통해서 @rollup/plugin-commonjs 은 데브서버에서는 소용 없다는 걸 알았다. 
근데 그럼 어쩌지?
https://github.com/vite-plugin/vite-plugin-commonjs 이런걸 쓰라고 나오는데, 이건 개인이 만든거고
동작도 안한다. !!!!!!
여튼 해당문서에 
📦 Out of the box
🔨 Work only in the vite serve phase
🚚 In the vite build phase, CommonJs syntax will be supported by builtin @rollup/plugin-commonjs
이렇게 나오는데, 음 그니까 데브 서버 돌릴때는 이거 쓰고 , 빌드 할때는 rollup/plugi-commonjs 쓰라는 건데
안된다니까!

## 데브서버 다른 플러그인
이거 작성하는 도중에 vite 플러그인 모음 https://github.com/vitejs/awesome-vite#plugins 에서 commonjs  로 검색하니까
https://github.com/originjs/vite-plugins/tree/main/packages/vite-plugin-commonjs 이 나왔다!

젠장 이건 잘된다.
아무튼 그냥 vite 나 기타 esm 을 바탕으로 하는 빌드 툴에서는 그냥 commonjs 쓰지말자 
사실 쓸 이유도 별로 없잖아


# dev, preview, build
## dev
그러니까, vite 는 dev 로 dev 서버를 돌리면, 빌드를 안한다...
node_modules 에 있는것만 cjs -> ejs 로 pre-build라는 걸 하고, 나머지는 브라우저에게 맡긴다. 
브라우저는 ejs 모듈 임포트를 할수 있으니까!(물론 최신 브라우저의 경우를 말한다.)
암튼 pre-build 할때도  Esbuild 라는걸 쓰고 있어서 엄청 빠르다고 한다. (Go 언어로 작성되서 빠르다고 한다.)

## build
근데 실제로 프로덕트 버전으로 내보낼때는 따로 빌드를 좀 해줘야 한다. 
내가 만든 소스 파일만큼 그대로 배포가 되면 파일이 수십개 인데, HTTP/2를 이용하더라도 오버헤드가 발생될 수 있기 때문이다. 
적절하게 섞어서 파일을 몇몇개로 줄여 버린다는 이야기.
이때는 Esbuild 라는걸 쓰지 않는데, 그이유는 청크 나누는 기능.. 그러니까 파일 수십개를 수개로 줄이는 작업이 아직 Esbuild가 약하다는 이야기
나중에 변경 될수도 이;ㅆ다고 한다. 

## preview
데브 서버를 돌리기는 하는데, 
build된 파일을 바탕으로 로컬 데브 서버를 돌린다. 
그냥 dev 명령어랑은 다르다. 

# dev 모드에서..
파일을 로드 하게 되면 (import 하게 되면) 그때그때 분석해서 오류 있으면 페이지 안나오네
와... 짜증나는데?

이게 좋은가?

# commonjs
require 있으면 안됨 
해결책으로 두개의 플러그인이 있는데

## 롤업 플러그인

## vite 플러그인

# tailwind & postcss
pacakge.json에 type="module" 이 있으면 일단 프로젝트의 모든 js 파일을 esm으로 간주한다는 이야기이고, 
vite 는 이에 따라 tailwind.config.js 에 rquire()가 있으면 애러를 밷는다. (webpack 은 아니던데!!!!!)

암튼 type="module" 지우거나 .cjs 확장자로 바꾸면 되기 하는데
이건 vite 가 동작 할때 그니까.. 음.. 빌드 할때? 필요한 작업이라 되는거지
실제 내 소스 파일에 require()가 있으면 안된다. 내 소스 파일은 브라우저에서 내가 필요할때 그순간에 불러오니까.. 브라우저에서 require 라는 메서드가 정의 되어 있지 않다고 애러 난다
뭔소리래

#
Vite 프로젝트에서 index.html이 공개적으로 숨겨져 있는 대신 전면 중앙에 있다는 사실을 눈치채셨을 수 있습니다. 이것은 의도된 것입니다. 개발 중 Vite는 서버이고 index.html은 애플리케이션의 진입점입니다.

Vite는 index.html을 소스 코드 및 모듈 그래프의 일부로 취급합니다. JavaScript 소스 코드를 참조하는 스크립트 type='module' src='...'를 확인합니다. 링크 href를 통해 참조되는 인라인 스크립트 type='module' 및 CSS도 Vite 관련 기능을 즐깁니다. 또한 index.html 내의 URL은 자동으로 다시 기반이 되므로 특별한 %PUBLIC_URL% 자리 표시자가 필요하지 않습니다.

정적 http 서버와 유사하게 Vite는 파일이 제공되는 '루트 디렉토리'라는 개념을 가지고 있습니다. 문서의 나머지 부분에서 루트로 참조되는 것을 볼 수 있습니다. 소스 코드의 절대 URL은 프로젝트 루트를 기본으로 사용하여 확인되므로 일반 정적 파일 서버에서 작업하는 것처럼 코드를 작성할 수 있습니다(더 강력한 방법 제외!). Vite는 또한 루트 외부 파일 시스템 위치로 확인되는 종속성을 처리할 수 있으므로 단일 저장소 기반 설정에서도 사용할 수 있습니다.

Vite는 여러 .html 진입점이 있는 다중 페이지 앱도 지원합니다.

대체 루트 지정#
vite를 실행하면 현재 작업 디렉토리를 루트로 사용하여 개발 서버가 시작됩니다. vite serve some/sub/dir을 사용하여 대체 루트를 지정할 수 있습니다.




# 기타 vite에 대해

## Hot Module Replacement

## typescript
### isolatedModules
const enum 지원하지 않음. 
암시적으로 타입만을 가져오는 것과 같은 특정 기능 지원하지 않음

# 플러그인 사용하기 
Vite는 몇 가지 추가적인 Vite 전용 옵션과 함께 잘 설계된 Rollup의 플러그인 인터페이스를 기반으로 하는 플러그인들을 사용하여 확장할수 있습니다. 이는 Vite 사용자가 필요에 따라 개발 서버나 SSR과 같은 기능들을 확장할수 있는 것과 동시에, 검증된 Rollup 플러그인 생태계에서도 의존할 수 있음을 의미합니다. 













## 함수 스코프
```js
function makeCounter(){
  let count = 0;
  return function(){
    return count++;
  };
}

let counter = makeCounter();
```
makeCounter()가 실행되는 도중엔 본문이 한줄 짜리인 (`return count++`) 중첩 함수가 만들어 진다는 점입니다. 현재는 중첩함수가 생성되기만 하고 실행은 되지 않은 상태 입니다. 
여기서 중요한 사실이 하나 있습니다. 모든 함수는 함수가 생성된 곳의 렉시컬 환경을 기억한다는 점입니다. 
함수는 `[[Environment]]` 라 불리는 숨김 프로퍼티를 갖는데, 여기에 함수가 만들어진 곳의 렉시컬 환경에 대한 참조가 저장됩니다. 

따라서 (makeCounter 함수가 호출될어 실행된 시점에서 -> 더 정확히 함수 선언문을 읽어 들일때 -> 즉, 익명함수가 함수가 생성될때!! -> 그리고 그 함수가 리턴 되고, counter 변수에 할당 될때!!!!) `counter.[[Environment]]` 엔 `{count:0}` 이 있는 렉시컬 환경에 대한 참조가 저장됩니다.  호출 장소와 상관없이 함수가 자신이 태어난 곳을 기억할 수 있는 건 바로 이 `[[Environment]]` 프로퍼티 덕분입니다. `[[Environment]]`는 함수가 생성될 때 딱 한 번 값이 세팅되고 영원히 변하지 않습니다.

**중요**
`counter()` 를 호출하면 각 호출마다 새로운 렉시컬 환경이 생성됩니다. 
그리고 이 렉시컬 환경은 `counter.[[Environment]]` 에 저장된 렉시컬 환경을 외부 렉시컬 환경으로서 참조 합니다. 

실행 흐름이 중첨 함수의 본문으로 넘어오면 `count` 변수가 필요한데, 먼저 자체 렉시컬 환경에서 변수를 찾습니다. 익명 중첩 함수엔 지역변수가 없기 때문에 이 렉시컬 환경은 비어있는 상황입니다. (<empth>). 이제 `counter()`의 렉시컬 환경이 참조 하는 외부 렉시컬 환경에서(`[[Environment]]`)에서 count를 찾아 봅시다. count를 찾았습ㄴ디ㅏ. 

변수값 갱신은 변수가 저장된 렉시컬 환경에서 이뤄집니다. 

## 클로저 
클로저(closure)는 개발자라면 알고 있어야 할 프로그래밍 용어입니다. 

클로저는 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미합ㄴ디ㅏ. 몇몇 언어에선 클로저를 구현하는 게 불가능 하거나 특수한 방식으로 함수를 작성해야 클로저를 만들수 있ㅅ븐디ㅏ. 하지만 자바스크리브에선 모든 함수가 자연스럽게 클로저가 됩니다. 예외가 하나 있긴 한데 자세한 내용은 new Function 문법에서 다루도록 하게습니다. 

요점을 정리해 봅시다. 자바스크립트의 함수는 숨김 프로퍼티인 `[[Environment]]`를 이용해 자신이 어디서 만들어 졌는지를 기억합니다. 함수 본문에선 `[[Environment]]` 를 사용해 외부 변수에 접근합니다. 

프론트 엔드 개발자 채용 인터뷰에서 "클로저가 무엇입니까?" 라는 질문을 받으면, 클로저의 정의를 말하고 자바스크립트에서 왜 모든 함수가 클러지인지에 관해 설명하면 될 것 같습니다. 이때 `[[Environment]]` 프로퍼티와 렉시컬 환경이 어떤 방식으로 동작하는지에 대한 설명을 덧붙이면 좋습니다. 


# 가비지 컬렉션
함수 호출이 끝나면 함수에 대응하는 렉시컬 환경이 메모리에서 제거됩니다. 함수와 관련된 변수들은 이때 모두 사라지죠. 함수 호출이 끝나면 관련 변수를 참조할 수 없는 이유가 바로 여기에 있습니다. 자바스크립트에서 모든 객체는 도달 가능한 상태일 때만 메모리에 유지 됩니다. 

그런데, 호출이 끝난 후에도 여전히 도달 가능한 중첩 함수가 있을 수 있습니다. 이때는 이 중첩함수의 `[[Environment]]` 프로퍼티에 함수 외부의 렉시컬 환경에 대한 정보가 저장됩니다. 

함수 호출은 끝났지만 렉시컬 환경이 메모리에 유지되는 이유는 바로 이 때문입니다. 







