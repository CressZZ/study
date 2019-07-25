# package.json 에서 사용하는 버전에 관하여 
https://blog.outsider.ne.kr/1041
## 기호들
`1.2.3`  
`>1.2.3`  
`>=1.2.3`  
`<1.2.3`  
`<=1.2.3`  
`~1.2.3`  

## 틸드(~)
- 현재 지정한 버전의 마지막 자리 내의 범위에서만 자동으로 업데이트
```text
~0.0.1 : >=0.0.1 <0.1.0
~0.1.1 : >=0.1.1 <0.2.0
~0.1 : >=0.1.0 <0.2.0
~0 : >=0.0 <1.0
```
## 캐럿(^)
- Semantic Versioning(보통 SemVer라고 부른다.)
> MAJOR version when you make incompatible API changes,  
> MINOR version when you add functionality in a backwards-compatible manner, and  
> PATCH version when you make backwards-compatible bug fixes.  

즉, MAJOR 버전은 API의 호환성이 깨질만한 변경사항을 의미하고 MINOR 버전은 하위호환성을 지키면서 기능이 추가된 것을 의미하고 PATCH 버전은 하위호환성을 지키는 범위내에서 버그가 수정된 것을 의미한다.
```text
^1.0.2 : >=1.0.2 <2.0
^1.0 : >=1.0.0 <2.0
^1 : >=1.0.0 <2.0
```

버전이 1.0.0 미만인 경우(SemVer에서는 pre-release라고 부른다.)에는 상황이 다르다. 소프트웨어 대부분에서 1.0버전을 내놓기 전에는 API 변경이 수시로 일어난다. 그래서 0.1을 쓰다가 0.2를 사용하면 API가 모두 달라졌을 수 있다. 그래서 캐럿(^)을 사용할 때 0.x.x에서는 마치 틸드처럼 동작해서 지정한 버전 자릿수 내에서만 업데이트한다.(앞에 예시와 비교해보면 차이점을 알 수 있다.) 그리고 0.0.x인 경우에는 하위호환성 유지가 안 될 가능성이 더 높으므로 위의 마지막 예시처럼 지정한 버전만을 사용한다.
```text
^0.1.2 : >=0.1.2 <0.2.0
^0.1 : >=0.1.0 <0.2.0
^0 : >=0.0.0 <1.0.0
^0.0.1 : ==0.0.1
```

# package-lock.json 이 필요한 이유
https://hyunjun19.github.io/2018/03/23/package-lock-why-need/  

...  
실제로 가자고 앱에서 사용하고 있는 react-native-router-flux를 예로 들어볼까요?
아래는 프로젝트에서 npm ls로 조회한 의존성 트리에서 react-native-router-flux 부분만 발췌한 부분입니다.

```text
├─┬ react-native-router-flux@4.0.0-beta.24
│ ├── lodash.isequal@4.5.0
│ ├── mobx@3.6.2
│ ├─┬ mobx-react@4.4.3
│ │ └── hoist-non-react-statics@2.5.0
│ ├── opencollective@1.0.3
│ ├── path-to-regexp@2.2.0
│ ├── prop-types@15.6.1]
│ └── react-navigation@1.0.0-beta.19

```
package.json 파일에 버전을 "react-native-router-flux": "4.0.0-beta.24" 지정해도 react-native-router-flux 프로젝트 내부의 package.json 파일에 react-navigation이 `Caret Range`로 선언되어 있기 때문에 `react-navigation의 버전은 npm install을 수행하는 시점에 따라서 달라집니다.`   
....

# package-lock.json에 있는 `requires`와 `dependencies`의 차이
- 한마디로 말하면 `requires`는 현재 프로젝트의 최상위 node_modules에서 가져다 쓸수 있는 dependencies를 말하고, 
- `dependencies는`는 버전 문제대문에 최상위 node_modules에서 가져다 쓸수 없는 package를 해당 (여기서는 `gulp`) 페이지 안에 node_modules를 만들어서 별도로 설치하는 것을 말함
- `dependencies` 경로: `/Users/yjpark/Documents/static/lineagem-preorder/node_modules/gulp/node_modules/semver/`
-  `requires` 경로 : /Users/yjpark/Documents/static/lineagem-preorder/node_modules/archy/  

## 참고
https://stackoverflow.com/questions/52926922/package-lock-json-requires-vs-dependencies

> Ok, maybe You mean that from the beginning, but I now I understand. To clarify: "requires" reflects dependencies from 'package.json' file, while "dependencies" reflects actually installed dependencies in node_modules folder of this dependency. All dependencies are installed in root node_modules by default, but if there is a conflict, they are installed in node_modules of that specific dependency. – Krzysztof Grzybek Oct 22 '18 at 19:44

> exactly, you got the point :) – Barr J Oct 23 '18 at 4:23

### 예시
```json
/Users/yjpark/Documents/static/lineagem-preorder/package.json
 "devDependencies": {
    "gulp": "^3.9.1"
}
```
```json
/Users/yjpark/Documents/static/lineagem-preorder/package-lock.json

"gulp": {
    "version": "3.9.1",
    "resolved": "https://registry.npmjs.org/gulp/-/gulp-3.9.1.tgz",
    "integrity": "sha1-VxzkWSjdQK9lFPxAEYZgFsE4RbQ=",
    "dev": true,
    "requires": {
        "archy": "^1.0.0",
        "chalk": "^1.0.0",
        "deprecated": "^0.0.1",
        "gulp-util": "^3.0.0",
        "interpret": "^1.0.0",
        "liftoff": "^2.1.0",
        "minimist": "^1.1.0",
        "orchestrator": "^0.3.0",
        "pretty-hrtime": "^1.0.0",
        "semver": "^4.1.0",
        "tildify": "^1.0.0",
        "v8flags": "^2.0.2",
        "vinyl-fs": "^0.3.0"
    },
    "dependencies": {
        "minimist": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
            "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ=",
            "dev": true
        },
        "semver": {
            "version": "4.3.6",
            "resolved": "https://registry.npmjs.org/semver/-/semver-4.3.6.tgz",
            "integrity": "sha1-MAvG4OhjdPe6YQaLWx7NV/xlMto=",
            "dev": true
        }
    }
},
```
```json
/Users/yjpark/Documents/static/lineagem-preorder/node_modules/gulp/package.json
 "dependencies": {
    "archy": "^1.0.0",
    "chalk": "^1.0.0",
    "deprecated": "^0.0.1",
    "gulp-util": "^3.0.0",
    "interpret": "^1.0.0",
    "liftoff": "^2.1.0",
    "minimist": "^1.1.0",
    "orchestrator": "^0.3.0",
    "pretty-hrtime": "^1.0.0",
    "semver": "^4.1.0",
    "tildify": "^1.0.0",
    "v8flags": "^2.0.2",
    "vinyl-fs": "^0.3.0"
  },
```

/Users/yjpark/Documents/static/lineagem-preorder/node_modules/gulp/  
`/Users/yjpark/Documents/static/lineagem-preorder/node_modules/gulp/node_modules/minimist/`
`/Users/yjpark/Documents/static/lineagem-preorder/node_modules/gulp/node_modules/semver/`
/Users/yjpark/Documents/static/lineagem-preorder/node_modules/archy/  
/Users/yjpark/Documents/static/lineagem-preorder/node_modules/chalk/  
/Users/yjpark/Documents/static/lineagem-preorder/node_modules/deprecated/  
/Users/yjpark/Documents/static/lineagem-preorder/node_modules/gulp-util/  
......




