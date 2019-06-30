# PWA 소개
## github
https://github.com/joshua1988/pwa-tutorial

## Cross platform APP을 만들기 위해서는 크게 4가지정도가 있다
- PWA, Electron, Hybrid apps and JavaScript Native(https://www.davrous.com/2019/01/11/4-ways-to-create-cross-platforms-apps-using-web-technologies/)

## PWA VS React Native
> Should You Choose PWA or React Native?
Both PWAs and React Native are much cheaper to develop compared to native apps, but there are some factors to take into account when making the choice between the two. While React Native allows building pretty much native apps, you still need native developers for each Android and iOS. Native developers will have to provide code to allow access to the camera, accelerometer, as well as enable push notifications.

> On the other hand, PWAs don’t allow for the app to be included in an app store. You’ll have to rely on your website or web app users to download it. Also, they are much easier and cheaper to build compared to even React Native apps.

> Therefore, if your business already has a website that is popular among your customers, PWAs are the best way to go. If you can afford a slightly bigger budget and need an app that’s closer to native, then choose React Native. React Native is also a great approach for startups that are looking to build a Minimum Viable Product before launching a full-scale native app.

> If you are still unsure about which to choose, get in touch with our business development team for a quick consultation, where we will present the advantages and disadvantages of both PWA and React Native apps tailored to your specific project.

(https://ideaction.io/blog/pwa-vs-react-native-which-is-better-for-your-app/) 


## 프로그레시브 웹 앱의 등장 배경
- 모바일 시장의 폭발적인 성장
- 모바일 웹 보다는 모바일 애플리케이션을?? (이건 아닌듯)
- 모바일 앱 영역을 커버하기 위한 시도들, 도구들 - Hybrid App, React Native...
    - 위의 도구들은 어쨌거나 Navive 언어가 필요했다. 
- **Offline Web의 필요성**

## 프로그레시브 웹 앱의 특징
- Responsive : 반응형 웹 디자인
- Applike & Discoverable : 앱아이콘
- Engageable : Push알림 등을 이용할때, 모바일과, pc에서 동시에 적용할 수 있다. 
- Connectivity : 오프라인에서의 상태 제공
- Safe : 기본적인 기술 / 제약사항 => 무조건 https 가 적용되어 있어야 한다. 

## 프로그레시으 웹 앱 제작 기술
- manifest.json 
- service workers : client-side javascript Proxy

## 프로그레시브 웹 앱 지원 브라우저
- 프로그레시브 웹 앱의 지원은 os 가 아니라 브라우저이다. 
- FireFox, Opera, Chrome, Samsug Internet, Safari, Edge...

# Web App Menifest
## 개요
- PWA 의 주요 기술 중 하나인 Web App Manifest 파일의 세부 속성을 학습
- 앱을 설치할 수 있는 이벤트와 구현 방법을 학습
- Web App Manifest 개발 시에 주의할 점 (Navigation Scrop, Deep link)

## Web App Manifest란?
- Progressive Web App 의 설치와 앱 구성정보를 담고 있는 json형싣의 설정 파일
    - 앱 아이콘, 화면 런쳐 방식 및 배경색, 시작 페이지 등을 설정 할수 있는 JSON 파일

- 앱 관련 구성정보에는 아래와 같은 항목들이 설정 됩니다. 
    - Start URL : 웹 앱이 시작되는 지점
    - Launch Image : 웹 앱 시작 화면 
    - Display Type : 웹 앱의 화면 형태
    - Display Orientation : 웹 앱 화면 방향
    - App Icon : 앱 아이콘 이미지와 크기

## App Icon
- `src`, `type`, `sizes`
- 주의사항
    - app icon 미지정시 html파일의 `<link rel ='icon'>`태그를 검색한다. 
    - Safari의 경우 아래의 meta 태그를 head에 별도로 추가해주어야 한다. 

    ```html
        <link rel = "apple-touch-icon" href="touch-icon-iphone.png">
        <link rel = "apple-touch-icon" size ="152x152"  href="touch-icon-ipad.png">
        <link rel = "apple-touch-icon" size ="180x180" href="touch-icon-iphone-retina.png">
        <link rel = "apple-touch-icon" size ="167x167" href="touch-icon-ipad-retina.png">
    ```
## Launch Image - Splash Screen
    - 웹앱이 시작될 때 거치는 시작 화면을 설정 가능
    - 모바일 앱의 시작과 동일한 느낌을 가져감
    - 화면의 조합 : 아이콘 + 배경색 + 아이콘 이름
    - 아이콘은 icon에 지정한 이미지중 128dp = 192px 에 가장 가까운 크기로 지정 

##Start URL
    - 앱이 시작될 때 로딩될 페이지 위치 

## Display Type
    - 웹앱 화면의 전체적인 모양을 정할 수 있다. 
    - standalnoe
    - browser
    - fullscreen
    - minimul-ui
    - IOS에서 standalone 사용시
        - `<a>`를 이용한 네비게이션 이동 시 새 브라우저 열기로 인해 context을 잃게됨.
        - 따라서, locaiont.href또는 SPA를 이용한 네비게이팅(라우팅)으로 전체 UX를 가져갈 필요가 있음
        - 네비게이션 없이 사용하고 싶을때 `<meta name="apple-mobile-web-app-capable" content="yes">`

## Theme Color
    - theme-color 을 이용하여 앱 테마 색상을 정의할 수 있다. 
    - 홈화면에서 시작해야 설정한 도메인의 모든 페이지에 적용된다. 
    - url 입력창 등에 적용된다. 

## Display Orientation
    - 화면 방향은 orientation속성을 이용한다. 
    - portrait / landscape

## gcm (Google Cloude Message)
- 푸쉬 메시지 관련 설정
    - gcm_sender_id
    - gcm_user_visible_obly 

## Web App Install Banner
    - PWA가 모바일적인 특징을 가지는 큰부분의 하나
    - 기존 모바일 앱 개발주기 
        - 구현 -> SDK 빌들 -> 스토어 배포 -> 검색 -> 앱 다운로드 -> 설치 -> 사용
    - PWA 의 앱 개발주기 : 구현 -> 사이트 배포 -> 검색 -> 사용(자동설치)

## Install Banner 동작 조건 (설치배너가 화면에 표시되려면...)
: App Menifest 파일을 설정 후 아래 조건 만족시 동일 웹사이트에 대해 `설치배너를 표시`한다.
    - 웹 사이트가 설치되어 있지 않음
    - 사용자가 최소 30초 이상 웹 사이트를 탐색 
    - start_url, short_name, name이 설정되어 있어야 함
    - 최소 192px 크기의 앱 아이콘 이미지 
    - `Service Worker`의 `fetch` 이벤트 구현 
    - `HTTPS`



## beforeinstallprompt 이벤트로 설치 배너의 표시 시기를 지연하거나 disable 가증
```js
let defferedPrompt;

// 설치 가능한 조건인지 확인
// 설치배너가 화면에 표시 될려고 할때 일단 중지후 이벤트를 defferedPrompt변수에 저장
window.addEventListner('beforeinstallprompt', (e)=>{
    e.preventDefault();
    defferedPrompt = e;
});


// 특정 버튼 클릭 시에 앱 설치
btn.addEventListener('click', (e)=>{
    defferedPrompt.prompt();
    defferedPrompt.userChoice.then((result)=>{
        if(result === 'accepted'){
            console.log('The app has been installed');
        }
        deferredPrompt = null;
    })
});
```

## Install Banner 디버깅
-  주소창에 `chrome://flags` 를 입력한뒤
-  사용자 참여 검색 항목 able 로변경(`Bypass user engagement checks`, `Enable native notifications`)

## 웹 앱 메니페스트 정리 및 트위터 소스 확인
[Web App Manifest Spec, W3C](https://www.w3.org/TR/appmanifest/)

[Web App Manifest Spec, MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest#Splash_screens)

[Getting Started w/ PWA, Addy](https://addyosmani.com/blog/getting-started-with-progressive-web-apps/)

[Don’t use iOS meta tags irresponsibly](https://medium.com/@firt/dont-use-ios-web-app-meta-tag-irresponsibly-in-your-progressive-web-apps-85d70f4438cb)

[Understanding the manifest](https://thishereweb.com/understanding-the-manifest-for-web-app-3f6cd2b853d6)

[포켓몬 도감 PWA](http://www.pocketjavascript.com/blog/2015/11/23/introducing-pokedex-org)
[Fullscreen Image](https://www.androidpolice.com/2017/03/23/chrome-beta-58-adds-support-full-screen-progressive-web-apps-minor-ui-changes-tweaks-custom-tabs-apk-download/)

# Service Worker
- `Caching`
- `Offline`
- `Native Features` : 모바일 푸쉬 알림 등

## 개요
- PWA의 오프라인 경험, 네이티브 기능의 구현 기반이 되는 서비스 워커 학습
- 기존 워커들과 차별화되는 서비스워커의 특징 이해 및 배경 소개
- 서비스워커를 구현하기 위한 등록, 설치, 활성화, 업데이트 학습 및 실습
- 서비스워커 구현을 위한 라이프싸이클 / 보조 라이브러리 소개 및 사용법 학습

## service worker 소개
- 브라우저와 서버 사이의 미들웨어 역할을 하는 자바 스크립트 파일
- PWA에서 가장 중요한 역할을 하고, Offline Expreience와 Mobile&Web Push의 기반 기술
- chrome://serviceworker-internals

## service worker 특징
1. 브라우저의 백그라운드에서 실행되면 웹페이지와 별개의 라이프 싸이클을 가짐
    - Javascript UI 쓰레드랑 별도로 동작하는 또 다른 쓰레드
2. 네트워크 요청을 가로챌 수 있어 해당 자원에 대한 캐쉬 제공 또는 서버에 자원 요청
    - 프로그래밍 가능한 네트워크 프록시
3. 브라우저 종속적인 생명주기로 백그라운드 동기화 기능 제공 
    - 페이지가 종료되도 service worker는 죽지 않고, 브라우저가 종료되어야 service worker가 죽는다
    - Push 알람의 진입점을 제공
4. Web & Mobile Push 수신이 가능하도록 Notification 제공
5. `naviator.serviceworker`로 접근한다. 
6. 기존 javascript와의 별개의 자체 스코프를 가짐 
    - 크롬 개발자 도구의 console 과의 별개의 서비스워커 전용 Console 존재
7. DOM에 직접적으로 접근이 불가능 - `postMessage()` 이용
8. 사용하지 않을 때 자체적으로 종료, 필요시에 다시동작 (event-driven 방식)

## Service Worker 배경
- 기존에 이미 존재하던 기술들을 보완 -> 그리고 진화

### AppCache (기존에 있던 HTML 표준)
- 오프라인 경험을 제공하기 위한 캐시 제공, HTML 표준
- 복수 페이지 앱에서 오동작, 파일 변화에 대한 둔감한 캐싱등의 문제

### workers
- 특정 작업을 병렬 스크립트로 백그라운드에서 실행 및 처리하기 위한 수단, HTML표준
- 종류 :
    - Dedicated Worker, 라이프싸이클 - 페이지 종속적
    - Shared Workers, 브라우징(브라우저) 켄텍스트 :
        - Javascript UI 쓰레드와 별개의 스크립트
        - 페이지에 비종속적
        - 직접적인 DOM 접근 불가
> A service worker is a type of web worker. -W3C Spec - 
> Service Workers are a new browser feature that provide event-deriven script that run independetly

## Service Worker 등록
- 서비스워커를 파일로 등록한다.
- 브라우저에 존재 유무를 확인 후 `register()` 사용
```js
if('serviceWorker' in naviator) {
    navigator.serviceWorker.register('/service-worker.js');
    navigator.serviceWorker.register('/service-worker.js').
        then(reg => console.log(reg)).
        catch(err => consol.lot(err));
}

```

## service worker 설치
- 캐쉬를 설치한다. 
- `register()`에서 등록한 스크립트 파일에서 install()호출
```js
self.addListener

```

```js
var CACHE_NAME = 'cache-v1'


```

```js
self.addEventListener('istall')

```


