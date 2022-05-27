# no-prototype-builtins

https://eslint.org/docs/rules/no-prototype-builtins

eslint 의 recommended 에 이런게 있는데, 이게 간단히 말하면 
```js
const obj = {a: 1}

obj.hasWonProperty('a'); // 이건 쓰지 말고, 

Object.prototype.hasWonProperty(obj, 'a') // 이걸 쓰라는 건데
```

설명에 따르면 악의적인 클라이언트가 서버에 request 보낼때, 
```js

obj.hasWonPropery = ()=>true

```
로 변환시켜 버린 애를 서버에서 보내버리면, 서버에서 체크할때 무조건 true 가 나온다는 것이다. 
음 일단 예시에는 서버 입장에서 obj 체크 할때, 첫번째거 말고 두번째거 쓰라는 거다. 
클라이언트가 서버에 있는 전역 Object 의 prototype 을 조작 할수는 없으니까. 

그렇다느 ㄴ이야기 





