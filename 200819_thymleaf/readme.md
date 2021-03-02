# Tip thymleaf with handlerbars
```js
var a = {
 description: '[(#{ {{prefix}}.share.desc( ${profile.name}, ${profile.gender}, |${ profile.{{key1}} } / ${ profile.{{key2}} }|   ) })]',
}
```
# inline 
## 왜 th:inline='text' 를 안써주는가
Note that text inlining is active by default in the body of every tag in our markup –- not the tags themselves -–, so there is nothing we need to do to enable it.

- 3.0 버전 이상부터 이게 디폴트이다. 
- 저기서 말하는 body는 body 태그가 아닌거 같다. head 태그에서도 잘되니까

## 그럼 왜 우리는 th:inline='javascript' 도 안써주느낙?
```html
<script>
  var test = "[[${test}]]"; // "안녕?"
</script>
```
- 기본이  th:inline='text' 이니까 
- 만약  `th:inline='javascript` 넣어주면 이렇게 된다. 
- (따옴표두개가 된다. test가 원래 스트링인듯..)

- <script th:inline='javascript'>
  var test = "[[${test}]]"; // ""안녕?""
</script>
```

# 인라인 표현식 [[...]] [(...)]
인라인 표현식은 괄호 두 개를 쌍으로 감싸는 형태([[...]] 혹은 [(...)])로 사용한다. [[...]] 표현식은 th:text와 같고(HTML-escaping), [(...)] 표현식은 th:utext와 같다(HTML-unescaping).

# 문자열 연산 Literal substitutions + |...|
```html
<!-- 덧셈 연산자 사용 -->
<span th:text="'Welcome to our application, ' + ${user.name} + '!'">

<!-- 파이프로 감싸기 -->
<span th:text="|Welcome to our application, ${user.name}!|">

<!-- 혼합 사용 -->
<span th:text="${onevar} + ' ' + |${twovar}, ${threevar}|">

```


# $ / # / @
## ${test}
th:with 등으로 한번이라도 정의 된 변수를 사용할때

## ${@test}
@ 뒤에 빈(Bean) 이름을 사용하면 그 빈에 접근할 수 있다.

## ${#test}
임프트 된 클래스를 사용 할때