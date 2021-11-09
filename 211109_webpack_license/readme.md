# 플러그인

## 여러가지가 있는데 이게 제일 좋아 보인다. 
https://github.com/microsoft/license-checker-webpack-plugin

```js

const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');

module.exports = {
    plugins: [
        new LicenseCheckerWebpackPlugin({
            outputFilename:'js/LICENSE.txt',
            override: {
                // "assignment@2.0.0": { licenseName: "MIT" },
                // "intersection-observer@0.5.0": { licenseName: "MIT" },
                'querystring-es3@0.2.1': { licenseName: 'Apache-2.0' }
            },
        })
    ]
}

```

## 이건 뭔가 처리를 안해준다
https://github.com/codepunkt/webpack-license-plugin

- https://github.com/xz64/license-webpack-plugin/blob/master/DOCUMENTATION.md
- webpack-license-plugin가 아래 내용을 처리 안해주는데, license-checker-webpack-plugin는 처리를 해준다. 
- css 빌드에 필요한 내용을 무시하는듯 하다
- 그런데, babel-loader 등은 둘다 안들어간다. 
- 생각해 보면, loader 는 번들링된 파일에 들어가는게 아니라, 번들링 하기 위해 사용하는거니까 넣을 필요가 없는게 아닐까?
- 만약 번들링을 혹은 코드 작성을 위한 모든것에 대한 라이센스를 추가 하려면 vscode 라이센스도 들어가야 하겠다.;
- 그냥 둘다 써도 될거 같은데?
- 그냥 밑에꺼 써도 될거 같은데?
- 밑에 있는게 인지도가 훨씨 좋다 https://www.npmtrends.com/license-checker-webpack-plugin-vs-license-info-webpack-plugin-vs-license-webpack-plugin-vs-license-check
- **그냥 런타임에 필요한 라이브러리만 라이센스 정보가 있으면 되는거 같은데!? 빌드할때 필요한거(loader), 개발할때 필요한거 (lint) 는 필요 없는게 맞는듯.. 근데 라이센스 정보에 webpack 은 들어 가 있는데.. 음..**
```txt

--------------------------------------------------------------------------------
css-loader v2.1.1 - Tobias Koppers @sokra
git+https://github.com/webpack-contrib/css-loader.git
--------------------------------------------------------------------------------

Copyright JS Foundation and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



--------------------------------------------------------------------------------
normalize-scss v7.0.1 - John Albin Wilkins
git://github.com/JohnAlbin/normalize-scss.git
--------------------------------------------------------------------------------

Copyright © Nicolas Gallagher and Jonathan Neal and John Albin Wilkins

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


--------------------------------------------------------------------------------
process v0.11.10 - Roman Shtylman
git://github.com/shtylman/node-process.git
--------------------------------------------------------------------------------


```



#  MIT
## 즉 아래의 내용만 들어가면 아무렇게나 사용해도 된다는 이야기?

MIT 허가서는 다음과 같은 형식을 갖는다:

Copyright (c) <연도> <저작권 소유자>
Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
요약하면 MIT 허가서는 다음과 같은 라이선스이다.

이 소프트웨어를 누구라도 무상으로 제한없이 취급해도 좋다. 단, 저작권 표시 및 이 허가 표시를 소프트웨어의 모든 복제물 또는 중요한 부분에 기재해야 한다.
저자 또는 저작권자는 소프트웨어에 관해서 아무런 책임을 지지 않는다.