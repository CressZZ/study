# https://webpack.js.org/loaders/css-loader/#importloaders

```js

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
```


- 만약 scss 에 @import 구문이 있다고 하자, 
- css-loader 의 옵션중 importLoaders 의 default 값이 0 인데, 
- 이때, css-loader 보다 앞에 있는 로더는 @import 구문을 처리하지 않고 있다. 즉, 파일을 불러온 상태가 아니다, 
- 다시 말하면 0 상태에서는 scss 파일에 import 구문이 있다고 하더라도, import 대상의 파일은 postcss-loader 의 영향을 받지 않는다는 것이다. 
- 왜냐하면 아직 파일에 안들어왔으니까!
- 즉, postcss-loader 에 import 대상의 파일을 적용하려면 
- importLoaders 를 바꿔야 한다. 
- 이게 왜 나온 이슈냐면, 
- scss 파일에 css 파일을 import 한상태에서 
- js 파일에 scss 파일을 import 하면 postcss 에서 발생한 warning 문구가 (css 파일에서 찾아낸 warning) 발생하는데, 
- `css 파일을` ( scss 말고 문제있는 css 파일) 그대로 entry 로 넣어서 빌드 돌리면, warning 문구가 안나왔기 때문이다. 
- 왜냐 하면 scss 파일을 그대로 entry 로 넣어서 빌드 돌리면, postcss-loader 시점에서는 css 파일이 import 되기 이전 상태이기 때문이다.
- `scss` 파일을 js 에 넣으면 warning 안나옴
- 뭔소린지 모르겠지? ㅠㅠㅠㅠㅠ