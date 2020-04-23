# 개요
jquery ajax 중에 `accepts` 옵션과 `converters`  옵션 `contentType` 옵션 `dataType옵션에` 대해 알아 보자.

# accepts converters contentType dataType
사실 이 옵션때문에 알아보았음.
A set of key/value pairs that map a given dataType to its MIME type, which gets sent in the Accept request header. This header tells the server what kind of response it will accept in return. For example, the following defines a custom type mycustomtype to be sent with the request:

문서만 보면 해당 옵션으로 http 헤더인 Accept를 제어 할수 있는 것처럼 나왔으며 각종 블로그도 그렇게 설명 하고 있는데, 
실제로 테스트를 해보면 그렇지 않다. 
그냥 커스텀 mime 타입을 지정해 주기 위한거라고 생각된다. 

accepts 옵션을 쓰려면 아래 예시와 같이 써야 하는데 일단 accepts는 키밸류로 이루어진 객체이고, 
이걸 converters 옵션을 통해 어떻게 파싱해줄지 정의 해줘야 한다. (커스텀 이므로 파싱 방법도 커스텀 하게...)
그리고 제일 중요한 건 
`http` 헤더인 `Accept를` 바꾸는 부부은 `dataType` 이 해주는 거다. 

다른건 `http` 헤더인 `Accept를` 제어 할수 없다. 

만약 `dataType` 이 `'json'` 이라면 커스텀한 파싱이 필요 없으므로 `converters도` 필요 없고 `accepts도` 필요 없다. 

즉,  커스텀한거 쓸 일 없으니 `http` 헤더의 `Accept를` 제어하고자 한다면 `dataType을` 쓰던가

`headers :{"Accept":"json"}`  옵션을 사용하자.

```js

$.ajax({
  accepts: {
    mycustomtype: 'application/x-some-custom-type'
  },
 
  // Instructions for how to deserialize a `mycustomtype`
  converters: {
    'text mycustomtype': function(result) {
      // Do Stuff
      return newresult;
    }
  },
 
  // Expect a `mycustomtype` back from server
  dataType: 'mycustomtype'
});

```