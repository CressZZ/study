https://github.com/axios/axios/issues/736

# axios [Delete] 의 resource는 param으로 전송하라.
If you want to make a axios.delete, that's exactly what you have to do.

You don't use 

```js
axios.delete(URL, {
    data: { foo: 'bar' } //Only applicable for request methods 'PUT', 'POST', and 'PATCH'
})
```

for a delete request, you will use 

```js
axios.delete(URL, {
    params: { foo: 'bar' }
})
```

You will send data as the request body ONLY WHEN you are using `PUT`, `POST`, and `PATCH`.

I'm afraid you're using axios.delete just like a axios.post or (axios.put or axios.patch). When using axios.delete, you'll send an id to a server, and the server itself will find a resource that matches that given id, only then it will be removed (or trigger some action, but the request is mapped as a http delete).

By using 
```js
axios.delete(URL, {
    data: { foo: 'bar' }
}) 
```
you're sending a resource, which makes no sense at all.

Take a look at the links below, you will have a better understanding:


# application/x-www-form-urlencoded, multipart/form-data, text/plain, JSON
- POST등으로 data를 서버로 보낼때 request의 body 타입은 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`, `JSON` 등 여러가기가 있다. 
- 모두 `form` 태그로 전송할 수 있고, `form`태그의 `enctype` 속성값을 바꿈으로서 지정할 수 있다. 

```html
<form action="/action_page_binary.asp" method="post" enctype="multipart/form-data">
  First name: <input type="text" name="fname"><br>
  Last name: <input type="text" name="lname"><br>
  <input type="submit" value="Submit">
</form>
```
## 1) application/x-www-form-urlencoded
-  `&`으로 분리되고, `=` 기호로 값과 키를 연결하는 key-value tuple로 인코딩되는 값입니다
- browser의 `window.URLSearchParams`를 사용하여 동적으로 스크립트로 지정할 수 도 있다. (form tag 이용하는거 말고)

```js
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

- node의 `querystring`모듈로 사용할 수도 있다. 
```js
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
``` 

## 2) multipart/form-data
- each value is sent as a block of data ("body part"), with a user agent-defined delimiter ("boundary") separating each part. The keys are given in the Content-Disposition header of each part.
- (번역) 각 값은 데이터 블록 ("본문 부분")으로 전송되며 사용자 에이전트 정의 구분 기호 ("경계")는 각 부분을 구분합니다. 키는 각 부분의 Content-Disposition 헤더에 제공됩니다
- `new FormData()` 를 사용 한다. 
```js
var formData = new FormData(); // Currently empty
formData.append('username', 'Chris');
```

- file을 올릴때

```js
var form = $('form')[0]; // You need to use standard javascript object here
var formData = new FormData(form);

// or 
var formData = new FormData();
formData.append('section', 'general');
formData.append('action', 'previewImg');
// Attach file
formData.append('image', $('input[type=file]')[0].files[0]); 
```