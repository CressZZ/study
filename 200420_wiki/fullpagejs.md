# Fullpage.js 개선

# 개요
프론트 엔드 개발을위해 구매하여 활발히 사용중인 fullpage.js 라이브러리에서 디버깅 콘솔창에 Error 메시지를 출력학고 있다. 해당 Error메시지는 실제 기능에 영향을 주지 않는 유형의 메시지로 파악되었으며, 디버깅을 할때 에러메세지가 보인다는 것 외에는 아무 이상이 없는 것으로 확인 되었다. 하지만 일단 Error 메시지가 정확이 어디서 발생하고 있으며, 라이브러리 사용자 입자에서 Error 메시지 출력을 방지할 수 있는지 확인해봄.

# 현황
[fullpage.js](https://github.com/alvarotrigo/fullPage.js)는 페이지 단위의 스크롤을 가능하게 하는 유료 라이브러리로서 현재 다수의 모바일게임 프론트엔드 페이지에서 사용 중이다. 
그 중 몇개의 페이지에서 
1. 디버깅 창을 열고 
2. 마우스 커서를 브라우저 내에서 브라우저 밖으로 이동시킬 경우
3. scrolloverflow.js:2412 Uncaught TypeError: Cannot read property '0' of null 이라는 메시지가 출력된다.

[gif]


## 원인
### Error 메시지 발생 조건
1. normalScrollElements 옵션을 true로 설정
2. scrollOverFlow 옵션을 true로 설정
3. 마우스 커서를 document 밖으로 이동

### Error 메시지 발생 코드

```js
/* fullpage.js */
    // ...

    // normalScrollElements 옵션이 켜져 있으면 
    // 아래의 이벤트 들에 대한 콜백으로 forMouseLeaveOrTouch 함수가 바인딩 된다. 
    if(options.normalScrollElements){
        ['mouseenter', 'touchstart'].forEach(function(eventName){
            forMouseLeaveOrTouch(eventName, false);
        });

        ['mouseleave', 'touchend'].forEach(function(eventName){
            forMouseLeaveOrTouch(eventName, true);
        });
    }

    function forMouseLeaveOrTouch(eventName, allowScrolling){
        document['fp_' + eventName] = allowScrolling;
    }

    function onMouseEnterOrLeave(e) {
        // ...

        var target = type === 'mouseleave' ? e.toElement || e.relatedTarget : e.target;

        // 다큐먼트 밖으로 마우스리브 이벤트가 트리거 되면 
        // target이 null이 되고 아래 코드를 타는데
        if(target == document || !target){
            setMouseHijack(true);
            // 여기에 scrollOverflow 옵션이 켜져 있으면 
            // fullpage.js가 사용하는 vendor 라이브러리인 scrollOVerflow.js의 
            // setIscroll 메서드가 생행된다. 
            if(isUsingScrollOverflow){
                options.scrollOverflowHandler.setIscroll(target, true);
            }
            return;
        }

        // ...
    }
```


```js
/* scrollOverflow.js */

    setIscroll: function(target, enable){
        if(!iscrollHandler.hasBeenInit){
            return;
        }
        // 여기서 target이 null값이 들어오면서 
        // null에 대한 0번째 요소를 찾을 수 없다는
        // scrolloverflow.js:2412 Uncaught TypeError: Cannot read property '0' of null 
        // 애러가 발생한다.
        var scrollable = fp_utils.closest(target, SCROLLABLE_SEL) || $(SCROLLABLE_SEL, target)[0];
        var action = enable ? 'enable' : 'disable';
        
        if(scrollable){
            scrollable.fp_iscrollInstance[action]();
        }
    },

```

## 대처
개발자 github에 issue등록 하였음. (200320)
개발자가 해당 이슈에 대한 독립적인 재현 코드를 만들어 달라는 요청을 하여, (200320)
codepen을 통하여 대응 함. (200324)

이후, 아직 진행상황 없음.
https://github.com/alvarotrigo/fullPage.js/issues/3931


## todo
만약 답변이 계속 없으면, 아래 내용으로 Pull Request 시도 예정.
```js
    function onMouseEnterOrLeave(e) {
        // ...

        var target = type === 'mouseleave' ? e.toElement || e.relatedTarget : e.target;
 
        // if(target == document || !target){   /* --- */
        if(target == document){   /* +++ */
            setMouseHijack(true);
            if(isUsingScrollOverflow){
                options.scrollOverflowHandler.setIscroll(target, true);
            }
            return;
        }

        // ...
    }

```
# 결론
일단 최우선적으로 생각했던 것은 옵션조정등 라이브러리 앞단에서 Error메시지 출력을 막는것 이었는데, 코드를 살펴본 결과 앞단에서 해결할 방법은 찾지 못하였다.
페이지를 보고 있는 유저에게는 영향이 없는 Error 메시지로 판단하였고, 이번에 코드를 살펴 보면서도 그런 판단을 유지 하였다. 즉, 실제 라이브러리 사용에 문제가 없는 버그로 보인다. 
다만, 개발자나 QA의 입장에서 Error 메시지의 출력은 매우 불안정해 보일수 있으므로 지속적으로 라이브러리 개발자와 커뮤니케이션 하여 문제 해결을 해야 겠다.
