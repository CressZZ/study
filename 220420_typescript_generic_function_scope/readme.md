```ts
declare function provides<T>(key: T | string | number, value: T): void;

provides((): string | number=>'a',() : number=> 3);
provides(() : number=> 3, (): string | number=>'a');
```

`provides` 함수가 위와 같이 정의 되어 있다고 하자. 
제네릭 T 를 사용하는데, 잘보면 제네릭을 받는 곳이 두군데 이다. 
`key` 와 `value` 에서 T를 받는다. 

그럼 누가 우선일까?

더 범위가 넓은아이가 우선이다. 

첫번째와 두번째 보두 T 는 `()=>string | number` 로 정의 되기 때문에 두번째로 받은 T 인 `()=>number` 를 포용한다. 즉, 애러가 없다. 

이걸, void 합수함수와 연관해서 생각하면

```ts
export declare function provide<T>(key: T | string | number, value: T): void;

provide(()=>{}, () => 'a'); // 이것도 성립하고
provide(()=>'a', ()={}) // 이것도 성립한다

```

`()=>void` 는 `()=>string` 을 포용하기 때문이다 

겁나 어렵네 진짜