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