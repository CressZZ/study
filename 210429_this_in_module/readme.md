# 참고
https://stackoverflow.com/questions/22770299/meaning-of-this-in-node-js-modules-and-functions

# TL;DR
- In the top-level code in a Node module, this is equivalent to module.exports. That's the empty object you see.
- 노드 모듈에서 최상위에 있는 this 는 export 되는 객체를 의미한다. 
- ESModule 이든 CommonJS 든 상관 없이.

# 이슈
- 아래의 코드가 문제 없이 동작하길래 왜? 그럴까..
```js
/* util.js */

export function getParamObjWithoutException(){
	return this.getParamObj(); // this를 써도 동작한다.
	return this._getParamObj(); // 동작 하지 않는다.
}

export function getParamObj(){
	return true;
}

function _getParamObj(){
	return true;
}
```

# 디테일
- When JavaScript files are required as Node modules, the Node engine runs the module code inside of a wrapper function. That module-wrapping function is invoked with a this set to module.exports. (Recall, above, a function may be run with an abitrary this value.)
- 자바스크립트가 Node module 을 import 할때, 노드 엔진은 모듈 코드를 wrpper 함수안에 넣는다. 이때 wrapper 함수는 this에 module.exports(export 되는 객체)를 참조하게 만든다. 
- 즉, 노드엔진이 this를 정의 하는것.

# 추가로 다시 상기해야 하는 이야기
- When you use this inside of a function, the value of this is determined anew before each and every execution of the function, and its value is determined by how the function is executed. **This means that two invocations of the exact same function object could have different this values if the invocation mechanisms are different (e.g. aFunction() vs. aFunction.call(newThis) vs. emitter.addEventListener("someEvent", aFunction);, etc.)** In your case, aFunction() in non-strict mode runs the function with this set to the global object.
- 함수에서 사용되는 this는 호출방식에 따라 다르게 설정된다. 

# 결론
- 아무튼 의미없이 this를 쓰는건 좋지 않으니 그냥 아래처럼 바꾸자
```js
/* util.js */

export function getParamObjWithoutException(){
	return getParamObj(); // 동작한다.
	return _getParamObj(); // 동작한다.
}

export function getParamObj(){
	return true;
}

function _getParamObj(){
	return true;
}
```