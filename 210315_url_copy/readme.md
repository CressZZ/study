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


```js
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

### HTMLInputElement.setSelectionRange(0, 9999) / HTMLInputElement.select() 를 사용하는 방법

```js
  textArea.focus(); // IOS 12 이하 지원을 위해 사용해야 할듯 하다 

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
  
# 참고
- https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
- https://sustainable-dev.tistory.com/95
- https://javascript.info/selection-range
  