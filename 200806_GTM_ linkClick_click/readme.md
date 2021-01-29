x# 참고
https://www.simoahava.com/gtm-tips/fix-problems-with-gtm-listeners/
https://www.simoahava.com/analytics/capturing-the-correct-element-in-google-tag-manager/

https://ko.javascript.info/bubbling-and-capturing
https://ko.javascript.info/event-delegation

# 실제로 알고싶은거 요약
그래서 클릭이벤트가 안먹는 경우가 있다. 
.title, .title *
이렇게 클릭 클레스를 잡으면 된다. 

# 개요
gtm.js 에서 `documnet` 에 두개의 이벤트를 거는데, 
`click` 이벤트와 `linkClick` 이 바로 그것이다. 
 
The All Elements trigger uses the capture phase of the event path. The Just Links trigger, as well as pretty much all other GTM triggers, utilize the bubble phase
모든 클릭은 캡처링을 쓰고, 링크만 클릭은 버블링을 쓴다. 

The Just Links trigger captures the link element (<a/>) that is the nearest wrapping link of the clicked element.

The All Elements trigger captures the clicked element itself.

# 정리
각종 문서를 보며 정리한것
## click
capturing 을 사용하며 html에 이벤트를 걸고 이벤트 위임을 해준다.(https://ko.javascript.info/event-delegation) 그리고 event.target으로 이벤트 발생 요소를 찾는다. 

## linkClick
bubbling 을 사용하며  html에 이벤트를 걸고 이벤트 위임을 해주는데 이때 event.target.closest('a') 또는  event.target.closest('{{ 내가 gtag 설정에서 지정한 css 선택자 요소 }}') 를 잡는다. 

## 헬갈리는거
### 이벤트 위임
#### 바닐라 JS에서 
```js
table.onclick = function(event) {
  let target = event.target; // 클릭이 어디서 발생했을까요?

  if (target.tagName != 'TD') return; // TD에서 발생한 게 아니라면 아무 작업도 하지 않습니다,

  highlight(target); // 강조 함
};
```

#### jquery에서 
```js
document.on('click', 'TD', function(e){
	console.log(e.target)
	console.log(e.currentTarget);
})
```

`jquery` 에서 `e.currentTarget` 이 'TD' 로 나온다. (여기서 e는 juqury.event 이다. )
진짜 currentTarget 을 보려면 e.originalEvent.currentTaget으로 보거나
event.delegateTarget 를 보자 (https://api.jquery.com/event.delegateTarget/)

### GTM에서 이벤트 위임
당연히 바닐라는 쓸것이고,
모든 클릭의 경우 아래가 될거고
```js
document.addEventListener('click', function(event) {
  let target = event.target; // 클릭이 어디서 발생했을까요?

  if (target.tagName != 'TD') return; // TD에서 발생한 게 아니라면 아무 작업도 하지 않습니다,

 window.dataLayer.push({ 'event': 'gtm.click', ...});
}, true)  // 캡처링 
```
링크 클릭의 경우 아래와 같이 될것이다. 

```js
document.addEventListener('click', function(event) {
  let target = event.target; // 클릭이 어디서 발생했을까요?
  let a = event.target.closest('a'); // (1)
  if (!a) return; // TD에서 발생한 게 아니라면 아무 작업도 하지 않습니다,
  if (!document.contains(a)) return; 

 window.dataLayer.push({ 'event': 'gtm.linkClick', ... });
}, false)  // 버블링 
```
# stopPropagation() 을 쓰면 `linkClick` 이 안먹는다. 
예를 들어
```js
$('a').on('click', (e)=>{
	e.stopPropagation();
	console.log('a');
})

```

# 결론
## gtm.click 의 경우
캡처링이니까 클릭 이벤트의 타겟이 맨밑에 있는 에가 아니면 영역이 애매 해진다. 
왜냐 하면 캡처링의 타켓은 항상 맨밑에 있는 애가 잡히기 때문이다. 
=> 아니지 캡처링이니니까 맨 위에 있는애 아닌가???
캡처링이니까 맨 위에 있는에다

내가 지금 햇갈리는게 뭐냐 하면, 모든 클릭인경우에 html에 이벤트 위임을 걸고, closet을 사용안하고 그냥 event.target 으로 찾고 있어서 그런거 아닌가?

## gtm.linkClick 의 경우
버블이긴한데, 이벤트 위임으로서 버블이니까
버블이니까 다른코드에서 stopPropagation이 적용되면 안된다.


# 이벤트 위임 테스트한 코드
```js

var classString = '.test4'

$('.introduce').eq(0).addClass(classString.replace('.',''));

// jQuery - Event
$(classString).on('click',(e)=>{
	console.log('jQuery : test4.onClick', {'e.target':e.target, 'e.currentTarget': e.currentTarget, 'e.delegateTarget': e.delegateTarget, 'e.originalEvent.currentTarget': e.originalEvent.currentTargeet});
})

// jQuery - Event Delegation
$(document).on('click',classString, (e)=>{
	console.log('jQuery : document.test4.onClick', {'e.target':e.target, 'e.currentTarget': e.currentTarget, 'e.delegateTarget': e.delegateTarget, 'e.originalEvent.currentTarget': e.originalEvent.currentTarget, e}, e.isTrigger );
	console.log(e.originalEvent);
	console.log(e.originalEvent.currentTarget)
	let es = Object.assign({}, e.originalEvent);
	console.log(es)
})

// Vanila - Event
document.querySelector(classString).addEventListener('click',(e)=>{
	console.log('Vanila : test4.addEventListener.Click', {'e.target':e.target, 'e.currentTarget': e.currentTarget, 'e.delegateTarget': e.delegateTarget});
})

// Vanila - Event Delegation
document.addEventListener('click', (e)=>{
	// console.log(e.target);
	if(e.target.className.indexOf(classString.replace('.','')) > -1){
		console.log('Vanila : document.addEventListener.Click', {'e.target':e.target, 'e.currentTarget': e.currentTarget, 'e.delegateTarget': e.delegateTarget})
	}
})

// stopPropagation
$(classString).on('click', (e)=>{
	e.stopPropagation();
})

$('body').on('click',classString, (e)=>{
	e.stopPropagation();
})

document.body.addEventListener('click', (e)=>{
	if(e.target.className.indexOf(classString.replace('.','')) > -1){
		e.stopPropagation();
	}
})


```



###  
라고 하면 클릭 이벤트는 버블이다. 그치?
`a` 클릭을 하면 버블이 되어서 `document` 까지 가야 하는데 못간다. 

`document` 에 `click` 이벤트와 `linkClick` 가 걸려있고, 
이벤트 트리거 되면 `GA` 에 이벤트 트리거 됬다고 전송해야 하는데
될수가 없다

거지 같다

함부로 a 태그에 stopPropagation 을 쓰지 말아야 하는건가?
확실히 모름
