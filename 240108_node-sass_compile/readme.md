# node-sass 를 npm i 하면 
- node-sass는 내부적으로 LibSass라는 C/C++ 라이브러리를 사용하고 있다.
- C/C++ 라이브러리는 사용자의 특정 환경(노드 버전, 운영 체제 등)에 맞게 컴파일되어야 한다. 
- 즉, npm i node-sass 를 하면 node-sass 라이브러리를 설치한다.
- 설치 과정 중에, node-sass는 현재 시스템의 노드 버전과 운영체제에 맞게 LibSass의 C++ 코드를 컴파일 한다.
- 이 컴파일 과정은 네이티브 빌드 도구(예: node-gyp)를 사용해 진행된다.
- 따라서 node 버전이 바뀌면 Libsass 를 재 컴파일 해야 하는데, 이게 npm rebuild node-sass 이다. 

# 결론
- node-sass 말고 sass 사용하자