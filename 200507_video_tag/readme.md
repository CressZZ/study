# 개요
특정페이지가 lte에서 접속 했을때 매우 느린 현상이 발생하였음

# 원인
모바일에서는 mp4 형식의 동영상이 캐쉬처리 되지 않음을 확인 (ios 사파리를 맥에 연결하여 네트워크 디버깅)
캐쉬처리 되지 않아도 화면이 보여야 하지 않는가?
Fullpage.on(‘afterRender’) 이벤트가 발생하기전에 body:before 에 검은색 화면의 덮개를 덮어놓고, 이벤트 발생후 해당 덮개를 없애는 로직이 있음
afterRender 는 여러 상황이 조합 되었을때, window.on(‘load’) 이벤트 발생후 트리거 되는 것으로 추측

```js
// scrolloverflow.js 

function scrollBarHandler(){
    var self = this;
    self.options = null;

    self.init = function(options, iscrollOptions){
        self.options = options;
        self.iscrollOptions = iscrollOptions;

        if(document.readyState === 'complete'){
            createScrollBarForAll();
            fullpage_api.shared.afterRenderActions();
        }
        //after DOM and images are loaded
        window.addEventListener('load', function(){
            createScrollBarForAll();
            fullpage_api.shared.afterRenderActions();
        });

        return self;
    };

```

즉, 영상이 완전히 로딩되기전에는 덮개가 안없어짐.
기존에는 백그라운드 영상 4~5개와 여러가지 영상이 붙어 있었고 autoplay 되고 있었음

# window.onLoad 와 video 의 autoplay 속성에 대해 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
<video style="width:100%;"  autoplay controls mute playsinline src="https://vod.plaync.com/Lineage2M/2020.04_veora%20update/bg_selihoden_raid.mp4?21" 
        oncanplay="myOnCanPlayFunction()"
        oncanplaythrough="myOnCanPlayThroughFunction()"
        onloadeddata="myOnLoadedData()"></video>
</body>

<script>
    function myOnCanPlayFunction() { console.log('-------------!!!Can play','readyState: ', document.querySelector('video').readyState); }
    function myOnCanPlayThroughFunction() { console.log('--------------!!!Can play through', 'readyState: ', document.querySelector('video').readyState); }
    function myOnLoadedData() { console.log('-------------!!!Loaded data', 'readyState: ', document.querySelector('video').readyState); }
    
    console.log('readyState: ', document.querySelector('video').readyState)

    var time = 0;
    var timer = setInterval(()=>{console.log(time++);  console.log('readyState: ', document.querySelector('video').readyState)}, 100)
    window.addEventListener('load', ()=>{ clearInterval(timer); console.log('window load - readyState: ', document.querySelector('video').readyState)})

</script>
</html>
```
## 아래 내용으로 태스트 함 
- `video` 태그의 `autoplay`속성을 제어 하며 
- `mp4` 파일의 쿼리를 바꿔가며 캐시를 막는다. 

## HTMLMediaElement.readyState

HAVE_NOTHING	0	No information is available about the media resource.
HAVE_METADATA	1	Enough of the media resource has been retrieved that the metadata attributes are initialized. Seeking will no longer raise an exception.
HAVE_CURRENT_DATA	2	Data is available for the current playback position, but not enough to actually play more than one frame.
HAVE_FUTURE_DATA	3	Data for the current playback position as well as for at least a little bit of time into the future is available (in other words, at least two frames of video, for example).
HAVE_ENOUGH_DATA	4	Enough data is available—and the download rate is high enough—that the media can be played through to the end without interruption. 

## autoplay 속성이 있을때 & 캐시 없을때
window load 시점은 video태그의 readyState가  0, 1, 3으로 순차적으로 바뀌다가 `3이되는` 시점에서 window.onLoad 트리거가 걸린다.
즉 window.onLoad 트리거 까지 시간이 오래 걸린다. 

## autoplay 속성이 없을때 & 캐시 없을때
video태그의 readyState가 0에서 4로 순식간에 바뀌며, 이미 0일때 window.onLoad 트리거가 걸린다.
즉 window.onLoad 트리거가 까지 시간이 적개 걸린다. 

# 이유는 무었일까?
알수 없다. 찾을 수 없다. 

