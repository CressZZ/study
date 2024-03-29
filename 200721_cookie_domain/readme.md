
# https://ko.javascript.info/cookie

## Domain
domain=site.com
쿠키에 접근 가능한 domain(도메인)을 지정합니다. 다만, 몇 가지 제약이 있어서 아무 도메인이나 지정할 수 없습니다.

domain 옵션에 아무 값도 넣지 않았다면, 쿠키를 설정한 도메인에서만 쿠키에 접근할 수 있습니다. site.com에서 설정한 쿠키는 other.com에서 얻을 수 없죠.

이 외에 까다로운 제약사항이 하나 더 있습니다. 서브 도메인(subdomain)인 forum.site.com에서도 쿠키 정보를 얻을 수 없다는 점입니다.

// site.com에서 쿠키를 설정함
document.cookie = "user=John"

// site.com의 서브도메인인 forum.site.com에서 user 쿠키에 접근하려 함
alert(document.cookie); // 찾을 수 없음
서브 도메인이나 다른 도메인에서 쿠키에 접속할 방법은 없습니다. site.com에서 생성한 쿠키를 other.com에선 절대 전송받을 수 없습니다.

이런 제약사항은 안정성을 높이기 위해 만들어졌습니다. 민감한 데이터가 저장된 쿠키는 관련 페이지에서만 볼 수 있도록 하기 위해서 말이죠.

그런데 정말 forum.site.com과 같은 서브 도메인에서 site.com에서 생성한 쿠키 정보를 얻을 방법이 없는 걸까요? 방법이 있습니다. site.com에서 쿠키를 설정할 때 domain 옵션에 루트 도메인인 domain=site.com을 명시적으로 설정해 주면 되죠.

// site.com에서
// 서브 도메인(*.site.com) 어디서든 쿠키에 접속하게 설정할 수 있습니다.
document.cookie = "user=John; domain=site.com"

// 이렇게 설정하면

// forum.site.com와 같은 서브도메인에서도 쿠키 정보를 얻을 수 있습니다.
alert(document.cookie); // user=John 쿠키를 확인할 수 있습니다.
하위 호환성 유지를 위해 (site.com 앞에 점을 붙인) domain=.site.com도 domain=site.com과 동일하게 작동합니다. 오래된 표기법이긴 하지만 구식 브라우저를 지원하려면 이 표기법을 사용하는 것이 좋습니다.

이렇게 domain 옵션값을 적절히 사용하면 서브 도메인에서도 쿠키에 접근할 수 있습니다.

## Domain 추가
```js
document.cookie = 'test4=4; path=/; domain=;exipires=90'
```
위에 예시는 domain을 설정 안한것 처럼 즉, 하위 도메인에서 못읽어 오게 쿠키가 생성되고

```js
document.cookie = 'test4=4; path=/; domain="";exipires=90'
```

위의 예시는 domain 이 "" 로 지정되어, 원하는 도메인에 쿠키가 생성되지 않는다.


# 서버에서 set-cookie 해줄때, 
- 프론트에서 ajax 로 api를 호출 하는 방법과
- img 태그에 src를 추가 하는방법 두개가 있는데, 
- 두개의 차이점은 CORS 이슈에 대한 차이가 있고, (당연히..!)
- 다른건 별로 없는데 
- ajax로 요청하는게 좋아 보인다. (정석 같으니까)
- 이슈는 프론트에서 ajax로 요청할때 credential: 'include' 를 해줘야 한다는 것이고 (fetch api 사용시 옵션)
- 이때, 서버는 set-cookie에 꼭 SameSite=None 과 Secure 옵션을 해줘야 한다 
- 둘중 하나만 빠져도 크로스 사이트에서 쿠키가 생성 안된다. 
- 프론트에서 credential: 'include' 요청시 서버는 Access-Control-Allow-Origin 은 와일드 카드 * 를 쓰면 안되고 하나씩 설정 해줘야 한다.  (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#sending_a_request_with_credentials_included)
- Note: Access-Control-Allow-Origin is prohibited from using a wildcard for requests with credentials: 'include'. In such cases, the exact origin must be provided; even if you are using a CORS unblocker extension, the requests will still fail.

