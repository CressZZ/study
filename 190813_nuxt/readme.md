# Vue-CLI3
- Vue CLI 의 시스템은 3가지 요소로 구분할 수 있다. 
## CLI 
- CLI 는 전역적으로 설치된 npm 패키지이며, Vue.js 프로젝트를 생성하는 `vue create`, UI를 통해 프로젝트를 관리할 수 있는 `vue ui`등 터미널에서 `vue`를 사용한 명령을 제공한다. 

## CLI Service 
- CLI Service는 `webpack`, `webpack-dev-server` 위에 구축이 되며 CLI Plugin을 실행하는 핵심 서비스와 webpack에 대한 설정을 포함하고 있다. 즉, webpack을 통해 애플리케이션의 개발 서버 실행, 빌드 등을 처리한다.

## CLI Plugin
- CLI Plugin 은 Babel/TypeScript, ESLint, e2e Test, 단위 테스트와 같은 선택적으로 설치가 필요한 Plugin을 말하며, 프로젝트 생성 과정에서 포함하거나 이후에 포함 시킬 수 있다.

# @vue/cli-init
- @vue/cli-init 은 2.x Template을 가져오기 위한 `vue init` 기능을 제공한다. 
- Boiler plate를 만들 수 있다. 

# vue init (cli-init) VS vue create (cli)
- 주어진 템플릿대로 만들지, 커스터 미이징해서 만들지 선택
 