# 타입스크립트를 바벨과 함께 사용할때 isolatedModules 를 true 로 해준다.
https://typescript-kr.github.io/pages/tutorials/babel-with-typescript.html

```json
// tsconfig.json

"compilerOptions": {
  // tsc를 사용해 .js 파일이 아닌 .d.ts 파일이 생성되었는지 확인합니다.
  "declaration": true,
  "emitDeclarationOnly": true,
  // Babel이 TypeScript 프로젝트의 파일을 안전하게 트랜스파일할 수 있는지 확인합니다.
  "isolatedModules": true
}

```

# isolateModule 이란
https://www.typescriptlang.org/tsconfig#isolatedModules
https://stackoverflow.com/questions/56577201/why-is-isolatedmodules-error-fixed-by-any-import/56577324

> While you can use TypeScript to produce JavaScript code from TypeScript code, it’s also common to use other transpilers such as Babel to do this. However, other transpilers only operate on a single file at a time, which means they can’t apply code transforms that depend on understanding the full type system. This restriction also applies to TypeScript’s ts.transpileModule API which is used by some build tools. These limitations can cause runtime problems with some TypeScript features like const enums and namespaces. Setting the isolatedModules flag tells TypeScript to warn you if you write certain code that can’t be correctly interpreted by a single-file transpilation process.


> TypeScript를 사용하여 TypeScript 코드에서 JavaScript 코드를 생성할 수 있지만 Babel과 같은 다른 변환기를 사용하여 이 작업을 수행하는 것도 일반적입니다. 그러나 다른 트랜스파일러는 한 번에 하나의 파일에서만 작동하므로 전체 유형 시스템을 이해하는 데 의존하는 코드 변환을 적용할 수 없습니다. 이 제한 사항은 일부 빌드 도구에서 사용되는 TypeScript의 ts.transpileModule API에도 적용됩니다. 이러한 제한으로 인해 const enum 및 네임스페이스와 같은 일부 TypeScript 기능에 런타임 문제가 발생할 수 있습니다. isolatedModules 플래그를 설정하면 단일 파일 변환 프로세스에서 올바르게 해석할 수 없는 특정 코드를 작성할 경우 TypeScript에서 경고합니다.

> **Typescript는 가져오기/내보내기가 없는 파일을 레거시 스크립트 파일로 취급합니다. 이러한 파일은 모듈이 아니며 모든 정의가 전역 네임스페이스에 병합됩니다.** isolatedModules는 이러한 파일을 금지합니다.
파일에 가져오기 또는 내보내기를 추가하면 모듈이 되고 오류가 사라집니다.
또한 내보내기 {}는 아무 것도 가져오지 않고 파일을 모듈로 만드는 편리한 방법입니다.

> 타입스크립트는 타입스크립트 파일을 모듈 모드 또는 스크립트 모드 중 하나로 파싱한다. 타입스크립트는 파일이 import 나 export 를 포함하느냐를 기준으로 모드를 결정하는데 import 나 export 를 포함하면 `모듈모드`로 그렇지 않으면 `스크립트 모드`로 동작한다. - 타입스크립트 프로그래밍 책
> 스크립트 모드에서는 최상위 수준으로 선언한 모든 변수는 명시적으로 임포트 하지 않아도 같은 프로젝트의 다른 파일들에서 사용할수 있다.
> 어떤 목적으로 사용하든 타입 선언은 스크립트 모드의 `.ts` 나 `.d.ts` 파일 안에 위치해야 한다. 관례상 대응하는 `.js` 파일이 있으면 `.d.ts` 확장자를 사용하고, 그러지 않으면 `.ts` 확장자(스크립트 모드)를 사용한다. 

즉, 타입스크립트는 일명 `스크립트 모드` 를 파싱할수 있다. (최상위 수준으로 선언한 모든 변수는 명시적으로 임포트 하지 않아도 같은 프로젝트의 다른 파일들에서 사용할수 있음).
그러나 바벨은 프로젝트 전체를 볼수 없다. (스크립트 모드를 이해하지 못한다.) 바벨은 각 파일을 하나씩 하나씩 파싱하기 때문에 import 없이 사용된 타입을 이해하지 못한다. (스크립트 모드를 사용한 타입 사용)

그래서 `isolateModule` 모듈을 켬으로서 이 프로젝트에 사용된 모든 ts 파일을 모듈로서 해석하게 하는 것이다.

이 모드를 켰을때 사용할수 없는 상황은 아래와 같다. 

#### 1) 값이 아닌 타입의 export - Exports of Non-Value Identifiers
#### 2) 모듈 모드가 아닌 스크립트 모듈의 파일 (.d.ts 파일 제외) - Non-Module Files
#### 3) const enum 사용 - References to const enum members

# babel-loader & @babel/preset-typescript & babel-plugin-transform-typescript
웹펙에서 바벨을 이용하여 타입스크립트 번들처리 할때, 바벨로더를 사용 하면 (ts-loader 말고... ts-loader는 ts를 사용한다)

바벨로더는 @babel/preset-typescript 가 있어야 하며

@babel/preset-typescript 는 [babel-plugin-transform-typescirpt](https://babeljs.io/docs/en/babel-plugin-transform-typescript) 가 있어야 한다.

이때, [babel-plugin-transform-typescirpt](https://babeljs.io/docs/en/babel-plugin-transform-typescript) 문서를 보면 이런 문구가 있는데, 

> Changes to your tsconfig.json are not reflected in babel. The build process will always behave as though isolatedModules is turned on, there are Babel-native alternative ways to set a lot of the tsconfig.json options however.

> tsconfig.json에 대한 변경 사항은 babel에 반영되지 않습니다. 빌드 프로세스는 항상 isolatedModules가 켜져 있는 것처럼 작동하지만 많은 tsconfig.json 옵션을 설정하는 Babel 네이티브 대체 방법이 있습니다.

즉, 바벨은 우리가 tsconfig 에 어떻게 입력을 하던 상관없이 자체적인 옵션에 따라 ts 파일을 처리한다는 것이다. 

처음에는 이해하기 어려웠는데 잘 생각해보면...

에디터에 표시되는 애러는 tsconfig를 사용하는게 맞다. 그런데 바벨로더에서 ts 파일을 처리하기 위해 자체적인 옵션을 쓴다는 이야기다. 만약 ts-loader 를 사용한다면 ts-loader 는 tsc 를 사용할것이고 , 이건 ts-config 를 사용하며, 스크립트모드도 이해할수 있을것이다. 
