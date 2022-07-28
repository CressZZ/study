# 와 책이 좀 이상한가? 내가 이상한가?, 이해하기 좀 어려운데?

# 엠비언트란?
- Ambient simply means "without implementation".
- https://stackoverflow.com/questions/26946495/what-means-ambient-in-typescript
- https://github.com/Microsoft/TypeScript-Handbook/issues/180#issuecomment-195452691
- 즉 구현이 없는 모든것을 의미한다. 
- 엠비언트에는 `엠비언트 타입`, `엠비언트 변수`, `엠비언트 모듈` 이 있다고 볼수 있는데, 

## 엠비언트 타입
- 나의 프로젝트(타입스크립트) 에서 사용할수 있는 타입선언.
- import 해야 사용할수 있는 것과, import하지 않아도 언제든지 사용할수 있는것 둘로 나뉜다. (`스크립트` / `모듈` 모드)
### 스크립트 모드 + 엠비언트 타입 => `선언한 파일의 import 없이 어디서든 사용가능`
```ts
// types.ts, types.d.ts -> 파일명의 의미 없음
type MyType = string; // 구현 없음. 정의한 타입을 가져다가 쓸수는 있음 
declare type MyType = string; // declare 키워드 무시됨. 있어도 그만 없어도 그만. 아무튼 엠비언트변수/엠비언트모듈 처럼 declare 키워드가 있어도 됨
```
### 모듈 모드 + 엠비언트 타입 => `선언한 파일을 import 해야 사용가능 `
```ts
// types.ts, types.d.ts  -> 파일명의 의미 없음 (이 파일을 다른곳에서 import 해야 함)
export {}

export type MyType = string; // 구현 없음. 정의한 타입을 가져다가 쓸수는 있음 
export declare type MyType = string; // declare 키워드 무시됨. 있어도 그만 없어도 그만. 아무튼 엠비언트변수/엠비언트모듈 처럼 declare 키워드가 있어도 됨
```

## 엠비언트 변수
- 즉 전역변수로 `html의 바닦`이라던가, html에서 `별도로 로딩된 script 파일`에서 MyValiable 이란 `전역 변수를 설정했다고 가정하고`, 내 프로젝트(타입스크립트)에서 사용하기 위해 변수 구현 없이 변수 선언만 함. 
- import 해야 사용할수 있는 것과, import하지 않아도 언제든지 사용할수 있는것 둘로 나뉜다. (`스크립트` / `모듈` 모드)

### 스크립트 모드 + 엠비언트 변수 => `선언한 파일의 import 없이 어디서든 사용가능`
```ts
// types.ts, types.d.ts -> 파일명의 의미 없음
declare let MyValiable = string; // 구현 없음. 정의한 변수명을 정의한 타입으로 사용할수는 있음, 즉 전역변수로 html의 바닦이라던가, html에서 별도로 로딩된 script 파일에서 MyValiable 이란 전역 변수를 설정했다고 가정하고, 내 프로젝트(타입스크립트)에서 사용하기 위해 구현 없이 선언만 한거임
```

### 모듈 모드 + 엠비언트 변수 => `선언한 파일을 import 해야 사용가능` 
```ts
export {}

export declare let MyValiable = string;
```

## 엠비언트 모듈
- 내 프로젝트에서 모듈을 쓰고 싶은데, 그게 내 모듈은 아니고 남의것으로 `node_modules/` 에 있는 것일때, 
- 근데 그 모듈이 js 파일일때
- 근데 그 모듈에 대한 타입이 `node_modules/@types/some-module/index.d.ts` 에 없을때 
- 우리는 그 모듈이 존재 한다는 것을 임의로 만들어 줘야 한다. 
- 타입스크립트는 `node_modules/@types/some-module/index.d.ts` 만 바라 보다가 이게 없으면 모듈이 없다고(?) 정확히 말하면 모듈 타입이 없다고 생각할 것이기 때문이다. 
- 그냥 자바스크립트로 코드 짤때는 `import {someThing} from 'some-module` 이라고 나오면 웹펙이 `node_modules/some-module/index.js`를 보겠지만,
- 타입스크립트로 했으면 `tsc`가 진짜 코드 참조 하기 전에 타입검사하려고 `node_modules/@types/some-module/index.d.ts` 부터 찾아 보기때문이다.
- 이건 `모듈모드`로는 구현이 불가능 하다. 
### 스크립트 모드 + 엠비언트 모듈 => `선언한 파일의 import 없이 어디서든 사용가능`
```ts
// types.ts, types.d.ts -> 파일명의 의미 없음
declare module 'myModule' 
```

### 모듈 모드 + 엠비언트 모듈
- `구현 불가능`
```ts
// types.ts, types.d.ts -> 파일명의 의미 없음
export {}


// 애러!!
export declare module 'myModule' // 애러남. 앰비언트 모듈 및 모듈 확대는 항상 표시되므로 'export' 한정자를 적용할 수 없습니다.
```

## 엠비언트 + `d.ts` 파일
- d.ts 파일은 한마디로 선언파일 (엠비언트를 위한 파일 - 구현이 없는 내용을 위한 파일) 인데
- 제약이 있다. 
- `이 파일에서 구현 하면 애러남`
- 한마디로 구현만 해라 라는 의미
- `스크립트 모드` / `모듈 모드` 모두 가능하다
```ts
// types.d.ts
type Mytype = string;
declare let myVar: Mytype;

export declare let myVar_: string; // 당연히 이렇게 export 구문이 들어가면 위에 있는 두개는 사용불가. (쟤네도 export해주던가, export를 모두 지우고 스크립트 모드로 동작하게 해줘야 한다. )

// 애러
declare let myVar2: Mytype = 'string'; // 애러: 앰비언트 컨텍스트에서는 이니셜라이저가 허용되지 않습니다.
let myVar3: Mytype = 'string'; // 애러: .d.ts 파일의 최상위 수준 선언은 'declare' 또는 'export' 한정자로 시작해야 합니다.
```

# 엠비언트 + `.ts` 파일
- d.ts 와 달리 제약이 없다
- 선언만 하던, 구현도 하던 다 괜찮다
- 당연히 `스크립트 모드` / `모듈 모드` 모두 가능하다

# 중요한점중 하나가 `엠비언트 타입`과 `엠비언트 모듈`, `엠비언트 변수`가 모두 다른 상황에서 필요하다는 점이다.
## `엠비언트 변수`
- 앞에 말했듯이 다른 어디서 전역변수를 만들었다고 가정하고, 그 변수를 내 코드에서 지지고 볶으려고 선언 하는 것이고, 

## `엠비언트 타입`
- 내가 내 프로젝트에서 모든 ts파일에서 그냥 공용으로 쓰려고 `스크립트모드`를 통해 타입선언하고 마구 잡이로 사용하는 것과
- 혹은 명시적으로 `모듈모드`를 통해 선언한 타입을 `export` 하고 필요한 곳에서 `import` 하여 사용하는 것이고

## `엠비언트 모듈`
- 내가 내 프로젝트에서 남이 만든 모듈을 가져다 쓸껀데(혹은 내가 옛날에 만들었던 모듈)
- 그 모듈안에 있는 내용의 타입을 별도로 내가 만들때 사용하는 것이다. 

# `아무튼 엠비언트라는 것은 구현 없이 선언만 된것이라는 점이 중요`

# 진짜 햇갈리는 것중 하나가 `declare global {}` 인데
- https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation
- `declare global {}` 은 모듈모드에서 `엠비언트 변수`, `엠비언트 타입`, `엠비언트 모듈`을 마치 스크립트 모드에서 선언한것처럼 import 없이 프로젝트 어디에서든 불러올수 있게 해준다. 
- 내가 생각하기에, `import` 구문으로 어떤 3자가 만든 모듈을 가져오고, 그 모듈에서 정의한 타입을 전역에 선언함으로서
- 내 프로젝트의 다른 파일에서 `import` 없이 마음껏 사용하게 만들려는 의도의 문구가 아닌가 싶다. 
- 왜냐하면 일반적으로라면 `import`  를 통해 3자가 만든 모듈을 가져오는 순간 이 파일은 `스크립트 모드`가 아닌 `모듈모드` 가 되어 버리기 때문에 
- 다른 나의 파일에서는 `import` 없이 이것 사용할수 없기 때문이다.

# declare global 정리 해준다.(220728)
- import, export 가 있으면 모듈 모드가 된다. 
- 이때 스크립트 모드처럼 전역에서 사용하려면 dclare global이 필요하다. 
- 엥... 위에 다 써놨네...
- 스크립트 모드에서는 declare global 쓰면 애러 난다. 
## interface Window{}
- window 객체 확장이다. 
- 스크립트 모드에서 interface Window{}를 사용하면 전역에서 확장된 window 객체를 사용할수 있고, 
- 모듈 모드에서는 declare global {interface Winodw{} } 를 써줘야 한다. ㅋㅋㅋㅋㅋㅋㅋ




---
----------------------[추가]--------------------
# 으으으음...... typeRoots 와 types 옵션에 대해
- 공식문서 : https://www.typescriptlang.org/tsconfig#typeRoots
- 한글 문서 : https://typescript-kr.github.io/pages/tsconfig.json.html
- 관련해서 혼라스러운 세계인들 : https://github.com/microsoft/TypeScript/issues/22217

# 확실치 않은 이해로 정리를 하자면, 이건 공식문서 + 각종 교육자료 + 블로그등이 명확히 이게 뭔지 설명을 안해서 발생하나 문제로 보인다. 
- typeRoots 에 대해 이렇게 설명한다. 
- 기본적으로 `node_modules/@types` 에 있는 package 가 포함될거다. (어디에? 뭐가?)
- 중요한건 typeRoots 를 정의 해버리면 디폴트 값인 `node_modules/@types` 가 빠져 버리기 때문에 수동으로 정의 해줘야 한다는것과, 
- types를 정의해버리면 types에 정의 된 모듈만 tsc 가 인식 가능하다는 식으로

# 글쎄 지금 나의 이해 수준으로는 말도 안되는 소리들 (나중에 더 깊이 이해하면 저말이 맞겠지라고 생각하겠지 - 공식문서니까)
- 타입스크립트에서 `import name from 'name'` 처럼 상대경로 없이 불러오는건 기본 module resolution을 따른다. 
- 그러니까 tsc 가 `node_modules`도 찾아보고, tsconfig 의 `path` 옵션도 보고 
- 기본적으로 tsconfig 의 `include`, `exclude` 도 본다는 이야기 
- 하나 중요한건 `declare module 'name'` 과 같은 모듈 타입 선언은 `export declare module 'name'` 으로 사용할수 없다는 점이다. (무조건 스크립트 모드로 동작)
- 아무튼 각종 교육 자료 보면 커스텀 모듈을 정의하고 싶을때 (타입 선언이 없는 npm package) `src/types/name/index.d.ts` 를 만들어서 
- `module 'name'` 을 `index.d.ts` 파일에 써주고, tsconfig 에 `typeRoots:['./src/types/', 'node_modules/@types']`  를 정의 하라고 나오는데
- 완전 헛소리인게 (지금 나의 이해도로는 헛소리임)
- `declare module 'name'` 과 같이 스크립트 모드 + 타입선언을 해버리면 사실 아무대서나 가져다 쓸수 있다는 말이다. 
- 이게 `typeRoots:['./src/types/', 'node_modules/@types']`  에 정의 되어 있지 않아도 사용 할수 있다. 
- 왜냐하면 `include` 옵션에 자동으로 모든 파일이 들어가므로 typescript 는 모든 파일을 감시하고 있을것이고 
- `src/types/name/index.d.ts` 안에 글로벌 하게 선언된(스크립트 모드) `declare module 'name'` 도 가져 올것이라는 이야기

# 그럼 typeRoots는 언제 쓰는가?
- 첫번째로 `include`를 `./src/**/*` 로 정의하고
- `src/types/name/index.d.ts`  을 `/types/name/index.d.ts` 옮기면 
- 타입 선언 파일이 짠 include 에서 빠지게 된다. 
- 이렇게 되면 `/types/name/index.d.ts` 에 스크립트 모드로 선언된 얘들을 tsc 가 인식을 못한다. 
- 이때 사용하는게 `typeRoots`
-  `typeRoots:['./types/']` 로 정의하면 `declare module 'name'` 뿐 아니라 `type A = string` 과 같이 스크립트 모드로 전역 선언한 얘들이 모두 인식된다. 
-  중요한건 `types/name/index.d.ts` 처럼 `types/` 밑에 1depth 폴더가 있고 그안에 파일이 있어야 한다는것. 
-  암튼 그럼 자 봐보자 `typeRoots`에 `'./types/` 만 넣었으니 그럼 `node_modules/@types/name2/index.d.ts` 의 모둘을 `import name from 'name2'`로 불러오면 인식을 못할까?
-  아니다.! 인식한다. 

# 왜죠?
- typeRoots 는 스크립트 모드 글로벌 선언만 관련이 있다. 
- `import name from 'name2'` 는 순전히 moduleResoution 절차만 따르고 있으며 당연히 `node_modules` 를 탐색한다. 
- moduleResoution 은 `import` 옵션과 `export` 옵션과도 무관하다. 
- `import name from 'name2'`와 같이 명시적으로 모듈을 `import` 하면 그냥 `node_modules/` 찾다가 없은면 `node_modules/@types` 도 찾고 위로 쭉쭉 올라간다.
- 만약 `node_modlules/@types/foo/index.d.ts` 에 스크립트 모드로 전역 `type Foo = string` 이 있다고 하자 
- 그럼 `src/index.ts` 에서 `Foo` 타입을 쓸수 있을까?
- 쓸수 없다. 왜냐 하면   `typeRoots:['./types/']` 는 `node_modules/@types`를 포함하고 있지 않기 때문이다. 
- 그럼 tsconfig 는 그대로 놔두고 `node_modlules/@types/foo/index.d.ts` 파일이 스크립트 모드가 아니라 모듈 모드로서  `type Foo = string` 는 고대로 놔두고 `export default Foo;` 를 추가 해보자 
- 그리고  `src/index.ts` 에서 `import Foo from 'foo'` 는 문제가 없을까?
- 문제가 없다!

# 왜죠? 왜 모듈을 가져오죠?
- 말했다 시피 `typeRoots` 는 스크립트 모드에만 적용되는 옵션이고, 
- `foo/index.d.ts`를 모듈모드로 바꾸고 (export 추가) 명시적으로 다른곳에서 `import` 를 할때에는 `moduleResolution`을 따르기 때문이다. 

# 그럼 types 옵션은 뭐냐?
- 진짜 햇갈리는데 간단히 말하면 `typeRoots`에 정의된 폴더의 `하위 폴더명` 이라고 생각하자
- 공식문서나 각종 교육자료만 보면 마치 모듈 그자체를 의미 하는 듯 한데 (`declare modue name`) 처럼
- 그게 아니라, 스크립트 모드 동작할 파일명을 어떤거 사용할지 골라내는거다. 
- 예를 들면 `node_modlules/@types/foo/index.d.ts`, `node_modlules/@types/bar/index.d.ts` 이라는 두파일과 옵션으로  `types:['foo']` 가 있다고 생각해보자  (`typeRoots` 는 기본값 (`node_modules/@types` 포함이다.))
- `types` 옵션에 `bar` 가 없다. 
- 마치 `import bar from 'bar'` 가 동작 하지 않을것 같다. 
- 노노노 동작한다. 이건 명시적으로 불러온거니까 `typeRoots`나 `types` 옵션따위에 구애받지 않는다. 
- 물론 중요한건  `node_modlules/@types/bar/index.d.ts` 에 명시적으로 `export {}` 처럼  `export` 가 존재하는 모듈 모드여야 한다. (없으면 모듈을 못찾겠다고 애러난다.)
- 자자자자 그럼 `node_modlules/@types/bar/index.d.ts`  이 스크립트 모드라고 생각해 보자. `type Bar = string` 같은 문구만 있을뿐 `export` 가 없다고 해보자 

# 그럼 어떻게 되죠?
-  `src/index.ts` 에서 `let a : Bar = 'bar'` 라는 문장이 애러가 난다. 
-  왜냐하면  `types:['foo']` 만 있을뿐 `Bar` 가 없기때문이다. 
-  스크립트 모드의 전역 선언을 인식 할수 없다. 
-  그럼  `types:['foo', 'bar']` 로 바꿔보자 
-  짠! 인식한다. 
-  우리의 스크립트 모드 파일은 `node_modlules/@types/bar/index.d.ts` 에 존재 하기 때문이다. 

# 결론은
- 커스텀 모듈 사용하고 싶으면 그냥 아무대나 `declare modeul 'name';` 선언하면 잘가져 온다. (`스크립트 모드` 이며 `include`에 포함되기 때문이다 (`include` 중요!)
- 스크립트 모드를 이해할수 없는 애들은 `exclude`로 빠진 애들이거나, `include` 에 속해 있지 않은 애들이며
- 그런 애들은 인식하기 위해 `typeRoots`와 `types` 옵션이 필요하고, 
- 명식적 모듈 import는 `moduleResolution` 을 따른다. 

# 번외 - ./types/Foo/index.d.ts 에서 명시적으로 export 하고 명시적으로 import 하고 싶습니다.!
- `import Foo from 'Foo'` 를 사용하고 싶을때
- path 옵션을 사용합시다. 
- 마치 `./types/Foo/index.d.ts` 에 `declare const a: string; export default a;` 가 있으면 import 가 될것 같이 보이지만, 
- `typesRoots`도 세팅해줬고, `types` 세팅 해줘도 안된다. 
- 이건 `모듈` 이기 때문이다. 아래와 같이 써주자.
```json
   "paths": {
      "bar": ["./types/bar"]
    },  
```
