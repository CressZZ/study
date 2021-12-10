# git submodule
[Git Submodule](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EC%84%9C%EB%B8%8C%EB%AA%A8%EB%93%88)

## 간략하게 말하면
'A 프로젝트'와 'B 프로젝트' 에서 공통의 'common.js' 를 쓰고 싶을때, 'common.js'를 submodule 로 하여 사용하는 개념. 
마치 node package 와 같은 동작을 하게 된다. (npm i commonjs)
물론 node package 로 사용하려면 npm  저장소에 commonjs 를 배포 해야 겠지.

## 염려되는점
'A 프로젝트'에서 'common.js' 즉 서브 모듈을 수정할수는 있을것 같으나, 그러면 안될거 같고..
서브 모듈의 브렌치 설정도 애매해서?

# monorepo
[lerna](https://github.com/lerna/lerna)

