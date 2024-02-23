# css-minimizer-webpack-plugin

```js
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin({
          minify: CssMinimizerPlugin.cssnanoMinify, // Default 옵션임
          minimizerOptions: {
            preset: [
              'default',
            ],
          },
        }),
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: !isDevelopment,
            },
          },
        }),
      ].filter(Boolean),
    },
```

- webpack config 에 위와 같이 있다고 보자. 
- minimize 는 말그대로 minimize 할거냐는 옵션인거고, 
- minimize 뭐 쓸거냐? 해서 CssMinimizerPlugin 과 TerserPlugin 을 쓴다고 한거다. 
- TerserPlugin 은 다 아니까 넘어가고, 
- CssMinimizerPlugin 을 볼건데, 이건 딱봐도 CSS 를 미니마이징 할거 라는 거다. 

# CssMinimizerPlugin minify 옵션 
- https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
- css-minimizer-webpack-plugin 은 기본적으로 minify할때 cssnanoMinify 를 사용하는데, 
- minify: 옵션을 변경함으로서, csso, clean-css, esbuild 등을 사용할수 있다. 

# cssnanoMinify
- https://github.com/cssnano/cssnano
- cssnanoMinify 옵션을 사용하면 (Default) cssnano 를 쓰는데, 
- 이거의 공식 문서를 들어가면 아래와 같이 설명이 되어 있다. 
- cssnano is a modern, modular compression tool written on top of the PostCSS ecosystem, which allows us to use a lot of powerful features in order to compact CSS appropriately.
- 즉, 이건 postcss 플러그인 인데, PostCSS 없으면 사용이 안된다. 
- 근데, CssMinimizerPlugin 안에서 minify 옵션을 cssnano 로주면, 알아서 postcss 환경에서 cssnano 를 실행한다는 이야기 이다. 

# csso
- minify: 옵션을 csso 로 주면 csso 로 미니파이를 하는데, 애는 그냥 공백만 배꿔 준다. 
- cssnano 는 뭐 여러가지 일을 통해서 중복코드 없애주고 뭐 이런 식으로 코드를 압축시키다. 

# postCss

- 아래와 같이 CssMinimizerPlugin 안쓰고, 직접 postcss-loader를 적용하면 
- 마찬가지로 postcss.config 에 설정된것 처럼 cssnano 가 동작한다.
```js
// webpackConfig.js
{
    test: /\.s?css$/,
    exclude: ['/node_modules'],
    use: 
      [MiniCssExtractPlugin.loader, 
      { loader: "css-loader", options: { sourceMap: true } },
      { loader: "postcss-loader", options: { sourceMap: true } },
      { loader: "sass-loader", options: { sourceMap: true } },
  ],
},


// postcss.config
module.exports = {
  plugins: [
      require('cssnano')({
          preset: 'default',
      }),
  ],
};

```


# 자, 여기서 CssMinimizerPlugin 와 cssnanoMinify 를 사용했을때, 소스맵 관련 이슈가 터진다. 
- https://github.com/webpack-contrib/css-minimizer-webpack-plugin/issues/134
- CssMinimizerPlugin 을 사용하고, minify로 cssnanoMinify 을 사용하면 제기랄, css.map 파일이 동작을 안한다. 
- 정확히 말하면, 맵파일이 생성되는데, 최종 생성된 맵파일 안에는, 기초 코드가 되는 scss 파일에 대한 정보가 없고, 
- MiniCssExtractPlugin.loader 가뽑아낸 최종 css 파일에 대한 정보만 있다. 
- 그러니까. 
- scss-loader -> css-loader -> MiniCssExtractPlugin.loader 를 통해서 뽑힌 css 파일을 
- CssMinimizerPlugin 이 잡아서 다시 압축을 하고, 그과정에서 맵파일이 만들어지는데, 
- CssMinimizerPlugin 이 압축한 css에 대한 맵파일은, 압축전의 css 파일을 바라보고 있는것이다. 

# 그럼 CssMinimizerPlugin 말고 postcss-loader를 사용하면 어떻게 될까?
- 맵파일이 잘나온다.
- scss-loader -> css-loader -> postcss-loader(압축) -> MiniCssExtractPlugin.loader 를 통해서 뽑히는데,
- MiniCssExtractPlugin 이 뽑아낸 css와 맵파일은 기초 코드인 scss 파일에 대한 내용도 같이 가지고 있다. 

# 그럼 CssMinimizerPlugin 와 cssnanoMinify 를 사용하면 왜 이슈가 되는가?
- https://github.com/webpack-contrib/css-minimizer-webpack-plugin/issues/134
- 일단  MiniCssExtractPlugin 에  filename: `[name].css` 혹은 filename 옵션을 안넣으면 이슈가 없다. 
- 왜 그럴까?
- 모르겠다. css-minimizer-webpack-plugin 은 해당 이슈를 2021/11/10에 수정했다고 나오는데, 2024.02/23 현재 동일한 이슈가 발생한다. 
- csso 를 사용하면 이슈가 없다. 
- 이건 파일의 공백만 지워 주는 형식이기때문에, CssMinimizerPlugin 이 별다른 맵파일을 안만들어도 되기 때문이다 

# 결론, 
- MiniCssExtractPlugin 의 filename을 수정 하던지 해야 하는데, 이건 너무 제약이 심하므로, 
- postCss 를 쓰던가 하자. 

# 여담 
- 위 이슈 코멘트를 보면 CssMinimizerPlugin 개발자가, postcss는 input 파일 이름을 신경쓰지 않는다고 나온느데, 
- 뭔소린지 모르겠다
- hm, yes, postcss not respect input filename, no problems with esbuild/clean-css/ccso