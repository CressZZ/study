
https://ko.javascript.info/event-delegation
```js
// 바닐라 이벤트 위임
table.onclick = function(event) {
	// elem.closest(selector) 메서드는 elem의 상위 요소 중 selector와 일치하는 가장 근접한 조상 요소를 반환합니다. 위 코드에선 이벤트가 발생한 요소부터 시작해 위로 올라가며 가장 가까운 <td> 요소를 찾습니다.	
  	let td = event.target.closest('td'); 

	// event.target이 <td>안에 있지 않으면 그 즉시 null을 반환하므로 아무 작업도 일어나지 않습니다.
	if (!td) return; 
	 
	 // 중첩 테이블이 있는 경우 event.target은 현재 테이블 바깥에 있는 <td>가 될 수도 있습니다. 이런 경우를 처리하기 위해 <td>가 팔괘도 안에 있는지를 확인합니다.
	if (!table.contains(td)) return;

	// 이제 진짜 td를 강조해 줍니다.
	highlight(td); 
};

```

```js
var classString = '.test4'

$('#container').eq(0).addClass(classString.replace('.',''));

// jQuery - Event
$(classString).on('click',(e)=>{
	console.log('jQuery : test4.onClick', {
		'e.target':e.target, 
		'e.currentTarget': e.currentTarget, 
		'e.delegateTarget': e.delegateTarget, 
		'e.originalEvent.currentTarget': e.originalEvent.currentTarget,
		'e.originalEvent': e.originalEvent
	});
})

// jQuery - Event Delegation
$(document).on('click',classString, (e)=>{
	console.log('jQuery : document.test4.onClick', {
		'e.target':e.target, 
		'e.currentTarget': e.currentTarget, 
		'e.delegateTarget': e.delegateTarget, 
		'e.originalEvent.currentTarget': e.originalEvent.currentTarget, 
		'e': e,
		'e.originalEvent': e.originalEvent, 
	}, e.isTrigger );
	// console.log(e) //
	// console.log(e.originalEvent); // MouseEvent => 를 열어보면 => e.originalEvent.currentTarget = null 로 나온다.
	// console.log(e.originalEvent.currentTarget) // #document
	// let es = Object.assign({}, e.originalEvent); 
	// console.log(es) // {isTrusted: true}
 })

document.querySelector('.test4').addEventListener('click', (e)=>{
	console.log('Vanila javascript', {
		'e.target':e.target, 
		'e.currentTarget': e.currentTarget, 
		'e': e,
	}, e.isTrigger );

})


 ```

 # 왜  e.originalEvent 의 콘솔로그값으로 리턴된 객체를 열어 currentTarget을 보면 null 로 나오는가
 https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
 The value of event.currentTarget is only available while the event is being handled. If you console.log() the event object, storing it in a variable, and then look for the currentTarget key in the console, its value will be null. Instead, you can either directly console.log(event.currentTarget) to be able to view it in the console or use the debugger statement, which will pause the execution of your code thus showing you the value of event.currentTarget.

 # 왜 let es = Object.assign({}, e.originalEvent);의 결과는 달랑 {isTrusted: true} 하나 인가
 Object.assign 을 하면 getter 도 복사 된다 
 그러니까 e.originalEvent의 다른 내용도 복사 되어야 할거 같지만 사실 e.originalEvent안에 있는 대부분의 getter 는 MouseEvent 객체에서 상송 받은 것이다. (위의 예시에서 MouseEvent 라는 것임. 상속은 prototype으로 받았다.)
  Object.assign 은 prototype의 내용은 복사하지 않는다 (프로토타입 체인의 속성과 열거 불가형 속성은 복사 불가 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

```js
function Test(){
    a: 'a'
}

Test.prototype.b='b'; // Object.assign 은 prototype의 내용은 복사하지 않는다

var test = new Test();
test.c = 'c'

Object.defineProperty(test, "d", { get: function () { return 'd'; }, enumerable: true, configurable: true },   ); //enumerable 을 true 로 해줘야 Object.assign 할때 잘 들어간다. // Object.assign() 메소드는 열거할 수 있는 출처 객체의 속성만 대상 객체로 복사합니다. (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

var test2 = Object.assign({}, test);

console.log(test2) // {c='c', d='d'}

```
  

# CurrentTarget 에 대한 내용

기본적으로 CurrentTarget 은 이벤트가 바인딩된 노드 객체! 라고 생각하고 들어가자. 
Target은 실제로 이벤트가 발생된 노드 객체이다. (캡처링, 버블링 으로 인하여 실제로 이벤트가 걸려있는 곳과, 이벤트가 발생한곳은 다를 수 있다.)

## 이벤트 위임시에 jquery에서 e.currentTaget 에 대해
이게 햇갈린다. 잘 보면
일단 아래의 코드처럼 html에 위임을 했다고 생각해보자
```js
$(document).on('click','.test4', (e)=>{
	// ~~
}
```

이때 당연하게 생각하면 e.CurrentTarget(jquery event 객체의 CurrentTarget) 가 document 여야 할거 같은데, 
.test4 가 된다. 그리고, e.originalEvent.currentTarget 이 document 가 된다. 
그냥 jquery 가 좀 알아 보기 쉽게 바꾼거 같다. 
결국 jquery 입장에서는 document에 이벤트 위임을 했다고 보지 않고 그냥 .test4에 이벤트를 건 것 처럼 보이게 하는 것이 목적일지도 모른다. 


  