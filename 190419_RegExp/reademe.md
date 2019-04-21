# [업무관련] 정규 표현식을 이용하여 두개의 객체 합치기 
```js
const messagesLocal = {
    'property.error.message.phone': '폰번호가 이상하다.',
    'property.error.message.name': '이름이 이상하다',
    'property.error.message.what': '뭐?',
}

const messagesServer = {
    'lm.property.error.message.phone': '핸드폰이 이상하다.',
    'lm.property.error.message.name': '이름이 이상하다',
}
```

- 로컬에 있는 메시지 객체를, 서버에서 받아온 객체로 Object.assign() 시킨다. 

## process
1. messagesServer에서 key에서 prefix를 제외시킨다.(예제에서의 'lm');
2. key에서 prefix를 제외시킨 객체를 messagesLocal과 merge 시킨다. 