# 도대체 .babelrc.json 과 babel.config.json 은 어떤 스코프를 가지고 있는가!

# 기본으로 알아야 하는 개념
- process.cwd() 은 node에서 제공하는 메서드로 현재 node를 실행시킨 곳을 정의 하는 듯하다(공식문서는 안찾아봄. 귀찮귀찮)
- babel의 옵션중 opts.cwd의 디폴트 값은 process.cwd()의 값이다. 
- babel의 옵션중 opts.root의 디폴트 값은 opts.cwd이다. 
- babel의 옵션중 babelrcRoots의 디폴트 값은 opts.root이다. 
- babel의 옵션중 filename은 유저가 직접 수정하는 것이 아니라, 바벨 tool 이나 babel.transform 을 직접 사용할때 쓴다. (그냥 컴파일 될 파일 이름이라고 생각하면 될 듯 하다).
- The process.cwd() method is an inbuilt application programming interface of the process module which is used to get the current working directory of the node.js process.

# .babelrc.json(js) 와 babel.config.json(js) 의 경로

## babel.config.json(js) Project-wide configuration
- 프로젝트 전체에 바벨을 설정하는 컨피그 파일이다. 
- rootDirectory(opts.root = opts.cwd = process.cwd()) = working directory 경로에 존재하는 babel.config.json(js) 찾아서 적용한다. 
- 혹은 babel 옵션중 configFile 값에 원하는 컨피그 파일 경로를 입력해주면 그 파일이 Project-wide configuration로 적용된다. 
- `node_module`안에도 적용된다. 
- configFile 옵션 값을 false로 하면 적용되지 않는다.
- project-wide config 파일은 물리적인 경로와는 무관하기 때문에 실제 babel.config.json(js)가 어디 있던지, 컴파일 하려는 파일들이 어디에 있던지 일단 전부 적용시켜 버린다. 
- 그래서 `node_module`안에도 적용되는 것이고, 테스트 결과 config 파일이 있는 곳의 상위 폴더에 있는 파일이라도 컴파일 할경우 해당 config 파일이 적용된다. 

### 세부적인 테스트 결과 ****
- rootDirectory(opts.root = opts.cwd = process.cwd()) = working directory 경로에 존재하는 babel.config.json(js)이 무조건 적용된다.
- 단, 하위의 .babelrc.json(js) 가 해당 설정을 덮어 쓴다. 
- package.json 파일을 가지고 있는 폴더의 경우 (다른 패키지라고 하자.), 즉 다른 패키지인 경우 babel.config.json(js)에 `babelrcRoots` 옵션이 적용되어 있는 경우에만(babelrcRoots의 디폴트 값은 opts.root) .babelrc.json(js) 가 적용된다.

## .babelrc.json(js) File-relative configuration
- 프로젝트(package) 별로 바벨을 설정하는 컨피그 파일이다.
- 1) .babelrc.json(js)이 정상적으로 적용 되려면 컴파일되는 파일(file name)은 babelrcRoots(opts.root = opts.cwd = process.cwd()) 하위 폴더에 존재 해야 한다. 
- 2) 컴파일되는 파일(file name)이 존재하는 위치를 시작으로 package.json을 찾아 상위폴더로 탐색한다. 그 과정에서 .babelrc.json(js) 가 발견되면 그 .babelrc.json(js)를 적용한다. 
- package.json 이 더 상위에 있다고 해도 일단 .babelrc.json(js)을 찾으면 그 파일을 적용한다. 
- .babelrc.json(js)는 babel.config.json(js)의 설정을 덮어 쓴다. (지역은 전역을 덮어 쓴다.)
- `node_module`안에 있는 파일같은 경우, webpack의 babel-loader는 각각의 `node_module`안에 있는 파일을 컴파일하려 할거고 package.json이 있는 곳까지 탐색을 할것이다. 당연히 각각의 `node_module`의 패키지는 각각의 package.json을 가지고 있을 거고 그렇게되면 내가 직접 설정한 .babelrc.json(js)는 탐색되지 못 할것이다. 그래서 .babelrc.json(js)은 `node_modeuls` 안의 패키지에 적용되지 않는다. 

### .babelrc.json(js)의 의미
- .babelrc.json 파일은 오직 그 파일이 속해 있는 패키지에만 영향을 준다.
-  babelrcRoots(opts.root = opts.cwd = process.cwd())에서 벗어난 .babelrc.json 파일은 무시된다.


# npm script 로 시작하는 경우
- npm script를 실행할때 package.json이 있는 곳까지 폴더를 상위로 탐색한다. 
- process.cwd() 가 package.json이 있는 곳이 된다. 
- package.json 에 해당 script 명령어가 있으면 실행된다.

# webpack.config 의 경우
- wbepack.config에 정의 되어 있는 모든 상대경로는(import eport ignore등) process.cwd()를 기준으로 설정된다. 

# [보너스] .eslintignore 의 경우
- process.cwd() = working directory 기준으로 적용된다.
