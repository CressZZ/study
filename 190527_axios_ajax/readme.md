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
- `POST등`으로 data를 서버로 보낼때 request의 body 타입은 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`, `JSON` 등 여러가기가 있다. 
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

# 좀 복잡하지만, encoding에 관해서...
`일단 확실하지 않은 내용 들이다.`  
`아무리 찾아도 확실한 정보가 안나온다. xx 누가 좀 확실히 알려줘.`  

요약 하자면.
1. Chrome은 get방식 요청 일때 자동으로 요청 url을 encoding(혹은 escape, percentEncoding, encodeURIComponent)를 실행한다. 
    - 단, encoding이 한번 되어 있는 경우라면, 두번 인코딩 하지 않는다. (**개중요**, 근데 뭐 확실하게 나와있는 문서가 없어 ㅅㅂ)
2. IE는 하지 않는다. 
3. jquery ajax 및 Axios를 사용할때
    - get 요청이며
    - data (axios인 경우 params) 옵션을 사용하여 query를 지정해주면
    - 자동으로 query를 encoding(혹은 escape, percentEncoding, encodeURIComponent)하여 보낸다. 
4. jquery ajax 및 Axios를 사용할때
    - data (axios인 경우 params) 옵션을 사용하지 않고
    - url에 직접 넣어줄 경우 (url: https://test.com?test=테스트) 해당 query 는 인코딩 되지 않는다. 
    - 단 크롬의 경우는 인코딩 된다. (앞의 1.번 사항과 동일한 경우로 판단된다.)
5. Post 방식인 경우!
    - 귀찮아서 아직 테스트 안해봤는데 그냥 인코딩 안되지 않을까? 
    - 서버에서 해달라고 하면 해줘야 겠다. 
6. 여담이지만 Axios에서는 post의 기본 contet-type은 json으로서 
    - 만약 서버에서 Content-Type: application/x-www-form-urlencoded 로 요청 할경우
    - Content-Type을 application/x-www-form-urlencoded 변경하고
    - data 옵션을 querystring module등을 통하여 변환 해줘야 한다. 
    - application/x-www-form-urlencoded 이란 아래와 같다. 
        - &으로 분리되고, "=" 기호로 값과 키를 연결하는 key-value tuple로 인코딩되는 값입니다. 영어 알파벳이 아닌 문자들은 percent encoded 으로 인코딩됩니다. 따라서, 이 content type은 바이너리 데이터에 사용하기에는 적절치 않습니다
7. 마찬가지로 여담이지만 jquery ajax에서는 post의 기본 contet-type은 application/x-www-form-urlencoded 이며 
    - data에 object를 주면 자동으로 $.param 을 사용하여 querystring형식으로 변환 한다. 

8. Axios에서   
    - get 방식 요청인 경우 param을 넘겨주기 위한 옵션 키 값은 params이며
    - post 방식 요청인 경우 data를 넘겨주기 위한 옵션 키 값은 data 이다. 
9. jquery ajax에서 
    - get 방식 요청인 경우 param을 넘겨주기 위한 옵션 키 값은 data 이며
    - post 방식 요청인 경우 data를 넘겨주기 위한 옵션 키 값도 data 이다. 

10. jquery ajax에서 옵션값중 하나인 traditional은 
    - get이든 post이든 querystring 형식으로 데이터를 보낼때 그 데이터가 배열일 경우 어떤식으로 보낼지 결정해주는 옵션 값이다. 
    ```javascript
        //The traditional property changes the way how parameters are sent to the server. As of jQuery 1.8, it is defaulted to false.

        $.ajax(url, {
            data : { a : [1,2,3] },
            traditional : true
        }));
        // traditional was set to true the data would be sent as "a=1&a=2&a=3" 
        // If traditional was set to false the data would be sent as a%5B%5D=1&a%5B%5D=2&a%5B%5D=3
        // %5B%5D는 아마도 [] 이다. 
    ```
11. Axios에서 10번의 역할을 해주려면 qs module의 아래의 기능을 사용한다. (https://www.npmjs.com/package/qs)
    -  return Qs.stringify(params, {arrayFormat: 'brackets'})
12. search모듈에서 인코딩 문제가 발생했던건, jquery ajax를 사용하고 있으면서, querystring을 util에서 설정해서 url에 박아 버리고, data 옵션 없이 url을 ajax로 호출 했기 때문이다. 
    - 이러면 크롬은 queyrstring을 인코딩 하는데
    - ie는 하지 않는다. 
    - 그러니까 한번 인코딩이 된 querystring을 넘겨줘야 한다. 
    - 크롬의 경우도 encoding이 한번 되어 있는 경우라면, 두번 인코딩 하지 않기 때문이다. (**다시중요**, 근데 뭐 확실하게 나와있는 문서가 없어 ㅅㅂ) 
    - 근데 search모듈에서는 인코딩을 두번 해버린 것이다. 
    - 아 헷갈려! 몰라. 
13. 우리회사는 주소창에 percent encoding 되지 않은 문자가 들어가면 404 bad request가 떨어진다. 
    - IE에서 한글 쿼리 스트링을 넣어 보면 안다. 
    - 아마 서버 앞단에서 막았겠지 뭐


## 참고
https://stackoverflow.com/questions/23559077/jquery-ajax-encodeuricomponent-not-working-encodeuri-does  
https://blog.goodkiss.co.kr/entry/jQuery-ajax-사용시-Parameter-처리방법-주의점URLSearchParams  
https://stackoverflow.com/questions/41953681/url-encode-in-ajax-call  
https://stackoverflow.com/questions/5263708/jquery-ajax-encoding-data



# 추가 이슈인 가이드북 이슈를 보자. 
- 가이드 북은 view 페이지와 list 페이지로 나뉘고, 
- 각 keyword(검색어) 대해 view 페이지는 queyrstring(?) 을사용하며, 
- list 페이지는 SPA로서 hash(#)를 사용한다. 
## 이슈가 발생한 상황
- view페이지의 태그검색어(하단에 태그들의 나열)을 누르면(a 태그로 되어 있는 링크 버튼이다. keyword를 해쉬태그로 가지고 list페이지로 이동한다. ) 누른 태그를 keyword 로하는 list 페이지로 이동해야 하는데, 이상하게 IE에서만 애러가 발생했다. 
- 위의 링크는 스크립트 파일에서 강제로 **encoding 처리**가 되어 있었다. 
- 그럼 상식적으로 encoding 된것이 url에 밖힌거니까(ajax를 사용하지 않았다, data (axios인 경우 params)를 사용 하지 않았다). 아무튼 IE에서든, 크롬에서는 잘되야 하는게 맞는데, IE에서만 안됬다. 
- 왜냐하면 list 페이지에서 list를 뿌려줄때 해쉬태그로 가져온 keyword를 ajax를 통해 서버로 get방식으로 보내야 하는데, 이때 IE 경우에는 keyworkd를 강제로 **인코딩**을 한번 더해서 보냈기 때문이다. 
- 인코딩을 한번 더해서 보낸 이유는 아마도, 검색어 인풋에 직접 입력하는 경우 (위에처럼 링크를 타고온 경우가 아니라)에는 한글이 직접 주소창 hash태그로 가는거 같고, 이걸로 get방식 url을 직접 입력하는 방식으로 ajax를 하려면 인코딩을 했어야 한다. 물론 ajax를 사용하였다면 즉, data (axios인 경우 params)를 사용 했다면, 그 라이브러리에서(aixos, jquery) 에서 필요에 따라 알아서 변환 해줬을 것이다. 아무튼..
- 위의 경우에서도 IE인 경우 2번 단락과, 4번단락에서 인코딩을 두번 해줬기 때문이다. 



# 추가 - Fetch 의 경우 참조 : / POST / application/x-www-form-urlencoded / 
```js
let data = {
	phoneType: 1,
	phoneNumber: '01011111111',
	mainContentsContentAlias: 'smsresend-210421'
}
let params = new URLSearchParams();

for (let key in data) {
  if (data.hasOwnProperty(key)) {
    params.set(key, data[key])
  }
}

try{
	var a = await fetch('http://rc-lineage2m.plaync.com/preorder/smsresend/resend', {
		method:'post', 
		body: params,
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json'
		}
	})
	var result = await a.json();
	console.log('re', result)
}catch(err){
	console.log('err', err);
}



```

# IE9 포함 그 이하는 axios 안된다. 
https://github.com/axios/axios/issues/265
Thanks for logging this issue, however, I think this is now stale. I am going to close this for now as IE9 has lost official support since March 31, 2017.

Json 파일 가져 오려는데 data가 undefined 로 들어와서 찾아보니 9이하는 지원 안하는...
뭐지....
그럼 구버전 IE 지우너 하려면 Axios 못쓰나..
어차피 9를 누가써..
IE 도 끝났..