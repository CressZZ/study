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
	console.log(e) //
	console.log(e.originalEvent); // MouseEvent => 를 열어보면 => e.originalEvent.currentTarget = null 로 나온다.
	console.log(e.originalEvent.currentTarget) // #document
	let es = Object.assign({}, e.originalEvent); 
	console.log(es) // {isTrusted: true}
 })

 ```

 # 왜  e.originalEvent.currentTarget = null 로 나오는가
 e.originalEvent 의 프로퍼티는 거의다 getter 이다. 
 그러니까 콘솔에서 객체를 펼쳤을때의 환경에서 정보를 보여줘서 null이 나온다. 

 # 왜 let es = Object.assign({}, e.originalEvent); 는 {isTrusted: true} 인가
 Object.assign 을 하면 getter 도 복사 된다 
 그러니까 e.originalEvent의 다른 내용도 복사 되어야 할거 같지만 사실 e.originalEvent안에 있는 대부분의 getter 는 MouseEvent 객체에서 상송 받은 것이다. (위의 예시에서 MouseEvent 라는 것임. 상속은 prototype으로 받았다.)
  Object.assign 은 prototype의 내용은 복사하지 않는다

```js
function Test(){
    a: 'a'
}

Test.prototype.b='b';

var test = new Test();
test.c = 'c'

Object.defineProperty(test, "d", { get: function () { return 'd'; }, enumerable: true, configurable: true },   ); //enumerable 을 true 로 해줘야 Object.assign 할때 잘 들어간다.

var test2 = Object.assign({}, test);

console.log(test2) // {c='c', d='d'}


```
  