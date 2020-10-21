```js
jQuery.get(`${staticUrl}/fonts/svg/lm/nc-symbols.svg`, (data) => { // 가져오면 자동으로 Response Header의 Content-Type이 image/svg+xml 로 설정 된다.ㅏ 
	const div = document.createElement("div");
	//xml 의 경우 documentElement를 통해 DOM 에 접근이 가능하다. 
	//new XMLSerializer().serializeToString 는 xml DOM을 스트링으로 바꿔 준다. 
	div.innerHTML = new XMLSerializer().serializeToString(data.documentElement); 
	
	// 여기서 아래의 코드가 추가 될수 있는데
	// 이렇게 스트링한 SVG 코드를 data:image/svg+xml;base64,~~~~~ 로 해주면
	// src 속성에 들어가서 svg 가 잘나오게 된다. 
	var img = document.createElement( "img" );
	img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svgText ) ); 
	documnet.body.appendChild(img);


	// 혹은 그냥 스트리으로 변환한 SVG 를 body에 갔다 붙일 수도 있다.
	document.body.insertBefore(div, document.body.childNodes[0]);
});

```