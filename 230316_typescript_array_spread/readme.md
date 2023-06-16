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

인간으로서 [...a]를 보고 a에 대한 단일 '복사' 작업으로 간주한다고 생각합니다. 그러나 컴파일러는 [1, ...a, 2] 또는 [...a, ...a] 등과 같은 항목을 지원하기 위해 더 일반적으로 처리합니다. 따라서 [...a]의 유형은 `typeof a` 가 아니다.

microsoft/TypeScript#28813의 문제는 Union이 속성에서 위쪽으로 또는 누군가가 예상할 수 있는 속성으로 아래쪽으로 전파되지 않는 TypeScript의 다른 위치에 대해 언급합니다. 예를 들어, declare const x: {a: 0, b: 0} | {a: 1, b: 1} 그리고 그것을 const y = {a: x.a, b: x.b}와 같은 새 객체 리터럴에 복사하면 {a: 0 | 1, b: 0 | 1} 겉보기에는 원본과 같은 유형이어야 합니다. 컴파일러는 일반적으로 엄청나게 비용이 많이 들기 때문에 모든 유니온에 분석을 배포하지 않습니다. (개발자가 필요에 따라 이러한 분석에 옵트인할 수 있도록 거부된 제안은 microsoft/TypeScript#25051을 참조하십시오.) 어레이 스프레드의 경우 이는 [...a, ...a를 지원하는 일반적인 메커니즘이 없음을 의미합니다. ] number[]로 해석됨 | 문자열[] | 부울[].


## 햇갈리는데, 
```js

/**
 * 이케이스를 잘 봐야 한다. 
 * 
 * 매개변수 a 와 c 는  둘다 A 타입을 받고있고, 
 * 매개변수이므로 아직 결정(!) 되지 않은 값으로 
 * 근데 내가 아래처럼 [...a, ...c] 를 썼다고 하다. 
 * 
 * 만약 함수 호출할때 인자로 ['a', 'b'], [1,2] 를 줬다고 하면
 * 그럼 b 에는 (string | number)[] 타입이 적용 된다. 
 */
type A = string[] | number[];

function test(a: A, c:A){
    var b = [...a, ...c];
}

/**
 * 그럼 아래는 어떤가?
 * 
 * 아무튼 typescript 는 spread 연산자를 어떤식으로 어떻게 몇개를 넣었는지 추론 하지 않는다. 
 * 그냥 스프레드 연산자를 썼구나? a 라는 변수를 스프레드 했네? a 라는 변수는 타입이 string[] | number[] 이구나.
 * ...a => ...A 처럼 타입처럼 생각하고, 이것은 ...A, ...A, ...A 처럼 연속된 스프레드든 ...A 처럼 단일스프레드 든,
 * 타입스크립트는 스프레드는 나열이라고 인식하므로 똑같이 바라보게 되고, 
 * 그렇게 되면 위 예시처럼  (string | number)[] 타입이 적용 되게 되는 것이다.
 */
type A = string[] | number[];

function test(a: A){
    var b = [...a];
}


/**
 * 그럼 아래는 어떤가?
 * 
 * 스프레드는 '나열' 이니까 아래의 코드는 
 * 이것은 ...A, ...A, ....A, ...boolean 처럼 인식할거고 
 * 그럼  (string | number | boolean)[] 타입이 적용 되게 되는 것이다.
 */
type A = string[] | number[];

function test(a: A){
    var b = [...a, false];
}

/**
 * 그럼 아래는 어떤가?
 * 
 * 위의 케이스처럼 a 의 값이 미정이 아니라. 확정이다. 
 * a 의 타입은 number[] 이므로 b 의 타입도 number[] 가 될것이다.
 */
type A = string[] | number[];
const a: A = [3] ;

const b = [...a]



/**
 * 그럼 아래는 어떤가?
 * 
 * a 의 값이 미정이다
 * (string | number)[] 타입이 적용 된다
 */
type A = string[] | number[];
const a: A = [] ;

const b = [...a]


/**
 * 마지막으로 문제가 있다,
 * 
 * 이건 string[] | number[]; 타입이다. 스프레드를 더이상 안쓰고 const 로 고정 시켜 버린다. 
 * 말인 즉슨 원래 스프레드를 쓰면 타입 스크립트는 ...A, ...A, ...A 처럼 생각하고 타입을 정의 했기때문에 
 * (string | number)[] 이 적용된 것인데, 
 * 
 * const 로 고정 시켜 버리면, 더이상의 추가 ...A 는 없다고 확신시켜 버리고, 
 * 현재 상황 고정이 되는거 같다. 따라서 타입은 string[] | number[]; 가 되는데, 
 */

type A = string[] | number[];
const a: A = [] ;

const b = [...a] as const;

/**
 * 비슷한 케이스로 아래의 케이스가 있는데, 
 * 아래는 readonly string[] | readonly (string | number)[] | readonly number[] 이렇게 나온다. 
 * 음......어려워라
 */

type A = string[] | number[];
const a: A = [] ;
const c: A = [] ;

const b = [...a, ...c] as const;

```