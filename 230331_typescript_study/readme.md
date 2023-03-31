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
## `변수에 타입을 명시 하지 않고 값을 할당 함으로서 변수를 초기화 할때, 타입체커는 지정된 단일 값을 가지고 ~~할당 가능한 값들의 집합을 유추~~ 해야 한다.`
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

## 추론 과정
```js
// 이렇게 let으로 지정하면 
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
### 객체의 경우 타입스크립트의 넓히기 알고리즘은 각 요소를 let으로 할당 된 것처럼 다룬다.
### 그래서 v 의 타입은 {x: number} 가 되고, 숫자로 재할당은 되지만, string으로는 안된다. 추가로 `객체는 다른 속성을 추가 할수도 없다.`

## 그래서 우리는 객체를 한번에 만들어야 한다. (한번에 할당 해야 한다(?) 아이템 23)

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
## 타입 좁히기는 타입스크립트가 넓은 타입으로 부터 좁은 타입으로 진행하는 과정을 말함
## 타입스크립트는 일반적으로 조건문에서 좁히기를 한다. => 단, 타입 별칭이 존재한다면 그러지 못할수도 있다. (아이템 24 - 일관성 있는 별칭 사용하기)
```js

// 1번 예시
const el = document.getElementById('foo'); // Type is HTMLElement | null
if (el) {
  el // Type is HTMLElement
  el.innerHTML = 'Party Time'.blink();
} else {
  el // Type is null
  alert('No element #foo');
}


// 2번 예시
const el = document.getElementById('foo'); // Type is HTMLElement | null
if (!el) throw new Error('Unable to find #foo');
el; // Now type is HTMLElement
el.innerHTML = 'Party Time'.blink();

// 3번 예시
function contains(text: string, search: string|RegExp) {
  if (search instanceof RegExp) {
    search  // Type is RegExp
    return !!search.exec(text);
  }
  search  // Type is string
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

## 타입을 좁히는 또다른 방법은 명시적 태를 뭍이는것 (태그된 유니온 / 구별된 유니온)
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
).filter(who => who !== undefined);  // Type is (string | undefined)[]
```

- 위 예시에서 filter 메서드가 타입 추론을 정확히 안해 주므로 타입 가드를 쓰라고 나온다. 
```js
const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];

// 콜백을 이걸로 넣으라는 이야기
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

const members = ['Janet', 'Michael'].map(
  who => jackson5.find(n => n === who)
).filter(isDefined);  // Type is string[]
```
- 음... 결과적으로 같은 이야기 인데, 이게 왜그러냐 하면 filter 의 타입 정의를 보면 아래와 같은데, 
```js
// lib.es5.d.ts
    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
```
- filter 콜백이 타입가드 형식이 아닌경우에는 두번째 함수 타입이, 
- 콜백이 타입가드 형식인 경우에는 첫번째 함수 티입이 적용 되기 때문이다. 
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
- 즉, 객체를 생성할 때는 속성을 하나씩 추가하기 보다는 여러 속성을 포함해서 한꺼번에 생성해야 타입 추론에 유리합ㄴ디ㅏ. 

## Object.assign 에 (이미 생성한 객체를 첫번째 변수로 넘기는 방식을 말함!! 새로운 객체는 상관 없음) 말고 전개 연산자 사용 하세요
```js
// 애러남
interface Point { x: number; y: number; }

const pt = {x: 3, y: 4};
const id = {name: 'Pythagoras'};

const namedPoint = {};
Object.assign(namedPoint, pt, id);
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

## 한번에 생성(객체 전개 연산자) 와 속성을 하나씩 추가 하는 방법(속성 추가나, Object.assign)의 큰 차이는 => 결국 변수에 값을 할당할때 한번에 했냐? 가 중요한것!!

## 타입에 위와 같이 객체 전개 연산자로 조건부 속성 추가 하기
- 책에 있는 내용과 실제가 다름 

--- 

# 24. 일관성 있는 별칭 사용하기

---


# 25. 비동기 코드에는 콜백 대신 async 함수 사용하기 


--- 


# 26. 타입 추론에 문맥이 어떻게 사용 되는지 이해하기


---

# 27. 함수형 기법과 라이브러리로 타입 흐름 유지하깅ㄴ