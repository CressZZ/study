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
- 왜냐 하면 css 파일을 그대로 entry 로 넣어서 빌드 돌리면, postcss-loader 가 개입할 타이밍이 없다.
- postcss-loader 는 sass-loader 다음에 나와야하는데, 이건 바로 css-loader 부터 동작 했기 때문이다.
- `scss` 파일을 js 에 넣으면 warning  (추가: 엥? 나온는거 아닌가?)
- 뭔소린지 모르겠지? ㅠㅠㅠㅠㅠ


# 부연설명
- 일반적으로 entry 에 sass 파일이 들어간다.
- 그럼 sass-loader -> postcss-loader -> css-loader 순으로 다 적용 된다
- 그럼 css-loader 의  importLoaders 옵션은 css 파일을 직접 entry에 포함시켰을때와 관련이 있는 옵션인거다.
- 왜냐하면  sass 파일에  import 가 있고 정삭적으로 sass-loader가 동작했다면, sass-loader 가 컨버트한 css 파일에 import 구문이 살아 있지 않기 때문이다.

# 즉,
- Sass 파일을 엔트리로 사용하는 경우: sass-loader -> postcss-loader -> css-loader 순서로 로더가 적용돼. 여기서 sass-loader는 Sass의 @import를 처리하고, 결과적으로 생성된 CSS 파일은 @import 구문을 포함하지 않는다.
- CSS 파일을 엔트리로 사용하거나 CSS 내부에서 @import를 사용하는 경우: css-loader의 importLoaders 설정이 중요하다. 이 설정은 @import된 CSS 파일들에 적용될 추가 로더의 수를 정의한다.. 예를 들어, importLoaders=1이면 css-loader 앞에 있는 한 개의 로더가 @import된 CSS 파일에 적용되는 거야.

# importLoaders 는 css-loader 까지 왔는데, 아직 처리 되지 않은 @import 구문이 있을때 영향을 미친다.
https://stackoverflow.com/questions/52544620/what-is-exactly-the-importloaders-option-of-css-loader-in-webpack-4
importLoaders only has effect on unresolved @imports. So when using postCSS with nextCSS (no @import resolver) you'll want to set importLoaders. This way nextCSS will also be applied to imported .css files. But when using sass, it already handles the @import statements, so no importLoaders is required.
So, this only happens when css-loader finds an unresolved @import. When using sass-loader for example; All imports are resolved (and concatenated) before css-loader even gets the chance to look for an @import.

importLoaders는 해결되지 않은 @imports에만 영향을 미칩니다. 따라서 nextCSS(@import 해석기 없음)와 함께 postCSS를 사용할 때 importLoaders를 설정하는 것이 좋습니다. 이렇게 하면 가져온 .css 파일에도 nextCSS가 적용됩니다. 그러나 sass를 사용하면 이미 @import 문을 처리하므로 importLoaders가 필요하지 않습니다.
따라서 이는 CSS-loader가 해결되지 않은 @import를 발견한 경우에만 발생합니다. 예를 들어 sass-loader를 사용할 때; CSS-loader가 @import를 찾을 기회를 얻기 전에 모든 가져오기가 해결(및 연결)됩니다.