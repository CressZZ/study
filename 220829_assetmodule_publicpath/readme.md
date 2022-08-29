# webpack config
# asset module
# publicPath

언제쯤이면 publicPath를 완전히 이해 할수 있을까...

# assetModul
- url-loader, file-loader, raw-loader 가 합쳐진 로더같은거로 webpack에서 자체 제공한다. 

# 아무 설정 안하면 그냥 file=loader 가 동작해서 참조하는 asset 를 전부 복사해서 dist에 넣는다.

# url-loader 처럼 동작하게 설정하는건 대충 알고, 

# assetMopudle 디스트 폴더
## output.assetModuleFilename: 'images/[hash][ext][query]' 
## Rule.generator.filename

두개가 있는데, Rule.generator.filename 이게 우선이고, 둘중 아무거나 설정해도 상관없다. 

# publicPath 에 아무것도 설정안해주면.......auto가 설정 되나?

# 아무튼 publicPath 가 auto 이거나 아무것도 설정 안되어 있고, file-loader가 동작했다고 생각 해보자, css-loader 의 url 옵션은 true 로 되어 있어야 한다. 
- 순서대로 sass-loader 가 동작하겠지. 뭔가 잘 동작 할거다
- resolve-url-loader 가 없다고 가정하자 (나중에 있는거와 비교 할거임)
- css-loader가 동작하는데 url옵션이 true니까 (디폴트가 true) css 에 있는 url들을 분석하기 시작한다. 
- url 중에 png나 svg가 있으면 assetModule에 해당 파일경로를 토스 할거고
- assetModule은 file-loader가 동작하면서 해당 파일을 assetModuleFilename나 generator.filename에 명시된 output 경로로 복사하고, 
- 복사된 경로를 css-loader에 토스 할거고
- css-loader는 css-loader의 output 경로와 file-loader가 준 경로를 비교하여 상대경로로 파일을 참조 하는 url을 변경 할 것이고 (이건 내 추측)
- 마지막에 publicPath가 개입하면서 publicPath에 뭔가가 설정되어 있다면 위에서 설정한 상대경로 같은건 무시하고, 맨 앞에 publicPath를 css 파일에 집어 넣을 것이다. 
- 만약 publicPath가 설정되어 있지 않거나, auto라면 위의 프로세스는 무시 되겠지


# resolve-url-loader VS context 옵션
- 오늘의 하이라이트
- resolve-url-loader: 211210_resolve-url-loader/basic-problem.svg 참조
- 난 sass에서 하위 폴더에 있는 sass 파일이 이미지 url 참조를 이상없이 참조 하게 하려고 resolve-url-loader를 사용하였다. 
- 그런데 context를 사용하는 방법도 있다. 
- context를 완벽하게 이해하지는 못했는데, 일단 context의 설명을 보면 (https://webpack.kr/configuration/entry-context/)
  - 설정에서 엔트리 포인트와 로더를 확인하기 위한 절대 경로의 기본 디렉터리.
  - 기본적으로 Node.js의 현재 작업 디렉터리가 사용되지만, 설정에 값을 전달하는 것이 좋습니다. 이렇게 하면 CWD(현재 작업 디렉터리)와 독립적인 설정이 가능합니다.
- 라고 나오는데 잘 모르겠고, 
- sass파일이나, js 파일에서 url경로를 설정해주거나, import 할때 절대경로를 쓰면
- 내가 context에 설정한 경로가 튀어 나온다. 
- (아니 근데 이럴거면 resolve.alias를 쓰는게 낮지 않나? 뭔가 원래 사용법이 아닌거 같은데?)
- 아무튼 그렇다. 그런것이다. sass파일이나, js 파일에서 url경로를 설정해주거나, import 할때 절대경로를 쓰면 context에 설정한 경로가 튀어 나온다. 
- 그럼 sass의 하위폴더에서 이미지를 참조 하고 싶을때 url에 절대경로 시작하는 url을 사용한다면 webpack 빌드 할때 이미지를 잘 참조 한다. 
- (아니 근데 이렇게 하면 IDE에서 파일 참조(cmd+click) 이 안될텐데? 진짜 이렇게 해야 되나?)
- 아무튼 잘 참조 하고 잘 빌드 한다. 
- context 설정을 안해주고 절대경로 url을 참조 하면 애러 난다. 
- 자 그럼 context 를 넣은 상태에서의 프로세스를 한번 살펴 보자 

# context 옵션 넣고, sass 하위 폴터의 파일이 이미지를 참조 할때
- 순서대로 sass-loader 가 잘 동작 하겠지. 
- resolve-url-laoder는 없고 sass 하위 폴더에서 이미지를 참조 하고 있다. (원래라면 안되지만 일단 고고 해보자)
- css-loader 가 동작하는데 url옵션이 true니까 (디폴트가 true) css 에 있는 url들을 분석하기 시작한다. 
- url 중에 png나 svg가 있으면 assetModule에 해당 파일경로를 토스 할거고
- assetModule이 해당 url을 받았는데 절대 경로로 되어 있다. 
- 그럼 이때 context 설정을 살펴 보겠지 
- 그리고 context에 설정된 경로와 css-loader로 부터 받은 파일경로를 잘 조합해서 파일을 찾을 것이다 
- 파일의 크기와 형태를 잘 파악해서 assetModule에 설정된 내용대로 dist/~~ 어딘가에 파일을 복사할 것이고, 
- 복사된 경로를 css-oader에 토스 할거다.
- css-loader는 css-loader의 output 경로와 file-loader가 준 경로를 비교하여 상대경로로 파일을 참조 하는 url을 변경 할 것이고 (이건 내 추측)
- 마지막에 publicPath가 개입하면서 publicPath에 뭔가가 설정되어 있다면 위에서 설정한 상대경로 같은건 무시하고, 맨 앞에 publicPath를 css 파일에 집어 넣을 것이다. 
- 만약 publicPath가 설정되어 있지 않거나, auto라면 위의 프로세스는 무시 되겠지

# 결론
- context를 저렇게 쓰는게 맞아?
- publicPath 는 왜 이렇게 이해하기 어려운가?
- 난 resolve-url-laoder를 사용하겠다! 




