# !업데이트!!중요! terserWebpackPlugin을 v5 부터 sourceMap 옵셥이 사라졌다. 
https://github.com/webpack-contrib/terser-webpack-plugin/releases/tag/v5.0.0


# terser
terser : https://github.com/terser/terser
terserWebpackPlugin : https://webpack.js.org/plugins/terser-webpack-plugin/

# 개요 
자, 햇갈릴수 있다. 
`terserWebpackPlugin`은 웹펙 플러그인이고 플러그인 내에서 `terser`를 사용한다. 
두개가 같은게 아니므로, `terserWebpackPlugin`에서 제공하는 `terser` 옵션을 정의 하는 공간에서 반드시 `terser` 옵션전부를 지원하는 건 아니다. 
즉, `terser`의 sourceMap 옵션은 
`terserWebpackPlugin` 자체적인 옵션 `new TerserPlugin({sourceMap: true})` 으로 대치 되며(세부 옵션은 `SourceMapDevToolPlugin` 에서 정의해야 한다.)
`terserWebpackPlugin` 내에서 `terser` 옵션을 정의하는 위치에는 `new TerserPlugin({ terserOptions: {} })` sourceMap 옵션을 지원하지 않는 것이다.

추가로 `terserWebpackPlugin` 자체적인 옵션 `new TerserPlugin({sourceMap: true})` sourceMap은 
1. webpack설정인 `devtool` 옵션에 의존적이며, (내부에서 `SourceMapDevToolPlugin` 사용) 
2. 세부적인 옵션과 함께 사용하려면 `SourceMapDevToolPlugin` 을 직접 사용한다. 
**둘중 하나만 사용해야 한다.**

자, 생각해 보자. minimizer가 (terserWebpackPlugin)이 없어도 webpack은 여러개의 파일을 번들링 하기 때문에 sourceMap 이 필요하다. 
그렇기 때문에 webpack config에 `devtool` 로 sourceMap 유무를 결정해 준다. 
그리고 sourceMap에 대한 세부 옵션은 
### 1. `terser`만 사용할경우 sourceMap에 대한 옵션은 아래와 같이 정의 하나, 
```js
// terser.js
const { minify } = require("terser");

minify({"file1.js": "var a = function() {};"}, {
    sourceMap: {
        filename: "out.js", // 소스맵 (out.js.map)에 들어가야 하는 내용. (terser가 파일을 생성해 주지는 않는다.)
        url: "out.js.map" // 압충된 파일 (out.js)에 들어가야 하는 내용. (terser가 파일을 생성해 주지는 앖는다.) 
    }
});
```


### 2. webpack에서 terserWebpackPlugin을 사용할 경우에는, 아래와 같이 사용한다. 
```js
// terserWebpackPlugin
module.exports = {
  /* 플러그인을 직접 가져다 쓰지 않을거면 이 옵션이 필요함 (중복으로 들어감) */
  devtool: 'source-map', 

  /* devtool 옵션 쓸거면 플러그인은 빼야함 (중복으로 들어감) */
  // plugins: [
  //   new webpack.SourceMapDevToolPlugin({
  //     filename: '[name].js.map', // webpack은 파일을 생성해 준다.
  //     exclude: ['vendor.js'] // webapck은 파일을 생성해 준다.
  //   });
  // ]

  /* minimizer에서 쓸거면 해당 옵션 필요함 */
  // The plugin respect the devtool and using the SourceMapDevToolPlugin plugin. Using supported devtool values enable source map generation. Using SourceMapDevToolPlugin with enabled the columns option enables source map generation.
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap:  true
      })
    ],
  },
};
```

```js
// terserWebpackPlugin
module.exports = {
  /* 세부적인 sourceMap 설정을 하려면 이 옵션 빼야한다. */
  /* 더욱이 mode: development인 경우에는 devtool: source-map이 자동 설정이므로 */
  /* mode: development인 경우에는 devtool: false 를 반드시 설정해야 한다. */

  devtool: false, 

  /* 세부적인 설정을 하려면 SourceMapDevToolPlugin플러그인을 직접 사용  */
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map', // webpack은 파일을 생성해 준다.
      exclude: ['vendor.js'] // webapck은 파일을 생성해 준다.
    });
  ]

  /* minimizer에서 쓸거면 해당 옵션 필요함 */
  // The plugin respect the devtool and using the SourceMapDevToolPlugin plugin. Using supported devtool values enable source map generation. Using SourceMapDevToolPlugin with enabled the columns option enables source map generation.
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap:  true
      })
    ],
  },
};
```

# Terser - Minify options structure
```js
{
    parse: {
        // parse options
    },
    compress: {
        // compress options
    },
    mangle: {
        // mangle options

        properties: {
            // mangle property options
        }
    },
    format: {
        // format options (can also use `output` for backwards compatibility)
    },
    sourceMap: {
        // source map options => terserWebpackPlugin 에서 지원 않마
    },
    ecma: 5, // specify one of: 5, 2015, 2016, etc.
    keep_classnames: false,
    keep_fnames: false,
    ie8: false,
    module: false,
    nameCache: null, // or specify a name cache object
    safari10: false,
    toplevel: false,
}

```

