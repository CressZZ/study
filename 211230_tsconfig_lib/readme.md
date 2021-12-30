# tsconfig의 lib 이란 무엇인가
https://www.typescriptlang.org/tsconfig#lib

## 타입스크립트 프로그래밍 309pg
TSC 는 코드를 예전 자바스크립트 버전으로 트랜스파일 하는  기능을 기본으로 지원하지만 폴리필은 자동으로 해주지 않는다.
- target: 트렌스파일하려는 자바스크립트 버전을 설정한다.(es5, es2015 emd)
- module: 대상 모듈 시스템을 설정한다. (es2015모듈, commonjs 모듈, systemjs 모듈등)
- lib: 타입스크립트에게 대상 환경에서 어떤 자바스크립트 기능을 지원하는지 알려준다.(es5 기능, es2015기능, dom 등). 실제로 기능을 구현하는 것은 아니지만(따라서 폴리필이 필요함) 적어도 이런 기능들을 이용할 수 있다는 사실을 타입스크립트에 알려준다.(네이티브 또는 폴리필을 이용.)
응용프로그램을 실행할 환경의 자바스크립트 버전을 target에 설정하고, 어떤 기능을 쓸지는 lib에 설정한다. 환경 정보를 정확히 알 수 없을 때는 둘다 es5 fh tjfwjdgkaus dkswjsgksek. 

# 오키 설명은 알겠는데 문제가 발생했다. 
```json

// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",   
    "lib": ["es5", "dom"],           
    // "lib": ["es5", "dom", "ES2015.Promise"],           
  }
}
```

위와 같이 설정하면 Promise 는 tsc에서 애러가 나야 하는데 애러가 안난다.!
왜냐 하면 Promise 는 es6 기능이니까!! (ES2015.Promise 를 추가 해야지 애러가 안나야 하는데...그냥 애러가 안난다.)

```js
// index.ts
Promise.resolve('done')
```

- 인터넷을 아무리 뒤져도 똑같은 이야기만 한다. 
- lib는 폴리필이 어쩌구... promise를 애러 없이 tsc로 사용하려면 lib 에 적절한 library를 추가 해야한다구 어쩌구, 아니면 애러난다고 하고

# 일단 집고 넘어갈게
- lib는 typescript 패키지에서 기본으로 제공하는 d.ts 파일이다. 
- 기본으로 제공하는 d.ts 가 아니라면, 그냥 d.ts 파일이겠지 
- 나중에 나오겠지만, `@types/node/index.d.ts` 파일을 보면 아래처럼 `lib` 와 `path` 로 나뉘어 있는걸 볼수 있는데, 
- 아마도 타입스크립트에서 제공하는 라이브러리(d.ts)를 참조하는가? 아니면 커스텀으로 만든 d.ts를 참조 하는가로 나뉘는 것으로 보인다.  
```ts
// Reference required types from the default lib:
/// <reference lib="es2020" />
/// <reference lib="esnext.asynciterable" />
/// <reference lib="esnext.intl" />
/// <reference lib="esnext.bigint" />

// Base definitions for all NodeJS modules that are not specific to any version of TypeScript:
/// <reference path="assert.d.ts" />
/// <reference path="assert/strict.d.ts" /

```

# 자자 그럼 뭐가 문제인가 를 확인하기 전에 또 집고 넘어가야 할게 몇개 있는데 
## tsc 를 cli에서 실행할때 주의점
- https://www.typescriptlang.org/docs/handbook/compiler-options.html
- tsc를 cli에서 실행할때 파일명을 넣어주면 tsconfig.json 을 무시하고 기본설정으로 컴파일 된다고 나온다. 
- 와 이것때문에 고생했음.... ㅡㅡ;
- 근데 기본설정이라기 보다는 이전에 컴파일한 설정을 캐시로 가지고 있어서 그거 참조 하는거 같은데
- 아무튼 파일명 넣지 말자.... 뭔가 의도한대로 컴파일이 안되서 이게 뭐지 하고 엄청 찾다가 우연히 찾아냄. 거의 몇시간 고생함
```shell
# Run a compile based on a backwards look through the fs for a tsconfig.json
tsc
# Emit JS for just the index.ts with the compiler defaults
tsc index.ts
```

## lib는 target 을 지정할때 기본 세팅되어 있는걸 참조 하여 맞춤형식으로 알아서 들어감
- 중요한건 tsconfig에서 아애 `lib` 옵션이 없어야 한다는 것이다. 빈값, 빈배열 이런거 안됨. 
- 빈배열로 들어가면 `lib` 를 아무것도 안넣겠다는 뜻이다. 
- https://norux.me/59 여기 좀 자세히 나옴

```json
    "target": "es6",                                  
    // "lib": [], // 이렇게 해야 target: es6에 해당하는 디폴트 라이브러리가 들어간다. 
    "lib": [] // 이렇게 하면 라이브러리가 아무것도 안들어간다
```

# 오키 다 알겠음. 근데 왜 lib 를 비워놓고, target을 es5로 했는데, es6무법인 promise가 들어가는걸까?
## 이것에 대한원인을 찾게 해준 기능을 먼저 소개하면 
- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-2.html#understanding-your-project-structure-with---explainfiles
- `explainFile`  라는 옵션이다. 
> 이 옵션을 사용할 때 TypeScript 컴파일러는 파일이 프로그램에서 종료된 이유에 대해 매우 자세한 출력을 제공합니다. 더 쉽게 읽으려면 출력을 파일로 전달하거나 쉽게 볼 수 있는 프로그램으로 파이프할 수 있습니다.

## explainFile 로 뽑아낸 내역을 보면
```text
...

  Library referenced via 'es2019' from file 'node_modules/typescript/lib/lib.es2020.d.ts'
node_modules/typescript/lib/lib.es2020.d.ts
  Library referenced via 'es2020' from file 'node_modules/@types/node/index.d.ts'
node_modules/typescript/lib/lib.dom.d.ts

...
```

- 와 같은 내용이 나오는데, 잘보면 
- `ode_modules/typescript/lib/lib.es2020.d.ts Library referenced via 'es2020' from file 'node_modules/@types/node/index.d.ts'`
- `lib.es2020.d.ts` 라이브러리가 `node_modules/@types/node/index.d.ts`의 `es2020` 때문에 참조 되었다고 나온다!!!!!!
- `node_modules/@types/node/index.d.ts` 를 보면 아래와 같은데 `<reference lib="es2020" />`를 통해 `lib.es2020.d.ts`라이브러리를 참조 한것이다
  
```ts

// Reference required types from the default lib:
/// <reference lib="es2020" />
/// <reference lib="esnext.asynciterable" />
/// <reference lib="esnext.intl" />
/// <reference lib="esnext.bigint" />

// Base definitions for all NodeJS modules that are not specific to any version of TypeScript:
/// <reference path="assert.d.ts" />
/// <reference path="assert/strict.d.ts" />
/// <reference path="globals.d.ts" />
/// <reference path="async_hooks.d.ts" />
...
```

- 그럼 여기서부터는 완저 다른 이야기이다. 
- `node_modules/@types/node/index.d.ts` 는 왜 참조 되었는가?
  
# tsconfig.json 의 types 옵션을 보자
## TSC 설정 : types과 typeRoots
기본적으로 타입스크립트는 프로젝트 디렉터리 안의 `node_modeuls/@types`디렉터리와 그 상위 디렉터리들 `../node_modules/@type`등 에서 서드파티 타입 선언을 찾는다. 대부분은 이 동작을 바꿀 필요가 없다. 
이 기본 동작을 오버라이드하려면 tsconfig.json의 typeRoots에 타입 선언을 검색할 디렉터리들을 배열로 설정하면 된다. 예를 들어 다음은 `node_modules/@types` 뿜 아니라 typeings 디렉터리에서도 타입 선언을 찾도록 하는 설정이다. 
```json
{
    "compilerOptions": {
        "typeRoots": [
            "./typing",
            "./mode_modeules/@types" // 이거 안해주면 디폴트 값인 "./mode_modeules/@types"  폴더를 버린다
        ]
    }
}

```
tsconfig.json에서 types옵션을 사용하면 타입스크립트가 어떤 패키지에서 타입을 검색할지 더 세밀하게 설정할 수 있다. 예을ㄹ 들어 다음은 리액트를 제외한 모든 서드 파티 타입 선언을 무시하는 설정이다. 

```json
{
    "compilerOptions": {
        "types": [
            "react" // 그러니까 차라리 types 옵션을 안쓰면 typeRoots에 있는 type을 모두 참조 하는데, 이렇게 옵션을 키게되면, 내가 쓸 타입을 모두 명시해줘야 한다. 명시 안한건 무시한다는 이야기
        ]
    }
}

```

# 결론
- 그러니까 즉, lib 를 빈값으로 두면 애러가 나야 하는데, 
- `./mode_modeules/@types/node` 라는 폴더가 있으니, 이놈을 `types` 옵션(?)에서 참조 해버린것
- 그리고 그안에 Promise가 있었다는 이야기 이다. 
- 물론 아래의 세팅으로 해보니까 제대로 애러가 난다....
```json

// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",   
    "lib": [], // 참조하는 library없으니까 es6 문법인 Promise는 모를 것이고
    "types": [] // 참조하는 타입도 없으니까 `./mode_modeules/@types/node` 를 바라보지도 않는다. 
  }
}
```

- 물론 `./mode_modeules/@types/node` 을 지워도 애러가 나겠지... 
- 아 지워 봤는데 이건 뭐 최상위 까지 올라가서 타입을 찾으려고 하네... `'../../../../node_modules/@types/node/index.d.ts'`
- 암튼 이론적으로 참조할 서드파티 타입이 없으면 애러 나겠지

# 이걸 왜보고 있지