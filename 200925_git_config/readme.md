# config 설정하는법
## /etc/gitconfig 파일: 시스템의 모든 사용자와 모든 저장소에 적용되는 설정이다. git config --system 옵션으로 이 파일을 읽고 쓸 수 있다.
## ~/.gitconfig 파일: 특정 사용자에게만 적용되는 설정이다. git config --global 옵션으로 이 파일을 읽고 쓸 수 있다. 
## .git/config: 이 파일은 Git 디렉토리에 있고 특정 저장소(혹은 현재 작업 중인 프로젝트)에만 적용된다. 

각 설정은 역순으로 우선시 된다. 그래서 .git/config가 /etc/gitconfig보다 우선한다.


출처: https://goodtogreate.tistory.com/entry/Git-config-설정-계정설정 [GOOD to GREAT]