# 참고
https://stackoverflow.com/questions/56238356/understanding-esmoduleinterop-in-tsconfig-file
https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports
https://pcconsoleoraksil.tistory.com/323
https://toss.tech/article/commonjs-esm-exports-field
https://ui.toast.com/weekly-pick/ko_20190418/
https://it-eldorado.tistory.com/128
https://pencilflip.medium.com/using-es-modules-with-commonjs-modules-in-node-js-1015786dab03

# 타입스크립트에서 ESM 이랑 commonjs 를 함께 쓸대 발생하는 문제?
- 일단 `esModuleInterop 꺼져` 있고, `allowSyntheticDefaultImports 도 꺼져` 있을때!


```js
// node_modules/moment/index.js
exports = moment
```

```js
// index.ts file in our app
import * as moment from 'moment'
moment(); // not compliant with es6 module spec

// transpiled js (simplified):
const moment = require("moment");
moment();
```

이렇게 * 를 쓰면 commonJs를 써서 export 한 모듈을 타입스크립트에서 마치 ESM의 default export로 export 한 모듈을 ESM의 import 형식으로 가져다 쓸수 있게 해준다. 

## 이때의 문제점
근데 이때 문제점은 import * as name 의 문법이 ESM 과 다르다는 거다 (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import)

원래의 ESM 문법에서 import * as name 은 default 형태를 import 하는게 아니라, name 에 있는 모든 아이들을 하나의 객체 안에 넣고 사용하기 때문에 `name()` 과 같이 바로 실행 할수 없고, `name.utilA()`, `name.utilB()` 처럼 사용해야 한다는 것이다. 기본 문법과 충돌 난다는 이야기 

# esModuleInterop 켬
- tsconfig 에서 esModuleInterop을 켰을때.
```js
// index.ts file in our app
import moment from 'moment'
moment(); // compliant with es6 module spec

// transpiled js with esModuleInterop (simplified):
const moment = __importDefault(require('moment'));
moment.default();
```
```js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
```

import  * 없이도 마치 ESM을 그냥 불러오는것처럼 사용할수 있다. 타입스크립트가 `__importDefault` 라는 함수를 사용해서 변환시켜 주기 때문이다. 이건 바벨이 기본적으로 해주는 것과 동일한 형식이다. 

그럼 이렇게 esMolduleInterop 을 키고 `* import as name`을 하면 어찌 될끼?

```js
dex.ts file in our app
import * as moment from 'moment'

// transpiled js with esModuleInterop (simplified):
const moment = __importStar(require("moment"));
// note that "moment" is now uncallable - ts will report error!

```

```js

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};

```

마치 원래의 ESM 문법의 `* import as name` 처럼 모든 내용을 객체에 때려 넣고, `result['defualt'] = mod` 를 이용해서 default 라는 요소만 하나 추가 해준다. 즉 `name()` 은 실행이 안되고 (객체를 반환해 주니까) `name.default()`는 실행을 해준다. 

햇갈릴수 있는데, `esModuleInterop` 를 껏을때는, `* import as name` 문법을 썼을때 그냥 commonsjs 형태로 완전 변환 했기 때문에 `const moment = require("moment");` 에 의해서 `moment();` 을 사용할수 있었던 것이다. 

`esModuleInterop` 를 껏을때 타입스크립트가 변환해줬기 때문이다. 

# 그럼 allowSyntheticDefaultImports 이건 뭔지?
- 일단 esModuleInterop 을 키면 allowSyntheticDefaultImports 은 자동으로 켜진다. (https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports)
- 그냥 default export 가 없어도, import 할때 default exxport 를 import 하는 것처럼 불러와도 애러를 안보여 주겠다 는건데,
- 타입체크 할때만 애러가 안나는 거고, 실제로 런타임 오류가 있으면 런타임시 오류가 날것이다. (아니면 웹펙에서 애러가 나겠지)
- 아니 그럼 이런경우가 언제있는가? )
- json파일을 임포트 할때 이런경우가 있다고 한다. (https://pcconsoleoraksil.tistory.com/323)
- 당연히 json 파일에는 export 문구가 없을거고, 나는 ts 파일에서 json파일을 불어와야 하니까...
- 이런경우에는 allowSyntheticDefaultImports 만 켜주면 되는데 (resolveJsonModule 옵션 켜주는건 당연)
- 그냥 esModuleInterop 을 키고 살면 될거 같다