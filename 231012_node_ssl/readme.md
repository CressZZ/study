# 개요
- node18 에서 axios 패키지를이용하여 https 프로토콜로 어떤 서버에 접근하면 애러가 난다. 
- node16 에서는 잘됨

# 원인
- 18버전 Node가 사용하는 SSL 프로토콜(최신)과, 서버에서 허용하는 프로토콜의 버전(예전)이 달라 보안 이슈가 생긴 것이다. 
- 서버가 최신 프로토콜을 허용하지 않는다.

# 해결 방안
- 서버가 최신프로토콜을 허용하게 만들던가
- Node 가 예전버전 프로토콜을 사용하게 하던가 

## 1. node16 으로 내린다. => Node 가 예전버전 프로토콜을 사용하게 하는 방법
- node16 으로 내리는 건 우리가 원하는 해결방안이 아님

## 2. 예전버전의 SSL 프로토콜을 이용하여 요청보내라고 axios 에 말한다. (정확한 의미인지는 모르겠음) => Node 가 예전버전 프로토콜을 사용하게 하는 방법
```js
const fs = require('fs');
const axios = require('axios');
const contentType = require('./content-type');

/* 핵심 */
const https = require('https');
const crypto = require('node:crypto');

axios({
  url: url,
  method: 'PUT',
  data: fs.readFileSync(filePath),
  headers: {
    'Content-Type': contentType(fileName)
  },
  /* 핵심 */
  httpsAgent: new https.Agent({secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT}), 
});
```

### [참고] https.agent
- Agent라는 것은 HTTP 연결의 지속성을 관리해주는 역할을 하는 거야. 
- keepAlive: 이건 불리언 값으로, true로 설정하면 소켓이 닫히지 않고 재사용될 수 있어.
- keepAliveMsecs: keepAlive가 true일 때, 이 시간(밀리초 단위) 동안은 소켓이 유지될 거야.
- maxSockets: 동시에 열 수 있는 최대 소켓의 수를 정하는 값이지.
- maxFreeSockets: 사용되지 않는 소켓 중 최대 몇 개를 유지할지 결정해.
- timeout: 소켓에 설정할 타임아웃 값이야. 0이면 타임아웃 없음을 의미해.

### [참고] Node 와 OpenSSL
- Node.js는 네트워크 애플리케이션을 만드는 데 유용하잖아. 그리고 OpenSSL은 보안 통신을 위한 라이브러리야. 이 두 개가 잘 연동되어야 안전한 애플리케이션을 만들 수 있지.
- Node.js는 내부적으로 OpenSSL을 사용해서 SSL/TLS 암호화를 처리해. 즉, HTTPS나 암호화된 소켓 같은 것들을 만들 때 OpenSSL의 기능을 활용하게 돼. 이때, Node.js와 OpenSSL 사이에서 어떤 설정을 사용할지를 지정해주는 옵션이 필요한 거야.
- crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT 같은 상수는 OpenSSL 라이브러리에 어떤 옵션을 적용할지를 정확하게 지정해줘. 그래서 이 상수를 사용하면, Node.js와 OpenSSL 사이의 연동이 더 안전하고 정확하게 이루어진다고 볼 수 있어.
