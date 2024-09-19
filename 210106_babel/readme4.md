 # 아 또 오랫만에 보니까 햇갈리네

https://tech.kakao.com/2020/12/01/frontend-growth-02/

## @babel/preset-env 으로 플러그인만 넣고
## @babel/plugin-transform-runtime을 사용하여 폴리필 넣으면 전역 오염 x

### 참고로  @babel/plugin-transform-runtime 은 기본적으로 전역 오염을 방지하는 역할을 하는 @babel/runtime 을 가지고 있고, 
### 추가로regenerator-runtime 폴리필을 기본적으로 가지고 있으며, 
### corejs 옵션을 통해 corejs 폴리필도 가져 올수 있다.

```json
// .babelrc
{
	// "targets": "defaults",
	"presets": [
		[
			"@babel/preset-env",
			{
				"modules": "auto"
				// "useBuiltIns": "usage",
				// "corejs": "3"
			}
		]
	],
	"plugins": [["@babel/plugin-transform-runtime", {"corejs":3}]]
}

```

```js
// 바벨이 적용되어 dist 된 파일
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _context;
new _promise["default"](function (res) {
  return res(1);
});
(0, _map["default"])(_context = []).call(_context, function (e) {
  return e * 3;
});
```

## @babel/preset-env 으로 플러그인도 넣고
## @babel/preset-env 의 useBuiltIns 옵션으로 폴리필을 넣으면 전역 오염 O => 아 근데 이게 일반적임
```json

{
	// "targets": "defaults",
	"presets": [
		[
			"@babel/preset-env",
			{
				"modules": "auto",
				"useBuiltIns": "usage",
				"corejs": "3"
			}
		]
	],
	// "plugins": [["@babel/plugin-transform-runtime", {"corejs":3}]]
}

```


```js
// 바벨이 적용되어 dist 된 파일
"use strict";

require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.array.map.js");
new Promise(function (res) {
  return res(1);
});
[].map(function (e) {
  return e * 3;
});

```



# 추가 질문

"@babel/preset-env" 과  "@babel/plugin-transform-runtime", 을 쓰고 있는데, 

 "@babel/plugin-transform-runtime", 옵션에 "corejs": 3, 를 넣으면 
preset-env  의 target 설정을 무시하고, 
사용한 모든 메서드에 대한 폴리필이 들어가더라고

그럼 난 @babel/plugin-transform-runtime 이 제공하는 전역 오염 방지와 함게 
preset-env의 taget 옵션을 함께 사용하지 못하는게 맞아?

# 추가 답변

당신이 Babel 설정에서 `@babel/preset-env`와 `@babel/plugin-transform-runtime`을 사용하고, `corejs: 3` 옵션을 포함시켰을 때, `@babel/preset-env`의 `targets` 옵션이 폴리필과 관련하여 무시되는 것을 발견할 수 있습니다. 이는 `corejs`가 지정된 `@babel/plugin-transform-runtime`이 폴리필을 삽입할 때 `targets`를 고려하지 않기 때문입니다; 대신 코드에서 사용된 모든 메서드에 대한 폴리필을 포함합니다.

**무슨 일이 일어나고 있는 걸까요?**

- **`@babel/preset-env`와 `targets`:** 이 프리셋은 당신이 `targets` 옵션에 지정한 환경에 따라 코드를 컴파일합니다. `useBuiltIns: 'usage'`와 `corejs: 3`과 함께 사용하면, 타겟 환경에서 지원되지 않는 기능에 대한 폴리필을 추가합니다.

- **`@babel/plugin-transform-runtime`와 `corejs: 3`:** 이 플러그인은 글로벌 스코프 오염을 피하기 위해 폴리필을 직접 글로벌 환경에 추가하지 않습니다. 대신 모듈의 상단에 폴리필에 대한 import 문을 삽입합니다. 하지만 `targets`를 고려하지 않으며, 코드에서 사용된 모든 기능에 대한 폴리필을 포함합니다. 이는 해당 기능이 타겟 환경에서 이미 지원되더라도 폴리필이 추가된다는 것을 의미합니다.

**그래서 둘을 함께 사용할 수 있을까요?**

안타깝게도, `corejs: 3`과 함께 `@babel/plugin-transform-runtime`을 사용하면 `@babel/preset-env`의 폴리필 동작을 덮어씁니다. 이는 글로벌 오염 방지를 위해 `@babel/plugin-transform-runtime`을 사용하면서도 `targets`에 기반한 폴리필을 포함하는 것이 불가능하다는 것을 의미합니다.

**어떻게 해야 할까요?**

글로벌 오염 방지와 폴리필에 대한 `targets`를 모두 만족시키기 위해 다음 옵션을 고려해 보세요:

1. **폴리필은 `@babel/preset-env`에 맡기고, `@babel/plugin-transform-runtime`은 헬퍼 함수에만 사용하기:**

   - `@babel/preset-env`를 `useBuiltIns: 'usage'`와 `corejs: 3`으로 설정하여 `targets`에 기반한 필요한 폴리필을 추가합니다.
   - `@babel/plugin-transform-runtime`은 `corejs` 옵션 없이 설정하여 헬퍼 함수들을 글로벌 스코프 오염 없이 처리합니다.

   ```json
   // .babelrc
   {
     "presets": [
       [
         "@babel/preset-env",
         {
           "targets": { "browsers": ["last 2 versions"] },
           "useBuiltIns": "usage",
           "corejs": 3
         }
       ]
     ],
     "plugins": [
       [
         "@babel/plugin-transform-runtime",
         {
           "corejs": false,
           "helpers": true,
           "regenerator": true,
           "useESModules": true
         }
       ]
     ]
   }
   ```

2. **폴리필을 수동으로 포함하기:**

   - 글로벌 오염 방지를 위해 `@babel/plugin-transform-runtime`을 `corejs: 3`과 함께 사용합니다.
   - 타겟 환경에서 지원되지 않는 기능에 대한 폴리필을 수동으로 포함합니다. `core-js-builder`와 같은 도구를 사용하여 커스텀 폴리필 번들을 생성할 수 있습니다.

3. **정확한 폴리필을 위해 글로벌 오염을 수용하기:**

   - 만약 글로벌 오염보다 번들 크기와 `targets`에 기반한 정확한 폴리필링이 더 중요하다면, `useBuiltIns: 'usage'`로 설정된 `@babel/preset-env`만을 사용하는 것을 선택할 수 있습니다.

**결론**

당신의 이해가 맞습니다: `corejs: 3`과 함께 `@babel/plugin-transform-runtime`을 사용하면 `@babel/preset-env`의 `targets` 옵션을 폴리필에 활용할 수 없습니다. 프로젝트에서 글로벌 오염 방지와 타겟별 폴리필링 중 어떤 것이 더 중요한지에 따라 Babel 설정을 조정해야 합니다.

**추가 자료:**

- [Babel의 `@babel/preset-env` 문서](https://babeljs.io/docs/en/babel-preset-env)
- [Babel의 `@babel/plugin-transform-runtime` 문서](https://babeljs.io/docs/en/babel-plugin-transform-runtime)
- [Babel 폴리필 이해하기](https://babeljs.io/docs/en/babel-polyfill)

