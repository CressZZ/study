# TypeScript-Babel-Starter
# 링크
https://github.com/Microsoft/TypeScript-Babel-Starter

# 왜 타입스크립트와 바벨인가?
- Babel 은 TypeScript를 Plain Javascript 로 변환하기 위해 사용하고, 
- TypeScript 는 타입체크를 위해 사용한다. 

# 기본 컨셉
- 타입체크는 바벨에서 해주지 않는다. (바벨은 typeScript 문법을 Plain Javascript 로 변환할 뿐이다. )
- 즉, 타입체크 부터 하고 그다음 바벨로 돌린다는 컨셉
- 타입체크 후 바벨 빌드를 한번 하는데, 이때 옵션에 따라 .d.ts files 이 생성 된다.
- 


# 순서
## tsconfig.json 생성
```sh
tsc --init --declatation --allowSyntheticDefaultImports --target esnext --outDir lib
```

## .babelrc 생성
```json
{
    "presets": [
      "@babel/preset-env",
      "@babel/preset-typescript"
    ]
}
```

## package.json 작성
```json
"scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch",
    "build": "npm run build:types && npm run build:js",
    "build:types": "tsc --emitDeclarationOnly",
    "build:js": "babel src --out-dir lib --extensions \".ts,.tsx\" --source-maps inline"
}
```

# webpack을 사용할경우
```js
var path = require('path');

module.exports = {
    // Change to your "entry-point".
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    }
};
```

```json
  "scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch",
    "build:types": "tsc --emitDeclarationOnly",
    "build:js": "webpack --mode=production",
    "build": "npm run build:types && npm run build:js"
  },
  ```


  # Using Babel with TypeScript
  https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html

  # s