1. vue.config_admin.js
```js

publicPath:process.env.IS_SERVE === 'devserver' ? '/' : 'auto',
```
 
일단 dev 서버에서는 퍼블릭 패스를 '/' 로 한다. 
그 이유는... 일단 별 옵션을 다 조합해 봤는데 비정상적으로 동작하고, (url 에 auto가 나온다던가, 새로고침이 안된다던가)
vue-cli 공식 문서에 보면 
제안은 아니지만, 이런 문구가 나온다.
https://cli.vuejs.org/config/#publicpath
 
이 값은 개발 중에도 존중됩니다. 대신 루트에서 개발 서버를 제공하려면 조건부 값을 사용할 수 있습니다.
 
 
2. router/index.ts
 
```js
const router = createRouter(

{     history:createWebHistory(''),     routes, }
)

```
 
라우터 문서를 보면 (https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations) 
하위 폴더에 배포하는 경우 Vue CLI의 publicPath 옵션과 라우터의 관련 base 속성을 사용해야합니다. 또한 루트 폴더 대신 하위 폴더를 사용하려면 아래 예제를 조정해야합니다
라고 나온다. 
 
또한 vue-cli 옵션인(webpack config 아님) publicPath 을 'auto' 로 두면 현재 아래와 같은 문제가 생기는데(url 에 auto가 나온다던가)
https://github.com/vuejs/vue-cli/pull/7005#issuecomment-1050650260
이렇게 해결해보라고? 나오고, 수정 예정인것처럼 이야기 한다. 
https://github.com/vuejs/vue-cli/pull/7005#pullrequestreview-897520479
---> 하지만 publicPath: 'auto'가 올바르게 작동하려면 수정해야 할 부분이 여전히 많이 있다고 생각합니다.
예를 들어 이 경우 process.env.BASE_URL을 ''로 설정해야 합니다.
genHistoryApiFallbackRewrites에 대한 baseUrl 인수도 마찬가지입니다.
 
 
 

