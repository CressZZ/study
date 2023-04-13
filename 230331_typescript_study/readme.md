# 19. 추론 가능한 타입을 사용해 장황한 코드 방지하기
## 코드의 모든 변수에 타입을 선언하는 것은 배생산적이며 형편없는 스타일로 여겨 진ㄷ다. 
## 타입이 추론 되면 리팩터링 역시 용의해 진다 
## 비구조화 할당문은 모든 지역 변수의 타입이 추론 되도록 한다. 
```js
type Product = {
    id: string
    name: string
    price: number
}

function test(product: Product){
    const {id, name, price} = product;
    console.log(id, name, price)
}

```

## 타입 구문을 최소화 하자
## 함수 매개변수 기본값이 있으면 타입 지정 하지 말자 
## 타입정보가 있는 라이브러리의 콜백 함수의 매개 변수에 타입 지정 하지 말자
```js
namespace express {
  export interface Request {}
  export interface Response {
    send(text: string): void;
  }
}
interface App {
  get(path: string, cb: (request: express.Request, response: express.Response) => void): void;
}
const app: App = null!;
// END

// Don't do this:
app.get('/health', (request: express.Request, response: express.Response) => {
  response.send('OK');
});

// Do this:
app.get('/health', (request, response) => {
  response.send('OK');
});
```
## 객체 리터럴에는 타입을 명시하자!(잉여속성 체크 => 실수 발생 방지)
## 함수 반환 타입에는 타입구문을 명시하자
- 함수 구현 할때 오류 방지
- 반환 타입을 명시하면 함수에 대해 명확히 알수 있다. (TDD 와 비슷)
- 반환타입을 명시하지 않으면, 매개변수와 반환 값의 타입이 같아도 반환 값의 타입추론을 명명된 타입으로 제공 하지 않는다. (type A ={name: string} 인경우 A 라고 안하고 {name: string} 이라고 추론한다 )
## Promise 반화 함수는 async 함수를 사용하자 (Item 25에서 다시 확인)

---

# 20. 다른 타입에는 다른 변수 사용하기
## 타입을 바꿀수 이는 한가지 방법은 `범위를 좁히는것` 이다. 
## 유니온 타입으로 코드가 동작하기는 하나, 더 많은 문제가 생긴다. id 를 사용할때마다 어떤 타입인지 확인 해야 한다. 유니온 타입은 string이나 number 같은 간단한 타입에 비해 다루기가 어렵다
```js
function fetchProduct(id: string) {}
function fetchProductBySerialNumber(id: number) {}

let id: string|number = "12-34-56"; // 이부분
fetchProduct(id);

id = 123456;  // OK
fetchProductBySerialNumber(id);  // OK
```

## 이렇게 바꾸자
```js
function fetchProduct(id: string) {}
function fetchProductBySerialNumber(id: number) {}

const id = "12-34-56";
fetchProduct(id);

const serial = 123456;  // OK
fetchProductBySerialNumber(serial);  // OK

```
## 사로 다른 탕입에는 서로 다른 별도의 변수를 사용하는게 바람직한 이유
- 서로 관련이 없는 두개의 ㅏㄱㅂㅅ을 분리한다. 
- 변수명을 더 구체적으로 지을수 있다. 
- 타입 추론을 향상시키며, 타입 구문이 불필요 해진다. 
- let 대신 const를 쓸 확률이 높이지고, 그렇게 되면 타입 체커가 타입을 추론 하기 더 좋아 진다. 

--- 

# 21. 타입 넓히기
## 런타임에 모든 변수는 유일한 값을 가진다. 
## 그러나 타입스크립트가 코드를 분석 하는 정적 분석시점에, 변수는 `'가능한' 값들의 집한인 타입을 가진다.`
## 그러니까, 변수에 값을 할당하면 당연히 유일한 값을 할당 하는 거지만, 타입스크립트는 그 값을 가지고 `값`에서 `값들의 집합`으로 `넓혀서` 타입을 할당한다는 이야기

## `변수에 타입을 명시 하지 않고 값을 할당 함으로서 변수를 초기화 할때, 타입체커는 지정된 단일 값을 가지고 [할당 가능한 값들의 집합을 유추] 해야 한다.`
## 이것이 '타입 넓히기' 이다

## 진짜 많이 겪는 예시
```js
interface Vector3 { x: number; y: number; z: number; }
function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
  return vector[axis];
}
let x = 'x'; // x의 타입은 할당 시점에 넓히기가 동작해서 string 으로 추론 되었다. 
let vec = {x: 10, y: 20, z: 30};
getComponent(vec, x);
               // ~ Argument of type 'string' is not assignable to
               //   parameter of type '"x" | "y" | "z"'

```
- x의 타입은 할당 시점에 넓히기가 동작해서 string 으로 추론 되었다. 
- 우리는 당연히 axis에 할당한 타입인 'x' 가 될거라고 생각한다.

## **추론 과정**
```js
// 이렇게 let으로 지정하면 (let이 문제이다)
let x = 'x';

// 타입스크립트는 아래의 코드가 나올수 있다고 생각함
x = 'a';
x = 'Four score and seven years ago...';
```

## 타입 넓히기 과정 제어 방법
### const 사용
```js
const x = 'x';  // type is "x"
let vec = {x: 10, y: 20, z: 30};
getComponent(vec, x);  // OK
```
### 그러나 const는 만능이 아니다. `객체`와 `배열`에 여전히 문제가 있다. 
```js
interface Vector3 { x: number; y: number; z: number; }
function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
  return vector[axis];
}
 const v = {
   x: 1,
 };
 v.x = 3;  // OK
 v.x = '3';
// ~ Type '"3"' is not assignable to type 'number'
 v.y = 4;
// ~ Property 'y' does not exist on type '{ x: number; }'
 v.name = 'Pythagoras';
// ~~~~ Property 'name' does not exist on type '{ x: number; }'
```
### 위 예제에서 v 가 추론될수 있는 경우의 수는 몇개 있는데, 
```js
{readonly x:1} // 가장 구체적 (좁음)
{x: number} // 조금 추상적
{[key:string]: number} // 가장 추상적 (넓음)
Record<string, number>
```
### 객체의 경우 타입스크립트의 넓히기 알고리즘(즉, 타입스클비트가 지정된 단일 값을 가지고 할당 가능한 값을 유추하는 과정)은 각 요소를 [let]으로 할당 된 것처럼 다룬다.
### 그래서 v 의 타입은 {x: number} 가 되고, 숫자로 재할당은 되지만, string으로는 안된다. 추가로 `객체는 다른 속성을 추가 할수도 없다.(v.t = 'test' // 안됨)` =>  `따라서 객체를 한번에 만들어야 한다.`

## 타입 추론의 강도를 제어 하는 법
### 1) 명시적 타입 구문 제공
```js
const v: {x: 1|3|5} = {
  x: 1,
};  // Type is { x: 1 | 3 | 5; }

```
### 2) 타입 체커에 추가적인 문맥을 제공 한다. (아이템 26 - 타입 추론 과정에서 문맥의 역할)
### 3) const 단언문 사용 (as const)
```js
// 객체
const v1 = {
  x: 1,
  y: 2,
};  // Type is { x: number; y: number; }

const v2 = {
  x: 1 as const,
  y: 2,
};  // Type is { x: 1; y: number; }

const v3 = {
  x: 1,
  y: 2,
} as const;  // Type is { readonly x: 1; readonly y: 2; }

// 배열
const a1 = [1, 2, 3];  // Type is number[]
const a2 = [1, 2, 3] as const;  // Type is readonly [1, 2, 3]

```

--- 

# 22. 타입 좁히기
## - 타입 좁히기는 타입스크립트가 `넓은 타입`으로 부터 `좁은 타입`으로 진행하는 과정을 말함
## - 타입스크립트는 일반적으로 `조건문에서 좁히기를 한다.` => `단, 타입 별칭이 존재한다면 그러지 못할수도 있다.` (아이템 24 - 일관성 있는 별칭 사용하기)
## - 즉, `타입가드` 같은거다
### 제일 일반적인 예시는 null 체크 이다
```js

// 1번 예시
const el = document.getElementById('foo'); // Type is HTMLElement | null
if (el) {
  el // Type is HTMLElement => [[타입이 좁아젔다]]
  el.innerHTML = 'Party Time'.blink();
} else {
  el // Type is null -> [[타입이 좁아졌다]]
  alert('No element #foo');
}


// 2번 예시
const el = document.getElementById('foo'); // Type is HTMLElement | null
if (!el) throw new Error('Unable to find #foo');

// [[타입이 좁아젔다]]
el; // Now type is HTMLElement
el.innerHTML = 'Party Time'.blink();

// 3번 예시
function contains(text: string, search: string|RegExp) {
  if (search instanceof RegExp) {
    search  // [[타입이 좁아젔다]] Type is RegExp
    return !!search.exec(text);
  }
  search  // [[타입이 좁아젔다]] Type is string
  return text.includes(search);
}

```

## `꿀팁`! 좁히기 잘못된 예시 - 왜인지 찾아 보세요 (125 페이지. 컨닝 금지)
```js
// 1번 예시
const el = document.getElementById('foo'); // type is HTMLElement | null
if (typeof el === 'object') {
  el;  // Type is HTMLElement | null
}

// 2번 예시
function foo(x?: number|string|null) {
  if (!x) {
    x;  // Type is string | number | null | undefined
  }
}
```

## 타입을 좁히는 또다른 방법은 명시적 태를 붙이는거 (태그된 유니온 / 구별된 유니온)
- [[결국 if 문 아닌가?]] => 아무튼 null 이나, in 연산자 같은거 말고, 명시적 태크를 붙인다는 이야기
```js
interface UploadEvent { type: 'upload'; filename: string; contents: string }
interface DownloadEvent { type: 'download'; filename: string; }
type AppEvent = UploadEvent | DownloadEvent;

function handleEvent(e: AppEvent) {
  switch (e.type) {
    case 'download':
      e  // Type is DownloadEvent
      break;
    case 'upload':
      e;  // Type is UploadEvent
      break;
  }
}
```
## 또다른 방법은 '사용자 정의 타입 가드'

```js
// [[ 리턴값이 el is HTMLInputElement ]] 
function isInputElement(el: HTMLElement): el is HTMLInputElement {
  return 'value' in el;
}

function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    el; // Type is HTMLInputElement
    return el.value;
  }
  el; // Type is HTMLElement
  return el.textContent;
}
```

## 타입 가드 예시인데, 조금 딥하게 들어가면...
```js
const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
const members = ['Janet', 'Michael'].map(
  who => jackson5.find(n => n === who)

// 이 부분
).filter(who => who !== undefined);  // Type is (string | undefined)[]
```

- 위 예시에서 `filter` 메서드로 `undefined`를 걸러 내려고 하는데, `filter`가 타입 추론을 정확히 안해 주므로 타입 가드를 쓰라고 나온다. 
```js
const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];

// 콜백을 이걸로 넣으라는 이야기 [[ x is T 이다 ]], 
// 즉, 이함수를 돌고 나왔을때, true가 반환 된다면, 들어가 인자는 T 이다. 라고 확정해 준다는 이야기 
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

const members = ['Janet', 'Michael'].map(
  who => jackson5.find(n => n === who)

// 이 부분
).filter(isDefined);  // Type is string[]

```
- 음... 결과적으로 같은 이야기 인데, 이게 왜그러냐 하면 filter 의 타입 정의를 보면 아래와 같은데, 
```js
// lib.es5.d.ts
    // filter 메서드에 인자로 들어가는 함수의 리턴 형식이 [ value is S ] 와 같은 형식이면, (S 는 T 의 하위호환(아 아기 뭐라 그러드라) 이어야 한다.) filter 메서드의 반환값은 S[] 라고 딱 정해져 있다. )
    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];

    // 이건 반환값이 아무튼 타입가드 형식의 함수가 아닌경우 메서드 반환 값이 그냥 T[] 로 인식 된다.
    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
```
- filter 콜백이 타입가드 형식이 아닌경우에는 두번째 함수 타입이, 
- 콜백이 타입가드 형식인 경우에는 첫번째 함수 타입이 적용 되기 때문이다. 
- 그니까, 타입 가드를 사용해야 하는 예시가 맞긴한데, filter 콜백으로 타입가드 함수를 써야 하는 이유는 그냥 filter 메서드 타입이 위와 같이 정의 되어 있기 때문인거 같다

```js
// 당연히 이것도 됨
const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
const members = ['Janet', 'Michael'].map(
  who => jackson5.find(n => n === who)
).filter((who): who is string => who !== undefined);  // Type is (string)[]

```





---- 

# 23. 한꺼번에 객체 생성하기
- 아이템 20 (다른 타입에는 다른 변수 사용하기) 에서 설명했듯이 변수의 값은 변경될 수 있지만, 타입스크립트의 타입은 일반적으로 변경되지 않습니다. 이러한 특성 덕분에 일부 자바스크립트 패턴을 타입스크립트로 모델링하는 게 쉬워집니다.
- 즉, 객체를 생성할 때는 속성을 하나씩 추가하기 보다는 여러 속성을 포함해서 한꺼번에 생성해야 타입 추론에 유리합니다. 

## 요약하면 아래와 같다

## 1) Object.assign 에 (이미 생성한 객체를 첫번째 변수로 넘기는 방식을 말함!! 새로운 객체는 상관 없음) 말고 전개 연산자 사용 하세요
```js
// 애러남
interface Point { x: number; y: number; }

const pt = {x: 3, y: 4};
const id = {name: 'Pythagoras'};

const namedPoint = {};

// [[ 이 단계에서는 애러 안남 ]]
Object.assign(namedPoint, pt, id);

// [[ 이 단계에서 애러 남 ]]
namedPoint.name;
        // ~~~~ Property 'name' does not exist on type '{}'
```

```js
// 애러 안남
interface Point { x: number; y: number; }

const pt = {x: 3, y: 4};
const id = {name: 'Pythagoras'};

const namedPoint = {...pt, ...id}; // 한꺼번에 객체 생성 했음!!!!!!!!!!
namedPoint.name;  // OK, type is string
```

## 객체 전개 연산자를 사용하면 타입 걱정 없이 필드 단위로(음,,, 그니까 쪼개서) 객체를 생성할수도 있습니다. 이때 모든 업데이트마다 새 변수를 사용하여 각각 새로운 타입을 얻도록 하는 것이 중요
```js
interface Point { x: number; y: number; }

const pt0 = {}; // 한번 쪼갬. => 타입은 {}
const pt1 = {...pt0, x: 3}; // 두번 쪼갬 => 타입은 {x: number}
const pt: Point = {...pt1, y: 4};  // OK // 이제 함침 => 타입은 Point (한번에 생성한 거나 다름 없음!!!!)
```

## 한번에 생성(객체 전개 연산자) 와 속성을 하나씩 추가 하는 방법(속성 추가나, Object.assign)의 큰 차이는 => 결국 변수에 값을 할당할 때 한번에 했냐? 가 중요한것!!

## 타입에 위와 같이 객체 전개 연산자로 조건부 속성 추가 하기
- 책에 있는 내용과 실제가 다름 
```js
declare let hasMiddle: boolean;
const firstLast = {first: 'Harry', last: 'Truman'};
const president = {...firstLast, ...(hasMiddle ? {middle: 'S'} : {})};

// 책에서는 아래가 애러 난다고 하는데, 실제는 다르다! 직접 해보자
// 실제는 president.middle 이 string | undefined 로 잘 옵셔널 필드로 나온다.
president.middle;
       // ~~~~~~ Property 'middle' does not exist on type
       //        '{ first: string; last: string; }'



```


--- 

# 24. 일관성 있는 별칭 사용하기 [좀더 디벨롬 해야 하는데...]

- 별칭? 아마도 객체의 값을 변수에 할당하는거
```js
const borough = {name: 'Brooklyn', location: [40.688, -73.979]};
const loc = borough.location;

// 참조값 변경
loc[1] = 1;


```
```js
// 이건 좀 이상함 

interface Coordinate {
  x: number;
  y: number;
}

interface BoundingBox {
  x: [number, number];
  y: [number, number];
}

interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox?: BoundingBox;
}
// HIDE
const polygon: Polygon = { exterior: [], holes: [] };
function calculatePolygonBbox(polygon: Polygon) {}
// END
const {bbox} = polygon;
if (!bbox) {
  calculatePolygonBbox(polygon);  // Fills in polygon.bbox
  // Now polygon.bbox and bbox refer to different values!
}

function fn(p: Polygon) { /* ... */ }

polygon.bbox  // Type is BoundingBox | undefined
if (polygon.bbox) {
  polygon.bbox  // Type is BoundingBox
  fn(polygon);
  polygon.bbox  // Type is still BoundingBox
}


```

---


# 25. 비동기 코드에는 콜백 대신 async 함수 사용하기 
- 그냥 일반적인 이야기

```js
// 실행순서와 코드 순서가 반대임.!!!
function fetchURL(url: string, cb: (response: string) => void) {
  cb(url);
}
const url1 = '1';
const url2 = '2';
const url3 = '3';
// END
fetchURL(url1, function(response1) {
  fetchURL(url2, function(response2) {
    fetchURL(url3, function(response3) {
      // ...
      console.log(1);
    });
    console.log(2);
  });
  console.log(3);
});
console.log(4);

// Logs:
// 4
// 3
// 2
// 1
```


## 콜백보다는 프로미스가 코드를 작성하기 쉽다
## 콜백보다는 프로미스가 타입을 추론하기 쉽다

## 프로미스보다 async/await 는 더 간결하고 직관적인 코드가된다
## 프로미스보다 async/await 는 async 는 항상 프로미스르 반환하도록 강제 된다
--- 


# 26. 타입 추론에 문맥이 어떻게 사용 되는지 이해하기
## 타입스크립트는 타입을 추론할 때 단순히 값만 고려하지는 않는다.  `문맥` 도 살핀다.(위에서는 처음 할단된 값을 가지고  `타입 넓히기` 를 한다고 했다.)
## 근데 문맥을 고려해 타입을 추론하면 가끔 이상한 결과가 나온다.
```js
// 애러가 난다
type Language = 'JavaScript' | 'TypeScript' | 'Python';
function setLanguage(language: Language) { /* ... */ }

setLanguage('JavaScript');  // OK

let language = 'JavaScript';
setLanguage(language);
         // ~~~~~~~~ Argument of type 'string' is not assignable
         //          to parameter of type 'Language'


// 이렇게 하면 좋다
type Language = 'JavaScript' | 'TypeScript' | 'Python';
function setLanguage(language: Language) { /* ... */ }
let language: Language = 'JavaScript';
setLanguage(language);  // OK

// 아니면 const를 쓰던지
const language = 'JavaScript';

```


## 튜플 사용시 주의점
```js
type Language = 'JavaScript' | 'TypeScript' | 'Python';
function setLanguage(language: Language) { /* ... */ }
// Parameter is a (latitude, longitude) pair.
function panTo(where: [number, number]) { /* ... */ }
  
// ------------

panTo([10, 20]);  // OK

const loc = [10, 20];
panTo(loc); // 애러


const loc: [number, number] = [10, 20];
panTo(loc);  // OK

// as const
function panTo(where: [number, number]) { /* ... */ }
const loc = [10, 20] as const;
panTo(loc); // 애러

// readonly
function panTo(where: readonly [number, number]) { /* ... */ }
const loc = [10, 20] as const;
panTo(loc);  // OK
```

## 객체 사용시 주의점 (똑같은 이야기)
- `as const` 를 사용하자 

```js
type Language = 'JavaScript' | 'TypeScript' | 'Python';
interface GovernedLanguage {
  language: Language;
  organization: string;
}

function complain(language: GovernedLanguage) { /* ... */ }

complain({ language: 'TypeScript', organization: 'Microsoft' });  // OK

const ts = {
  language: 'TypeScript', // 이게 string 으로 추론된다 => 결국 3장은 추론이야기
  organization: 'Microsoft',
};
complain(ts);
//       ~~ Argument of type '{ language: string; organization: string; }'
//            is not assignable to parameter of type 'GovernedLanguage'
//          Types of property 'language' are incompatible
//            Type 'string' is not assignable to type 'Language'


```

## 콜백 사용시 주의점
```js
function callWithRandomNumbers(fn: (n1: number, n2: number) => void) {
  fn(Math.random(), Math.random());
}

// ***** 이게 함수의 콜백 타입 선언에 따라, 콜백 함수가 추론 된다는게 신기함! *******
callWithRandomNumbers((a, b) => {
  a;  // Type is number
  b;  // Type is number
  console.log(a + b);
});

// 할당전에 fn 함수 선언시에 애러남
const fn = (a, b) => {
         // ~    Parameter 'a' implicitly has an 'any' type
         //    ~ Parameter 'b' implicitly has an 'any' type
  console.log(a + b);
}
callWithRandomNumbers(fn);

// 이렇게 fn 함수 선언할때, 매개변수에 타입선언 해야 함
const fn = (a: number, b: number) => {
  console.log(a + b);
}
callWithRandomNumbers(fn);
```


---

# 27. 함수형 기법과 라이브러리로 타입 흐름 유지하깅ㄴ