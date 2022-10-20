# index.html 과 index.js 를 참조 

일단... 음

두개로 나누어 서 생각하면 아래 두개로 나누어서 생각해야 한다.

# script 태그의  async / defer 속성과, DOMContentLoaded
https://ko.javascript.info/script-async-defer
이건 중요하니까 읽어보고. 
요약은 서드 파티의 스크립트의 경우 defer 가 아니라 async로 해야 한다는거
defer로 하면 스크립트 로드에 애러가 났을경우 DOMContentLaoded 이벤트 트리거가 안되지만, 
async는 스크립트 로드에 상관없이 DOMContentLaoded 이벤트가 실행된다는거

# window.onload 와 비동기 함수! 
이건 index.js 와 index.html 을 참조 해야 하는데
우선

동기적으로 실행한 동적을 붙인 img 태그 등은 전부 window.onload에 영향을 준다.
그러니까 img로드가 완료되어야 window.onload 가 실행 된다는것. 

그러면 `<script async>` 의 경우는?

`놀랍게도 마찬가지로 img로드가 완료되어야 window.onload 가 실행 된다`

즉 script 의 async 속성은 비동기 함수가 아니라는거. 뭔가 당연한 이야기 같지만.

이 문장을 나중에 보면 햇갈리수 있는데, 다시 말하면 
비동기로 실행한 함수 안의 내용에 대해서는 (예를 들면 프로미스의 리졸브 안에 동적으로 이미지 태크를 만들어서 붙인다고 했을때는)
window.onload에 영향을 주지 않지만, 

`<script async>` 로 블러온 스크립트에 동기적 & 동적 으로 이미지 태그를 만들어서 붙이는 경우에는 
이미지 불러올때까지 window.onload 가 실행되지 않는다는 것이다.   

당연히 이미지 태그 뿐 아니라 비동기로 동작하는 모든 것에 해당 한다. 
비동기로 json파일 불러와서 그거에 맞춰서 돔을 그리고, 이미지 태그 붙이고 이러한 프로세스도
비동기로 json파일을 불러오는 그 시점에서 이미 window.onload 의 관심을 벗어 난다. 

