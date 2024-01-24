# 아 뭐임 아직도 CORS를 모름?
# 같은 소리 하지말고 아무튼 이슈가 터졌다
- 내가 A.com 오리진에서 B.com 으로 ajax 요청을 했는데, 
- B.com 에서는 A.com 에대한 CORS 정책을 적용한 상태이기 때문에, 
- 기본적으로는 문제가 없었다. 
- 근데, 크롬 네트워크에서 B.com 에 요청 보낸 네트워크를 선택, 오른쪽 마우스 클릭 copy link -> fetch 카피 이런걸 눌러서, 
- 콘솔에 붙여 넣었는데, CORS가 터졌다.
- 왜??? 똑같인 했는데 왜 터지지?
- 이것 저것 해보니까, 복사해서 console에 넣으면 아래처럼 `cache-control, pragma` 두개의 헤더와 이상한 것들이 같이 카피 되는걸 볼수 있다. 

```js
// 원래 내가 쓴 코드
fetch("https://B.com/api/something",{ "credentials": "include"})
```

```js
// 카피한거
fetch("https://B.com/api/something", {
  "headers": {
    "accept": "*/*",
    "accept-language": "ko,en-US;q=0.9,en;q=0.8,ja;q=0.7,ru;q=0.6",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrerPolicy": "no-referrer",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
```

- 그럼 캐시 문제인가 싶었는데, 아니 결론은
- MDN CORS 문서에 나와 있듯이, https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- Simple requests의 규칙중에 `cache-control` 과 `pragma`가 없기 때문에도 그렇고, 
```
// 심플 리퀘스트 헤더 목록 
Accept
Accept-Language
Content-Language
Content-Type (please note the additional requirements below)
Range (only with a simple range header value; e.g., bytes=256- or bytes=127-255)
```
- 아무튼 브라우저가 이거 cors 정책에 따라 심플 리퀘스트가 아니구나 (어차피 헤더 말고도, ajax요청 이니까 해당되지)
- 라고 생각해서 `브.라.우.저`가 판단해서 preflight 를 날린다. 
- 이때, 내가 위 처럼 원래 request애 `cache-control` 과 `pragma`같은 심플리퀘스트 영역 이외의 헤더를 적었다면, 
- preflight 보낼때 `Access-Control-Request-Headers` 에  `cache-control` 과 `pragma` 을 포함해서 보내 버린다. 
```
[Request Header]
Access-Control-Request-Headers: cache-control,pragma
```
- 그럼 서버에서 cors 설정할때, 저걸 받으면 Access-Control-Allow-Headers 을 설정해서 response 해줘야 하는데
```
[Response Header]
Access-Control-Allow-Headers:  cache-control,pragma
```
- 그냥 설정을 안했기 때문에 아래와 같이 회신이 온다
```
[Response Header]
Access-Control-Allow-Headers:  Content-Type,Authorization,Range
```
- 그럼 브라우저는 본 요청을 보내지도 않고 CORS 터졌다고 하고, 네트워크에는 아래처럼 임시 헤더 보여주면서 아 CORS 터졌다고 한다.
```
Provisional headrers are shown
```

# 아니 근데, 난 브라우저가 성공한걸 카피 한거잖아
- 내가 `cache-control` 과 `pragma` 를 빼고 보내면
- 브라우저는 preflight 날릴때, `Access-Control-Request-Headers` 없이 보내고, 
- 서버도 아, 이건 허용 안되는 헤더 없네 하고 통과 시킨다. 
- 그리고 본 요청 보낼때, 브라우저가 자기 맘대로 (아, 내가 물론 데브툴에서 disable cache 에 체크 했지만)
- 헤더에  `cache-control` 과 `pragma` 를 추가 해서 보내는 것이다. 
- 본 요청에 들어간거니까, 서버는 아무런 검증없이 일단 CORS 이슈 안터졌다고 보고 그냥 200 회신 해주는 것이다. 
- ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ