babel-eslint는 10버전을 사용하자.

현재 2020.05.13 기준 babel-eslint는 11-beta 버전이 있는데 
vscode 에서 babel-eslint 11-beta를 사용할 경우 
- workplace가 작업하고자 하는 폴더와 다를 경우 (vscode에서 `project/`폴더를 열고 작업은 `project/project_1/`에서 진행할 경우. 이경우 당연히 `project/project_1/node_modules` 에 babel-eslint 11버전이 설치 되어 있다.) vscode 플러그인 `ESLint` 에서 babel config 파일을 찾을 수 없다고 애러를 밷는다. 
- 만약 vscode에서 `project/project_1/`을 열고 `project/project_1/`안에서 작업을 한다면 애러를 밷지 않는다. 

귀찮으니 babel-eslint 10버전을 안전하게 사용하도록 하자.