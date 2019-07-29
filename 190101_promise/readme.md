# promise를 정의 하는 문장들?
- `promise로` 감싸여고 있는 `Response를` 반환 합니다.  [https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Fetch%EC%9D%98_%EC%82%AC%EC%9A%A9%EB%B2%95]
    - `Reponse가` `promise로` 감싸여 졌지만, `promise가` `resolve된건지`, `reject된건지` 모른다. 
-  `onFulfilled` 또는 `onRejected` 콜백 함수가 리턴하는 값은 자동으로 `resolved promise`로 `wrapping` 되기 때문에 [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#then_%EB%A9%94%EC%84%9C%EB%93%9C_%EC%82%AC%EC%9A%A9]
    - `리턴된 값`은 `promise로` 감싸여 졌고, `promise는` `resolved된` 거다. 

- Promise that resolves to a Response.[https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith]
    - `response로` `resolve될수` 있는 `promise`
- promise which is fulfilled
    - 이행된 프로미스 => `resolve` 된 `promise`
- The promise resolves to the Response object
    - 그 프로미스는  `response 객체로` `resolve` 된다.

# fulfill VS resolve
- promise가 fulfill(이행)되면 resolve 된다. 
- promise가 fulfill(이행)되면 특정 값(수행 값)을 resolve 함수로 실행한다. 
- Promise가 fulfill(이행)되어 특정값을 resolve 하였다.(되었다?)
- promise resolves to the somthing



# Promise chain

> When you return something from a then() callback, it's a bit magic. If you return a value, the next then() is called with that value. However, if you return something promise-like, the next then() waits on it, and is only called when that promise settles (succeeds/fails).[https://stackoverflow.com/questions/34094806/return-from-a-promise-then]

