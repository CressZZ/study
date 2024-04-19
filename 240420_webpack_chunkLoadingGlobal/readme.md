# webpack 은 정적 모듈 즉, 그냥 번들링 된 파일은 아래와 같은 런타임 코드를 가지고 있다. 
```js
/ no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebpack_test3"] = self["webpackChunkwebpack_test3"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
```

# 그리고 동적으로 임포팅 되어야 하는 동적 임포트 청크 파일은 아래와 같은 런ㄹ타임 코드를 가진체 빌드 된다. 
```js
(self["webpackChunk"] = self["webpackChunk"] || []).push([[15123],{
  12314: ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


```

# 정리하면, 
- 동적 임포트 되는 모둘은 `webpackChunk` 라는 전역 변수 안에, 자기의 모듈을 push 하는데, 
- 이때, 정적 모듈은 아래 코드처럼 push메서드를 재 정의 함으로서, 이미 가지고 있는 모듈은 다시 모듈로 가지고 있지 않게 한다. 
- webpackChunk 에 푸쉬는 되지만, 웹팩 런타임내에서 `__webpack_require__.m[moduleId] = moreModules[moduleId];` 이렇게 module 에 할당이 안된다는 이야기
- `chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));`

# 문제가 발생하는건, 
- A.js 와 B.js 라는 파일이 있고, 이 두개가 다른 프로젝트에서 별도로 빌드된 파일이라고 했을때, 
- A.js 가 A-a.js 를 동적으로 임포트 하고, 이후에 B.js 가 정적으로 로드 되고, B.js 안에서 B-b.js 를 동적으로 임포트 하는데, 
- A-a.js 에 '123' 이라는 모듈을 가지고 있다면, 전역 `webpackChunk` 에 모듈 정보를 넣고, A.js 에 있는 모듈 런타임 코드를 이용해서, 잘 사용 할텐데, 
- B.js 가 만약 '123' 이라는 모듈을 사용해야 하는데, 모듈 ID만 같고 사실 A-a.js 의 123 모듈과 다른 모듈 이라면, 
- 그래도 B.js 는 먼저 아래의 코드가 돌면서 webpackChunk에 123이 있는지 확인하고
`chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));`
- 123 이 있으면 그걸 가져다 쓸텐데, 그럼 애러가 난다. 

# 아진짜 단순화 했는데, 좀 복잡하고 찾는데 오래 걸렸음. 진짜임

# 결론
- 결론은 output.chunkLoadingGlobal 설정으로 전역 변수 이름을 `webpackChunk` 에서 다른걸로 바꾸거나, 
- output.uniqueName 설정을 바꾸자 -> chunkLoadingGlobal 이름을 바꿔줌

# 참고
- 찾아도 관련 내용이 많이 안나오고. 
- 여튼 특이 케이스이긴 함
