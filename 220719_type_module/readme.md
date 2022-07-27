# 참고
https://www.daleseo.com/js-node-es-modules/
https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling

# 내용
- Node 13.2 부터는 노드에서 esm 을 자체적으로 지원하게 되었다. 
- 이전에는 웹펙으로 빌드 하던지, 바벨이 필요했다. 
- 파일 이름이 .ejs 로 끝나거나, 
- package.json 의 type 필드의 값이 module인 경우 노드는 해당 프로젝트(혹은 개별 .ejs 파일을) esm 으로 취급한다.
- 노드에서 js 파일 혹은 ejs 파일을 임포트 할때는 반드시 확장자를 같이 넣어 줘야 한다. (브라우저가 동작하는 방식과 일치하게 하기 위함)
  - `import { now } from "./time"; // not working`
  - `import { now } from "./time.mjs"; // Good`