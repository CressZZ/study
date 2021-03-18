# URL 복사하기 기능에 대해서 

# 1. 최신브라우저 복사하기 - Clipboard.write() 
- Clipboard.write() 
- https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write
- **IE안됨, IOS 사파리 13.4 이하 안됨, MAC 사파리 13.1 이하 안됨**
- HTTP 안됨

## Clipboard.write() 의 permission 
- "clipboard-write" permission 이 필요하다. 
- 브라우저에서 활성화 된 탭의 window에서는 자동으로 허용상태이다.
- iframe 은 별도로 설정해 주지 않으면 비허용 상태이다. 즉, "clipboard-write" permission이 막혀 있으므로 Clipboard.write()를 사용할수 없다. 
- permission 확인 방법 (비동기) - https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query

### Safari의 경우 
- IOS 사파리, MAC 사파리 모두 navigator.Permissions 객체가 없다. 
- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/permissions)

```js
  // 사파리는 navigator.permissions이 없음.
  // navigator.permissions 를 체크하는 이유는 iframe 상태에서는 permission이 허용 상태가 아니기 때문이다.
  if(navigator.permissions){
    navigator.permissions.query({name: "clipboard-write"})
    .then((permission)=>{
      // permission.state가 granted인 상태에서만 navigator.clipboard에 접근 가능
      // 스크립트가 실행되는 window가 브라우저에서 활성화된 탭이라면 자동 허용상태 이지만,
      if(permission.state == 'granted'){
        navigator.clipboard.writeText(text).then(
          () => { doneCallback.call(null, text); },
          error => { failCallback.call(null, error); }
        );
      // iframe 은 별도로 설정해 주지 않으면 비허용 상태이거나, 퍼플 인베디드 인경우 비허용 상태이다.
      // 즉, 분기를 태운이유는 iframe 때문임.
      }else{
        ShareUtil.copyTextToClipboardFallback(text, doneCallback, failCallback);
      }
    })
    .catch(err=>console.error(err))
  }else{
    // navigator.clipboard가 있는데 navigator.permissions이 없으면 그냥 바로 navigator.clipboard 실행
    // IOS safari와 MAC safari가 navigator.permissions 이 없다.
    navigator.clipboard.writeText(text).then(
      () => { doneCallback.call(null, text); },
      error => { failCallback.call(null, error); }
    );
  }
```
  

# 2. 구형 브라우저 복사하기 - Range 객체 / Selection 객체 / document.execCommand('copy')
1) 복사할 문구를 셀렉트 한다. 
2) 복사한다. 
  
## 구형 브라우저 - 셀렉트 하는법 
### Range 객체 / Selection 객체를 사용하는 방법
- https://javascript.info/selection-range
```js
	// range 지정
    const range = document.createRange();
    range.selectNodeContents( document.querySelector('.test'));

	// Selection 객체 생성
    const selection = window.getSelection(); // document.getSelection(); 도 됨
    selection.removeAllRanges();
    selection.addRange(range);
```
- [현재 getSelection()이 Firefox, Edge (Legacy) 및 Internet Explorer의 textarea 및 input 요소의 내용에서 작동하지 않는다는 점은 주목할 가치가 있습니다. HTMLInputElement.setSelectionRange() 또는 selectionStart 및 selectionEnd 속성을 사용하여이 문제를 해결할 수 있습니다.](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection#related_objects)
- 크롬에서는 input과 textarea 모두에서 동작하는 것으로 확인 함

#### 실제로 Edge에서의 Selection 객체 문제 
- 위에서 처럼 getSelection()이 Edge에서 안될수 있다. 
- 실제로 안되는 경우에는 textarea 용초를 사용하고 있었고 window.getSelection().addRange(range); 처럼 Selection 객체만을 사용하고 있었다. 
- Edge 에서 url 복사가 안되는 이슈가 있었다. 위 MDN에서는 HTMLInputElement.setSelectionRange()를 사용하라고 나와 있었으나, 당시에는 HTMLInputElement.select()로 해결했다.
```js
    textArea.focus();
    textArea.select();
```
#### 실제로 IOS에서의 Selection 객체 문제 
- 최신 IOS는 Clipboard.write()를 쓰기 때문에 Selection을 사용할 단계까지 오지 않았다. 
- 강제로 Selection을 사용하는 로직으로 넘어오니, Edge와 같이 textarea 에서 addRange() 가 적용되지 않는것 같다. 
- ...이유는 모르겠으나 이경우에도 HTMLInputElement.setSelectionRange(0, 9999) 을 사용해야 정상적으로 Selection 객체에 select 가 지정되는 것으로 보인다. 
- [stackoverlfow](https://stackoverflow.com/questions/3272089/programmatically-selecting-text-in-an-input-field-on-ios-devices-mobile-safari)
- 최신 IOS도 동일

#### Chrome (최신버전 포함) 및 IOS 최신 에서 Range 객체의 문제
- 크롬 최신버전에서 Clipboard.write()를 쓰기 때문에 Selection을 사용할 단계까지 오지 않았다. 
- 크롬에서는 selectNodeContents 에서 문제가 발생한다
- [찾아보니](https://stackoverflow.com/questions/47879184/document-execcommandcopy-not-working-on-chrome/47880284) range.selectNodeContents(textarea) 의 문제이다. 
- range.selectNode(textarea) 을 사용하라고 한다. 

#### Chrome (최신버전 포함)에서 Range 객체의 문제2
- 그래도 나는 range.selectNodeContents(textarea)를 사용하고 싶다고 한다면, (사실 안되지만)
- 대체용으로 아래의 HTMLInputElement.setSelectionRange(0, 9999) / HTMLInputElement.select() 를 사용할수 있으나, 
- 이걸 사용하면 IOS는 사용가능한데, 크롬에서는 안된다. 크롬에서는 반드시 focus()가 있어야 한다. (밑에 다시설명 => IOS 12버전 이하 HTMLInputElement.select() 메서드가 동작하지 않는 문제)
- focus() 관련으로 [stackoverflow](https://stackoverflow.com/questions/3272089/programmatically-selecting-text-in-an-input-field-on-ios-devices-mobile-safari) 및 아래 참조
- This only worked for me if I triggered .focus() on the input before invoking input.setSelectionRange. If you're listening for the focus event on the input, remember to account for an infinite loop. – allieferr May 29 '14 at 19:37
- I spent over an hour playing with various solutions. Calling setSelectionRange() in a focus handler works when you trigger .focus() programmatically, but when you manually tap into the text input on iOS, the selection does not happen. Suffice it to say, all you need to do is call setSelectionRange() within a setTimeout of 0 and it works as expected no matter what triggers the focus. – user2609094 Apr 1 '16 at 6:11
### HTMLInputElement.setSelectionRange(0, 9999) / HTMLInputElement.select() 를 사용하는 방법

```js
  textArea.focus(); // IOS 12 이하 지원 및 크롬의 textarea에서의 setSelectionRange() 을 위해 사용해야 할듯 하다 

  textArea.setSelectionRange(0, 999999); // 이거를 쓰거나 
  textArea.slect(); // 이거를 쓴다
```

#### IOS 12버전 이하 HTMLInputElement.select() 메서드가 동작하지 않는 문제
- [In browsers where it is not supported, it is possible to replace it with a call to HTMLInputElement.setSelectionRange() with parameters 0 and the input's value length:](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select#notes)
-  HTMLInputElement.select() 지원이 되지 않은 브라우저의 경우 setSelectionRange(0, 999999) 을 사용해야 한다.
- 테스트 결과 IOS 가 12버전 이하이면 아래의 코드가 동작 하지 않는다. 

```js
    textArea.focus();
    textArea.select();
```
- 아래의 코드로 변경해줘야 한다. 
```js
   	textArea.focus();
    textArea.setSelectionRange(0, 999999);
```
- MDN 에서는 select() 가 IOS 1 부터 지원된다고는 하는데, 테스트 해보면 안되는것 같다
- [어떤 stackoverflow](https://stackoverflow.com/questions/3272089/programmatically-selecting-text-in-an-input-field-on-ios-devices-mobile-safari)와 [어떤 개인블로그](https://nicolasbouliane.com/blog/input-select-does-not-work-on-ios)에서는 일단 ios 에서는 textArea.select(); 안되고, setSelectionRange()을 써야 하는데 반드시 focus()와 함께 써야 동작한다고 나온다. 근데 focus()없어도 동작한다. 이건 12버전 이하의 경우의 이야기인것같다. 
- 왜냐하면 블로그 작성일자는 2015.06.29, stackoverflow는 2010.07.17이고 IOS 12버전은 [2018.09.17](https://en.wikipedia.org/wiki/IOS_12)에 나왔기 때문이다.
- 그런데 크롬에서는 textarea에서  select / setSelectionRange 을 사용하기 위해서 focus()를 사용해야 한다. 사실 focus()의 문제는 아니나 일단 focus()로 대체 가능하다. https://stackoverflow.com/questions/11723420/chrome-setselectionrange-not-work-in-oninput-handler/56183725
- focus()에 대한 내용이 모두 크롬에 해당한다는 이야기 이다. 
  
## 구형 브라우저 - 복사하는법 
```js
document.execCommand('copy');
```
- IE에서는 권한을 요청 한다.

## 더 구형 브라우저 - 복사하는법
- 참고로 IOS 9버전 이하에서는 document.execCommand('copy'); 를 지원 하지 않는다. [caniuse](https://caniuse.com/?search=execCommand%20copy)
- [It only supports OS clipboard reading/writing via shortcut keys, not through document.execCommand(). Note that "shorcut key" means some clickable (e.g. copy/paste action menu or custom iOS keyboard shortcut) or physical key (e.g. connected bluetooth keyboard).](https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios)
- 즉 유저가 직접 ios 원래 기능인 copy 버튼을 눌러야 한다는 것이다. (프로그래밍적으로 해줄수 없음)
- 그러기 위한 코드
```js
window.prompt('이 url을 복사해 가세요!', 'https://lineage2m.plaync.com');
```
- 너무 옛날 버전지원이라 없어도 될듯하다.
  
# 추가 참고사항 
## textArea.readOnly = true;
- 아이폰 등에서 문구가 select 될때 키보드가 올라오는것을 방지한다. (IOS 최신버전에서도 키보드가 올라옴)
- textArea.setSelectionRange(0, 999999) / selection.addRange(range)
- 위에서 한번 언급했지만 selection.addRange(range) 은 IOS 에서 textarea에는 동작 하지 않는다. 
## textArea.contentEditable = true;
- [stackoverflow](https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios/34046084)에 따르면 IOS 는 form 태그 안에 있는 것이 아닌 input/textarea의 문구의 경우 반드시 contentEditable attribute가 true 로 설정되어야 한다고 하는데, 최신 IOS기준으로는 해당 속성의 여부에 상관없이 셀렉트/복사 잘된다. 
  

# TL;DR
```js

let ShareUtil = {
  // copy url 참고 : https://wiki.ncsoft.com/display/PTG/URL+Copy
  copyTextToClipboard: (text, doneCallback = null, failCallback = null) => {

    // IE는 navigator.clipboard 없음, HTTP 상태에서 navigator.clipboard 없음
    if (!navigator.clipboard) {
      ShareUtil.copyTextToClipboardFallback(text, doneCallback, failCallback);
    } else {
      // 사파리는 navigator.permissions이 없음.
      // navigator.permissions 를 체크하는 이유는 iframe 상태에서는 permission이 허용 상태가 아니기 때문이다.
      if(navigator.permissions){
        navigator.permissions.query({name: "clipboard-write"})
        .then((permission)=>{
          // permission.state가 granted인 상태에서만 navigator.clipboard에 접근 가능
          // 스크립트가 실행되는 window가 브라우저에서 활성화된 탭이라면 자동 허용상태 이지만,
          if(permission.state == 'granted'){
            navigator.clipboard.writeText(text).then(
              () => { doneCallback.call(null, text); },
              error => { failCallback.call(null, error); }
            );
          // iframe 은 별도로 설정해 주지 않으면 비허용 상태이거나, 퍼플 인베디드 인경우 비허용 상태이다.
          // 즉, 분기를 태운이유는 iframe 때문임.
          }else{
            ShareUtil.copyTextToClipboardFallback(text, doneCallback, failCallback);
          }
        })
        .catch(err=>console.error(err))
      }else{
        // navigator.clipboard가 있는데 navigator.permissions이 없으면 그냥 바로 navigator.clipboard 실행
        // IOS safari와 MAC safari가 navigator.permissions 이 없다.
        navigator.clipboard.writeText(text).then(
          () => { doneCallback.call(null, text); },
          error => { failCallback.call(null, error); }
        );
      }
    }
  },

  copyTextToClipboardFallback: ( text, doneCallback = null, failCallback = null ) => {

    // 임시 textarea 생성
    const textArea = document.createElement("textarea");
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.value = text;
    document.body.appendChild(textArea);

    textArea.contentEditable = true; // IOS 대응
    textArea.readOnly = true; // IOS 키보드 올라오는 방지

    // range 객체 생성
    const range = document.createRange();
    range.selectNodeContents(textArea);

    // selection 객체 생성
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // IOS, Edge 등 input/textarea에 selection객체 잘 동작안하는것 대응
    // https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
    textArea.setSelectionRange(0, 999999);

    try {
      const isSuccessCopy = document.execCommand("copy");
      if (isSuccessCopy) {
        if (doneCallback) doneCallback.call(null, text);
        return;
      }
      if (doneCallback) doneCallback.call(null, text);
      return;
    } catch (error) {
      if (failCallback) failCallback.call(null, error);
    }
    document.body.removeChild(textArea);
  },
};



```

# 참고
- https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
- https://sustainable-dev.tistory.com/95
- https://javascript.info/selection-range
- https://stackoverflow.com/questions/47879184/document-execcommandcopy-not-working-on-chrome/47880284