# Configure Babel https://babeljs.io/docs/en/configuration
바벨은 ESLint(.eslintrc)나 Prettier(.prettierrc)도 세부 설정이 가능한것처럼 옵션을 파일로 뺄수 있습니다. 
모든 바벨 API옵션이 허용됩니다. 그러나 옵션중에 자바스크립트 언어가 필요한 경우(함수 같은거) configuration file을 .js 파일로 만들어야 합니다. 

참고: https://eslint.org/blog/2022/08/new-config-system-part-2/#main

## 사용방법
- monorepo를 사용하고 있습니까?
- `node_module`을 컴파일 하고 싶습니까?
이러한 경우 `babel.config.json`을 사용하십시요. (`Project-wide Configuration`)

- 프로젝트에서 일부분에만 cinfiguration을 적용하고 싶습니까?
이러한 경우 `.babelrc.json`을 사용하십시요. (`File-relative Configuration`)

## babel.config.json
아래와 같은 파일을 프로젝트 `root폴더`에 `babel.config.json`이름으로 만드세요. (`package.json`이 있는 위치).

```JSON
// babel.config.json
{
    "presets":["..."],
    "plugins":["..."]
}
```

## .babelrc.json
프로젝트안에 아래와 같은 파일을 `.babelrc.json` 파일로 만드십시요
```json
// .babelrc.json
{
    "presets":[],
    "plugins":[]
}
```

## package.json
`.babelrc.json`에 대한 또다른 방법으로 `package.json`을 이용할수 있습니다. 
```json
// pacakage.json
{
    "name": "my-package",
    "version": "1.0.0",
    "babel":{
        "presets":[],
        "plugins":[]
    }
}
```

## Javascript configuration files
`babel.config.json`과 `.babelrc.json`은 javascript 파일로 만들수도 있습니다. 
```js
// babel.config.js, .babelrc.js
const presets = [];
const plugins = [];

// Node.js API를 이용하여 동적으로 플러그인을 집어 넣을수도 있습니다.
if(process.ent["ENV"] === "prod"){
    pliugins.push(...);
}

module.exports = { presets, plugins };
```

## CLI 사용하기 
```shell
babel --plugins @babel/plugin-transform-arrow-functions script.js
```

## @babel/core API사용하기 
```js
require("@babel/core").treansform("code",{
    plugins: ["@babel/plugin-transform-arrow-function"]
})
```

# Config Files 좀더 깊이 https://babeljs.io/docs/en/config-files

## Configuration File Type
바벨 컨피그는 두가지 타입으로 나눌수 있습니다. 두개는 함께 사용할수 있고 별도로 사용할수 있습니다. 
### 프로젝트 전반적으로 적용될 컨피그 타입 (Project-wide configuration)
`babel.config.json` 형식 (확장자 변경가능)
### 파일별로 적용될 컨피그 타입 (File-relative configuration)
`.babelrc.json` 형식 (확장자 변경가능)
`package.json`에서 설정 (`babel` 이라는 키값을 통해 설정)


## 프로젝트 전반적으로 저용될 컨피그 타입 (Project-wide configuration)
바벨 7.x 버전은 `root directory`라는 새로운 개념을 가지고 있습니다. 이건은 기본적으로 현재의 워킹 디렉토리(이게 뭘까. 워킹 디렉토리의 최상위 폴더?)를 가르킵니다. Project-wide configuration을 위하여 바벨은 자동적으로 `babel.config.json`파일을 찾거나 `babel.config.json` 와 동일한 파일명이지만 다른 확장자를 가진 파일을 `root directory`에서 찾습니다. 혹은 대안적으로 유저가 직접 `configFile`이라는 값을 통하여 기본적으로 찾아 다니는 컨피그 파일을 덮어 쓸수도 있습니다. 

`projeect-wide config files`은 파일이 존재하는 경로와 문관하기 때문에 광범위하게 바벨 설정이 적용되어야 하는경우 매우 유용하며 심지어 플러그인이나 프리셋등을 `node_modules` 나 `symlinked package`에 적용하는거이 매우 간편해졌습니다. 이러한 것들은 바벨 6.x에서는 고통스러운 작업이었습니다.

`projeect-wide config files`의 주요 단점은 이 파일은 `working directory`에 의존하고 있기 때문에 `monorepos`을 사용할경우 `monorepo root` 가 `working directory`가 아닌경우 `project-wide`를 적용하는 것이 어렵다는 것입니다. `monorepo`에 관한 문서를 참조 하십시요

`Project-wide configs`는 또한 `configFile`옵션에서 `false`를 적용하여 비활성화 할수 있습니다. 


## 파일별로 적용될 컨피그 타입 (File-relative configuration)

## 6.x VS 7.x `.babelrc` 로딩


## 지원하는 컨피그 파일 확장자

## Monorepos (개인적으로 관심 x)

### Root `babel.config.json` file

### Subpackge `.babelrc.json` file

## Config Function API





