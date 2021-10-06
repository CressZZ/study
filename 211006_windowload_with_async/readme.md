https://docs.newrelic.com/docs/browser/new-relic-browser/page-load-timing-resources/page-load-timing-process/

>6. The page finishes rendering in the user's browser and the window load event fires. (For pages that use asynchronous loading, some elements may continue to load after the window load event occurs.)


위에 링크 한번 정독 해보자. 아직 안읽어봄 

찾아보게 된 이슈는

window.addEventListener('DOMContentLoaded') 의 시점이 애매모호 해서 이다.

콘텐츠가 다 로드 되지 않고, ajax로 불러온 어떤 json 파일이 Waiting (TTFB) 상태인대도 불구하고, window.onload 가 되어 버렸다. 

해서 찾아 보니 결론은 aysnc 를 사용하여 파일을 로드 할경우, window load event 가 먼저 발생하고, 로드를 이어서 한다는 이야기.

나의 경우에는 내파일에서 async (ajax)로 a.json 을 불러오고 있었고, 
이후에 다른 파일에서 b.json (ajax) 을 불러오고 있었고, 
css 파일에서 svg 등을 불러오고 있었는데, 

svg 파일 로드가 완료되면 (아마 동기일태니까) window.load 이벤트가 걸려 버린다. 
a.json 이 아직 다 불러와 지지도 않았는데!!!

(왜 css 파일에 있는 svg 가 script 의 ajax보다 늦게 실해되는지는 모르겠다.)
(css 파일 안쪽의 내용은 documnet.ready 시점에서 불러오나?)
(아! DOM 을 훑어 내려오면서 순서대로 이다!?)
(아닌데?)
(트리구조로 타고 내러오나 )

아무튼

그랬다. 

window.onload 의 시점은 모든 콘텐츠가 로드 되고 나서인데, (스크립트 안에 있는 동적 스크립트 등을 포함 모든 css 안의 이미지 포함)
ajax 호출의 경우 완료가 안되도, window.onload 가 될수 있다는 말이다. 

