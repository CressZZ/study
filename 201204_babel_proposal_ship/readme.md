# String.prototype.matchAll 이 IE에서 안된다!

[matchAll MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)

## 왜 안되는가
아직 ECMAScript 의 proposal 단계이기 때문에 바벨이 자동으로 안해 준다. 
https://github.com/tc39/proposal-string-matchall

## 어떻게 처리 하는가 
### `preset-env` 를 사용해서 `shippedProposals` 옵션을 넣어주자
https://babeljs.io/docs/en/babel-preset-env#shippedproposals
```js

  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3,
        "shippedProposals": true
      }
    ]
  ],
```
- 버전별로 지원해주는 proposal 기능은 아래와 같다
```
v7.12.0	Include class static block and import assertions
v7.10.0	Include class properties and private methods
v7.9.0	Include numeric separator
```

- `corejs3` 를 꼭 서야 한다. 
- **중요!!!** **v7.10.0 부터는 class properties and private methods을 지원하기 때문에 `"@babel/plugin-proposal-class-properties"`,
`"@babel/plugin-proposal-private-methods"` 플러그인이 필요없다.**

### 아니면 플러그인이 있지 않을까? 
- 안찾아봄
- 찾아봄 https://www.npmjs.com/package/babel-plugin-polyfill-es-shims

