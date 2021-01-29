# sass-loader
- sass -> css
- 이것만 사용하면 애러남 : You may need an additional loader to handle the result of these loaders.

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