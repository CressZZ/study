## 자바스크립트에서 Array.filter(Boolean) 을 하는 이유와, 장점이 뭐야?

## ChatGpt 4.0
`Array.filter(Boolean)`을 사용하는 이유는 주로 배열에서 **falsy 값들을 제거하기 위해서**입니다. JavaScript에서의 falsy 값들은 `false`, `null`, `undefined`, `NaN`, `0`, `""`(빈 문자열) 등입니다. 

`Array.filter()` 함수는 주어진 배열의 각 요소에 대해 주어진 콜백 함수를 실행하고, 그 결과가 참인 경우에만 해당 요소를 새로운 배열에 포함합니다. 이때 `Boolean`을 콜백 함수로 사용하면, 배열의 각 요소가 자동으로 Boolean 타입으로 변환되어 참인 경우만 새 배열에 포함되게 됩니다.

`Array.filter(Boolean)`의 장점은 다음과 같습니다.

1. **간결성**: 배열에서 falsy 값을 제거하는 데 필요한 코드가 매우 간결하게 작성됩니다.
2. **가독성**: 코드의 목적이 명확하게 드러나기 때문에 다른 개발자가 이해하기 쉽습니다.
3. **범용성**: 다양한 상황에서 적용할 수 있으며, 배열 내의 값이 어떤 타입인지에 관계없이 동작합니다.

예를 들어, 다음과 같은 배열이 있다고 가정합시다.

```javascript
const arr = [0, 1, false, 2, '', 3, undefined, null, NaN, 4];
```

`Array.filter(Boolean)`을 사용하여 배열에서 falsy 값을 제거할 수 있습니다.

```javascript
const filteredArr = arr.filter(Boolean); // [1, 2, 3, 4]
```

이렇게 하면, `filteredArr`는 falsy 값들이 제거된 새 배열이 됩니다.

