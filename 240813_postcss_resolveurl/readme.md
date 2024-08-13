```scss
background-image: url("@/img/official/board/btn_arrow.png");
```

```js
// webpack.config.js
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      '@': path.resolve(__dirname, '_src/')
    }
  },
   
  test: /\.s?css$/,
  exclude: ['/node_modules'],
  use: [  MiniCssExtractPlugin.loader, 'css-loader','resolve-url-loader', 'sass-loader' ]
```

# 이렇게 있을대, scss 파일의 @ 알리아스가 정상동작 하지 않는다. 
- 왜 그럴까?
- 바로 저 resolve-url-loader 때문이다.......

# 동작 순서를 고려해서 그럼 background-image의 리소스는 누가 모듈화 하는가
- css-loader 가 한다. css-loader 가 그 전까지 로더를 타고 오며 변환된 파일을 합쳐서 css를 js 모듈로 만들고, 그안에 있는 파일도 처리한다. 

# 정확히  @ 알리아스가 정상동작 하지 않는 이유는 뭔가?
- resolve-url-loader 이 `@/img/official/board/btn_arrow.png` 이 문구를 `./@/img/official/board/btn_arrow.png` 이런식으로 바꿔 버린다. 
- 아.... 왜?
- resolve-url-loaderd 은 scss에서 상대경롤를 사용하게 될때 유용한 라이브러리이다. 이건, 모든걸 상대경로로 바꾼다. 
- 예를 들면 `img/official/board/btn_arrow.png` 이렇다고 할때, scss 는 스스로도 저게 ./img 라는 현재 폴더안의 하위 img 폴더를 가르킨다고 알고 있다. 
- 하지만 resolve-url-loaderd는 일단 바꾸고 본다. 
- 근데 우리는 @ 알리아스가 제일 먼저 있지 안흔ㄴ가?
- 상관없다. 바꿔 버린다. ./@/ 으로 바꾸는 것이다. 
- 그래서 css-loader 에 갈때 쯤이면 _src/scss/index.scss/_src/img/official.... 이런식으로 바뀌어 버리는 것이다. 

# 해결책이라고 생각했던것 첫번째 normalizeUrl
- 오키 그럼 post-css의 normalizeUrl 을 사용해볼까? (https://cssnano.github.io/cssnano/docs/optimisations/normalizeurl/)
- normalizeUrl 는 `url('./css/../img/cat.jpg');` 이런 경로를 `background: url(img/cat.jpg);` 이렇게 바꾼다. 
- 오호 그럼 앞에 resolve-url-loader가 `./@/img/...` 이렇게 바꿔 도 다시 `@/img/..` 이렇게 바꾸는 구나?

# 그러나
- 2depth 이상 들어가게 되면 소용없다. 
- 예를 들면 scss/index.scss 에서 scss/test/test.scss 를 @import 하는데, test.scss 안에 알리아스를 써서 이미지 하나를 참조 한다고 하자.
- 그럼 test.scss 에는 `url('@/img/test.jpeg')` 이렇게 될거고
- resolve-url-loader 는 `url('./test/img/test.jpeg')` 로 바꿀꺼다.
- 왜냐하면 최상위 파일의 위치를 기준으로 나머지 파일들의 모든 url 을 상태경로로 바꾸는 것이 resolve-url-loader 의 역할이기때문이다. 
- 첫번째 예시에서는 변환한 파일이 루트에 있읐으니가  `./@/img/test.jpeg`이렇게 바뀐건데,
- 두뎁스 안에 있으면  `url('./test/@/img/test.jpeg')` 이렇게 바뀐다. 
- 즉 `url('./test/@/img/test.jpeg')`이거는 normalizeUrl가 동작해도  `url('test/@/img/test.jpeg')` 이렇게 밖에 안바뀐다. 

# 결국 꽝 (그런데 다른 프로젝트에서는 위 처럼 쓰고 있다. 애러가 안난 이유는, scss가 루트에 있는 경우에만 알리아스를 썼고, 아닌건 상대경로 썼기 때문)

# 결론은 무엇이냐
- 알리아스를 써서 scss 를 작성할거면 resolve-url-loader 을 쓰면 안된다는 거다. 
- resolve-url-loader 은 상대 경로를 위한 로더 이다. 
- 선택을 하자.
- 맨날 resolve-url-loader 을 썼으니 한번 쓰지 말아 볼까 하기도 한다.



