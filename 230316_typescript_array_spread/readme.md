https://stackoverflow.com/questions/71209739/spread-operator-for-a-variable-of-arrays-of-different-types-returns-an-array-of


```js
type A = string[] | number[];
let a: A = [3] ;


let c = [1, '1'];

function test(a: A){
    var b = [...a];
}

function test(a: A, c:A){
    var b = [...a, ...c];
}

```

원래 배열의 유형이 배열 유형의 합집합인 경우에도 배열 확산의 결과가 단일 배열 유형이 되도록 의도된 것 같습니다. 자세한 내용은 microsoft/TypeScript#28813을 참조하십시오.

인간으로서 [...a]를 보고 a에 대한 단일 '복사' 작업으로 간주한다고 생각합니다. 그러나 컴파일러는 [1, ...a, 2] 또는 [...a, ...a] 등과 같은 항목을 지원하기 위해 더 일반적으로 처리합니다. 따라서 [...a]의 유형은 typeof여야 합니다. a는 받지 않습니다.

microsoft/TypeScript#28813의 문제는 Union이 속성에서 위쪽으로 또는 누군가가 예상할 수 있는 속성으로 아래쪽으로 전파되지 않는 TypeScript의 다른 위치에 대해 언급합니다. 예를 들어, declare const x: {a: 0, b: 0} | {a: 1, b: 1} 그리고 그것을 const y = {a: x.a, b: x.b}와 같은 새 객체 리터럴에 복사하면 {a: 0 | 1, b: 0 | 1} 겉보기에는 원본과 같은 유형이어야 합니다. 컴파일러는 일반적으로 엄청나게 비용이 많이 들기 때문에 모든 유니온에 분석을 배포하지 않습니다. (개발자가 필요에 따라 이러한 분석에 옵트인할 수 있도록 거부된 제안은 microsoft/TypeScript#25051을 참조하십시오.) 어레이 스프레드의 경우 이는 [...a, ...a를 지원하는 일반적인 메커니즘이 없음을 의미합니다. ] number[]로 해석됨 | 문자열[] | 부울[].