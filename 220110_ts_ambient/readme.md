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

