# 개요
gtm.js 에서 `documnet` 에 두개의 이벤트를 거는데, 
`click` 이벤트와 `linkClick` 이 바로 그것이다. 

# stopPropagation() 을 쓰면 `linkClick` 이 안먹는다. 
예를 들어
```js
$('a').on('click', (e)=>{
	e.stopPropagation();
	console.log('a');
})

```

라고 하면 클릭 이벤트는 버블이다. 그치?
`a` 클릭을 하면 버블이 되어서 `document` 까지 가야 하는데 못간다. 

`document` 에 `click` 이벤트와 `linkClick` 가 걸려있고, 
이벤트 트리거 되면 `GA` 에 이벤트 트리거 됬다고 전송해야 하는데
될수가 없다

거지 같다

함부로 a 태그에 stopPropagation 을 쓰지 말아야 하는건가?
확실히 모름