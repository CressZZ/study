# sass-loader
- sass -> css
- 이것만 사용하면 애러남 : You may need an additional loader to handle the result of these loaders.
- 그도 그럴게 webpack은 sass 든 css 든 js로 변경해야지 말ㅇ아서 빌드를 할수 있는데, 이건 css로 떨구니까 애러가 나지!
# css-loader
- css -> js(?)
- sass의 문법? 인 @import 도 사용 가능함
- url('~~~') 식으로 이미지 경로등을 지정해주면, import 구문으로 처리해서 빌드처리 해줌. (아 물론 옵션으로 밸수도 있음)
```js
Type: Boolean|Function Default: true
Enables/Disables url/image-set functions handling. Control url() resolving. Absolute URLs are not resolving.
Examples resolutions:

url(image.png) => require('./image.png')
url('image.png') => require('./image.png')
url(./image.png) => require('./image.png')
url('./image.png') => require('./image.png')
url('http://dontwritehorriblecode.com/2112.png') => require('http://dontwritehorriblecode.com/2112.png')
image-set(url('image2x.png') 1x, url('image1x.png') 2x) => require('./image1x.png') and require('./image2x.png')

To import assets from a node_modules path (include resolve.modules) and for alias, prefix it with a ~:
url(~module/image.png) => require('module/image.png')
url('~module/image.png') => require('module/image.png')
url(~aliasDirectory/image.png) => require('otherDirectory/image.png')

```

- 물론 이미지 파일도 loader 처리 해야함 아니면 애러남 : You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
```js
mport React from 'react';
import styles from './App.css';

export default class App extends React.Component {
    componentWillMount() {
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.testing}>
                    hello
                </div>
            </div>
        );
    }
}

```

# file-loader
- url 등으로 파일 불러올때, 임의로 파일 위치를 지정해주고, 진짜 이미지 위치도 dist 안과 같이 옮기고 이름도 바꿔버린다. 
- 뭐 별다른 거 하는건 아닌가?
- url-loader 는 별다른걸 한다. 

# url-loader
- 모든 파일을 변환하는 것이 아니라 limit보다 작은 파일만을 변환하고 그 이상의 큰 파일은 file-loader를 통해서 처리해준다.
- url-loader 사용하려면 file-loader 도 있어야 한다.
  https://velog.io/@jeongnaehyeok/file-loader-vs-url-loader
  https://jeonghwan-kim.github.io/js/2017/05/22/webpack-file-loader.html

# 데헷 모두 디프리케이티드 되었다!
https://github.com/webpack-contrib/css-loader/releases/tag/v6.0.0

file-loader and url-loader are deprecated, please migrate on asset modules, since v6 css-loader is generating new URL(...) syntax, it enables by default built-in assets modules, i.e. type: 'asset' for all url()

https://webpack.js.org/guides/asset-modules/

Prior to webpack 5 it was common to use:

raw-loader to import a file as a string
url-loader to inline a file into the bundle as a data URI
file-loader to emit a file into the output directory
Asset Modules type replaces all of these loaders by adding 4 new module types:

asset/resource emits a separate file and exports the URL. Previously achievable by using file-loader.
asset/inline exports a data URI of the asset. Previously achievable by using url-loader.
asset/source exports the source code of the asset. Previously achievable by using raw-loader.
asset automatically chooses between exporting a data URI and emitting a separate file. Previously achievable by using url-loader with asset size limit.


변경 되었다!!?
