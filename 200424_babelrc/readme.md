# Configure Babel https://babeljs.io/docs/en/configuration
바벨은 ESLint(.eslintrc)나 Prettier(.prettierrc)도 세부 설정이 가능한것처럼 옵션을 파일로 뺄수 있습니다. 
모든 바벨 API옵션이 허용됩니다. 그러나 옵션중에 자바스크립트 언어가 필요한 경우(함수 같은거) configuration file을 .js 파일로 만들어야 합니다. 

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

# Config Files 좀더 깊이



