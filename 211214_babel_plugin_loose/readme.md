# .babelrc 를 아래와 같이 작성하면
```json
{
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": 3,
          "loose": true
        }
      ]
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
    ]
}

```

# 애러 발생

Though the "loose" option was set to "true" in your @babel/preset-env config, it will not be used for @babel/plugin-proposal-private-property-in-object since the "loose" mode option was set to "false" for @babel/plugin-proposal-class-properties.
The "loose" option must be the same for @babel/plugin-proposal-class-properties, @babel/plugin-proposal-private-methods and @babel/plugin-proposal-private-property-in-object (when they are enabled): you can silence this warning by explicitly adding
`["@babel/plugin-proposal-private-property-in-object", { "loose": false }]`
to the "plugins" section of your Babel config.


Though the "loose" option was set to "true" in your @babel/preset-env config, it will not be used for @babel/plugin-proposal-private-methods since the "loose" mode option was set to "false" for @babel/plugin-proposal-private-property-in-object.
The "loose" option must be the same for @babel/plugin-proposal-class-properties, @babel/plugin-proposal-private-methods and @babel/plugin-proposal-private-property-in-object (when they are enabled): you can silence this warning by explicitly adding
`["@babel/plugin-proposal-private-methods", { "loose": false }]`
to the "plugins" section of your Babel config.`

대략 위와 같은 애러가 발생한다. 

# 집고 넘어가야 할거 
## 애러와 관련하여 @babel/preset-env 에 기본적으로 속하는 플러그인은 아래와 같다
- @babel/plugin-proposal-private-property-in-object
- @babel/plugin-proposal-private-methods
  
## 일단 내가 수동으로 넣어준 플러그인은 아래와 같다
- @babel/plugin-proposal-class-properties

## 중요하고 햇갈리는 부분
(수동으로 넣어준) 플러그인들은 기본적으로 `loose` 옵션이 `false` 이다. 

# loose 옵션이란
https://simsimjae.tistory.com/447
## loose:false 의 경우 
```js
var Bork = function Bork() {
  babelHelpers.classCallCheck(this, Bork);
  Object.defineProperty(this, 'x', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 'bar',
  });
  Object.defineProperty(this, 'y', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: void 0,
  });
};
Object.defineProperty(Bork, 'a', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'foo',
});
Object.defineProperty(Bork, 'b', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: void 0,
});
```
Object.defineProperty를 통해 클래스의 속성들을 정의해주고 있습니다. 코드가 다소 장황합니다.

## loose:true인 경우
```js
var Bork = function Bork() {
  babelHelpers.classCallCheck(this, Bork);
  this.x = 'bar';
  this.y = void 0;
};
Bork.a = 'foo';
Bork.b = void 0;

```
아래와 같이 할당식 형태로 깔끔하게 변환됩니다. 코드 길이가 매우 줄어들었죠. 코드 길이가 준다는것은 번들 사이즈가 줄어든다는 의미입니다.

# 애러는 무슨 말을 하고 싶은건가?

`@babel/preset-env` 설정에서 `"loose"` 옵션이 "true"로 설정되어 있지만 `"loose"` 모드 옵션이 설정되어 있기 때문에 `@babel/plugin-proposal-private-property-in-object`에는 사용되지 않습니다. `@babel/plugin-proposal-private-methods에` 대해 "`false"`로 설정합니다.
"느슨한" 옵션은 `@babel/plugin-proposal-class-properties`, `@babel/plugin-proposal-private-methods` 및 `@babel/plugin-proposal-private-property-in-object`에 대해 동일해야 합니다. 활성화됨): 명시적으로 추가하여 이 경고를 무시할 수 있습니다.
`["@babel/plugin-proposal-private-property-in-object", { "loose": false }]`
Babel 구성의 "플러그인" 섹션으로 이동합니다.

## 정리하면
- 넌 `@babel/preset-env` 의 loose 옵션을 `"true"`로 설정했다. 
- 그런데 그 loose 옵션이 값인 true는 `@babel/plugin-proposal-private-property-in-object`에는 적용 되지 않는다. 
- 원래대로 라면, `@babel/plugin-proposal-private-property-in-object` 플러그인은 `@babel/preset-env` 안에 include 된 플러그인인이니까 너가 설정한 옵션이 적용되어야 하는데 지금은 그렇지 않다. 
- 왜냐하면 `loose` 옵션의 값은  `@babel/plugin-proposal-class-properties`, `@babel/plugin-proposal-private-methods`(@babel/preset-env 에 included 된 플러그인) 및 `@babel/plugin-proposal-private-property-in-object`(@babel/preset-env 에 included 된 플러그인)에 대해 동일해야 하기 때문이다.
- 넌 `@babel/plugin-proposal-class-properties` 플러그인을 수동으로 넣었고, 이것의 loose 옵션값은 `false` 이다. 
- 그러니까 난 `@babel/plugin-proposal-class-properties` 플러그인의 loose 옵션값인 `false` 를 `@babel/preset-env` 안에 들어 있는 `@babel/plugin-proposal-private-methods`(@babel/preset-env 에 included 된 플러그인) 및 `@babel/plugin-proposal-private-property-in-object`(@babel/preset-env 에 included 된 플러그인)의 `loose` 옵션값으로 사용할거다.
- 위 애러 메시지는 `["@babel/plugin-proposal-private-property-in-object", { "loose": false }]` 와 `["@babel/plugin-proposal-private-methods", { "loose": false }]` 을 명시적으로 입력함으로서 애러 메시지가 출력 안되게 할수 있다. 
- 지금 난 너가 위 내용을 명시적으로 입력하지 않았는데도 불구 하고, 입력한것처럼 적용하였다. (loose 옵션을 false로 적용 하였다.)


# 다른 해결책
- loose 옵션을 전부 true 로 바꾸면 된다. 
- `["@babel/plugin-proposal-private-property-in-object", { "loose": false }]` 와 `["@babel/plugin-proposal-private-methods", { "loose": false }]` 는 `@babel/preset-env` 안에 속해 있는 플러그인 이므로  `@babel/preset-env` 의 `loose` 옵션값을 따른다. 
```json
{
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": 3,
          "modules": false,
          "targets": {
              "ie":"9"
          },
          "loose": true
        }
      ]
    ],
    "plugins": [
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ]
}

```

# 결론
위 문구는 애러 문구가 아니라 그냥 경고? 문구이다. 바벨이 알아서 해주니까 상관 없다아~


# 새로운 loose 옵션 관련 애러 2023.08

# 이슈

```js

const matches = [...msg.matchAll(/\${([\s]*[^;\s{]+[\s]*)\}/g)];

// 이거를 .ts 파일에서 실행하면, matches 가 string[] 타입이  아니라 RegExpStringIterator[] 타입으로 리턴되고 있어. 왜그럴까?

```
- 위 코드에서 String.prototype.matchAll 은 `RegExpStringIterator` 타입을 리턴하는게 맞다
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
- 그런데 위 MDN 에서 나와 있듯이 `[...RegExpStringIterator]` interator 를 spread 문법으로 풀었으니까, `[...RegExpStringIterator]` 의 타입은 `string[]` 가 되어야 하는게 맞다. 
- 근데 loose 옵션을 키면, 이게 `string[]` 이 아니라 `RegExpStringIterator[]` 타입으로 나온다. 
- loose 옵션을 끄면 괜찮아 진다. 
- 이때 `[...RegExpStringIterator]` 대신 `Array.from(RegExpStringIterator)` 을 쓰면 애러는 안난다.

# GPT 의 답변
- Babel의 loose 옵션은 Babel의 트랜스파일링 과정에서 일부 ES6+ 기능에 대해 최신 스펙을 정확히 따르지 않고, 더 느슨하게 변환하는 것을 말합니다. 이로 인해 변환된 코드가 좀 더 간결하고, 실행 속도가 빠르며, 구형 브라우저 호환성이 더 좋아질 수 있습니다.
- 하지만 이 loose 옵션은 이런 이점 외에도 주의해야할 점이 있습니다. loose 모드를 사용하면 최신 JavaScript 스펙의 일부 세부 사항을 따르지 않게 되므로, 일부 코드가 예상대로 동작하지 않을 수 있습니다. 이는 특히 클래스와 관련된 기능, 스프레드 연산자와 같은 ES6+ 기능에서 특히 그렇습니다.
- 따라서, 당신이 겪고 있는 문제가 Babel의 loose 옵션 때문에 발생하는 것일 가능성도 있습니다. loose 옵션을 끄고 코드가 정상적으로 동작하는지 확인해보는 것이 좋을 것 같습니다.
- 그러나, 아래와 같이 Array.from()을 사용하는 방식으로 문제를 해결할 수 있을 것 같습니다. 이는 loose 옵션이나 다른 Babel 설정에 관계 없이 안정적으로 동작하는 방법입니다: