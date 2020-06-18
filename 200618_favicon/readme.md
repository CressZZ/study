# favicon
https://bitsofco.de/all-about-favicons-and-touch-icons/

# apple-touch-icon AND apple-touch-icon-precomposed
## apple-touch-icon
- 애플기기의 홈스크린 아이콘
- ios7 이전에는 이 파일에 디폴트 이펙트를 첨가 시켜 보ㅕ줬다. (빛나게 보이던거)
  
## apple-touch-icon-precomposed
- 지금은 필요 없지만
- ios7 이전에 빛나게 보여주기 싫을때 쓰던 것 
  

# shortcut icon VS icon
# shortcut
## shortcut 쓰지마라
 
- shortcut 이라는 것은 link 태크의 attribute 를 설명하는 html스펙에 나와 있지도 않는 것이다. 어차피 icon 속성이 없으면 브라우저는 페이지의 root path 에서 favicon.ico 를 찾아 다닐꺼다. IE8 이하에서 shortcut이 허용 되는 건 맞지만 정식 스펙도 아니니까 그냥 쓰지마라
- (https://html.spec.whatwg.org/multipage/links.html#linkTypes)

- html 스펙에서 허용은 한다. (역사적인 이유로)
- For historical reasons, the HTML specification now allows the use of shortcut as a link relation if it’s immediately followed by a single U+0020 space character and the icon keyword. Of course, it’s still better not to use any HTML at all. (https://mathiasbynens.be/notes/rel-shortcut-icon)

- For historical reasons, the icon keyword may be preceded by the keyword "shortcut". If the "shortcut" keyword is present, the rel attribute's entire value must be an ASCII case-insensitive match for the string "shortcut icon" (with a single U+0020 SPACE character between the tokens and no other ASCII whitespace). (https://html.spec.whatwg.org/multipage/links.html#rel-icon)
- 역사적 이유로, 아이콘 키워드 앞에는 "shortcut" 이라는 키워드가있을 수 있습니다. "shortcut"키워드가 존재하면 rel 속성의 전체 값은 문자열 "shortcut icon"에 대해 ASCII 대소 문자를 구분하지 않아야합니다 (토큰 사이에 단일 U + 0020 SPACE 문자가 있고 다른 ASCII 공백은 없음). 

### type
- link에 type을 지정해 주는데 스펙에 나와 있기로는 `type은 순수하게 useragent에게 이게 무슨 타입인지 힌트만 주는 것으로(지원 안하면 다운받지 마라) type내용은 신뢰성이 없는 것으로 본다.` 라고 나와 있으나, 
- IE9 와 IE10은 type attribute의 값으로 `image/x-icon` 을 필수적으로 요구 하고 있다. 대신 shortcut icon 을 쓰지 않아도 된다. 
  
### 표로 정리
![img2](./img2.png)


### shortcut 과 함께 ico 를 쓰면안되는 가장 큰 이유
- 이러한 차이점을 바탕으로 최신 방법을 사용하는 png 파일과 IE8 방법을 사용하는 ico 파일의 두 가지 버전을 선언하는 것이 가장 좋은 방법 인 것 같습니다. 그러나 일부 최신 브라우저는 순서에 관계없이 연결된 png 파일 대신 연결된 ico 파일을 선택하는 것으로 보입니다. 즉, 이전 IE 브라우저에 수용하려고하면 최신 브라우저에 잘못된 형식이 제공 될 수 있습니다.  이 때문에 가장 좋은 해결책은 png 형식 파일 만 선언하고 이전 브라우저에서 기본값을 폴백으로 사용하도록하는 것입니다.
- Based on these differences, it may seem like the best method would be to declare two versions - the png files using the modern method and an ico file using the IE8 method. However, it appears that some modern browsers will choose a linked ico file over a linked png file, regardless of the order they are placed. This means that, if we try to accomodate for the older IE browsers, the modern browsers may be served the wrong format. Because of this, the best solution may be to only declare the png format files, and let older browsers use the default as a fallback. (https://bitsofco.de/all-about-favicons-and-touch-icons/)
```html
<!-- For IE 10 and below -->
<!--  No link, just place a file called favicon.ico in the root directory -->

<!-- For IE 11, Chrome, Firefox, Safari, Opera -->
<link rel="icon" href="path/to/favicon-16.png" sizes="16x16" type="image/png">
<link rel="icon" href="path/to/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="path/to/favicon-48.png" sizes="48x48" type="image/png">
<link rel="icon" href="path/to/favicon-62.png" sizes="62x62" type="image/png">

```

## shortcut 써라
- 아무튼 스펙은 아닌데 IE8 이하에서는 이거 지원하니까 걍 써라


# shortcut

# pc 의 이야기 인가?

Chrome, Firefox, Opera 7+, 그리고 Safari 4+는 모두 PNG 파비콘을 지원하지만 Chrome과 Safari는 ICO 파비콘이 함께 지정되어 있으면 선언된 순서에 상관없이 PNG 파비콘을 무시하고 ICO 파비콘을 사용한다. 즉, PNG 파비콘을 지원하지 않는 IE를 위해 ICO 파일을 사용하게 되는 순간, Chrome과 Safari는 PNG 파비콘을 무시하게 된다는 이야기다.

출처: https://webdir.tistory.com/337 [WEBDIR]


# apple-touch-icon VS apple-touch-icon-precomposed

## 이미지로 알아본 차이점
http://blog.karlribas.com/2012/05/how-to-create-apple-touch-icon-for-your.html

## 자세한 설명
https://webhint.io/docs/user-guide/hints/hint-apple-touch-icons/#page-heading

## 각종 CASE
```html
  <link rel="apple-touch-icon" href="images/icons/144x.png">
  <link rel="apple-touch-icon-precomposed" href="images/icons/128x.png">
```
두개가 쓰인 경우 precomposed 우선

```html
  <link rel="apple-touch-icon" href="images/icons/144x.ico" type="image/x-icon">
```
ico 형식인 경우 해당 리소스 무시

```html
  <link rel="apple-touch-icon" href="images/icons/144x.png">
```
제대로 apple-touch-icon 만사용 할경우 잘적용 

```html
  <link rel="apple-touch-icon" href="images/icons/144x.ico" type="image/x-icon">
  <link rel="apple-touch-icon-precomposed" href="images/icons/128x.png">
```
ico 파일 무시 후 apple-touch-icon-precomposed 적용


# touch icon 
![img1](./img1.png)
