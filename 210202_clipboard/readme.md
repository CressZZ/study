# 클립보드를 사용하는건 크게 두가지가 있는데
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard#using_the_clipboard_api

# 1.execCommand () 사용



# 2.클립 보드 API 사용 navigator.clipboard.writeText(newClip).then(function() {})
- execCommand () 과 다른점은 execCommand () 은 범위를 지정해야 하는데, navigator.clipboard.writeText은 복사할 텍스트를 직접 입력할수 있다는점 (newClip)
- HTTPS에서만 ㅅ용가능

# 둘다 해당하는거
- navigator.permissions.query({name: "clipboard-write"}) 이 필요하다
- "clipboard-write" 은 브라우저에서 활성화된 탭이라면 허용상태가 된다. 
- 단, iframe 의 경우 별도로 허용해줘야 한다. https://w3c.github.io/webappsec-permissions-policy/#iframe-allow-attribute
- 

# navigator.clipboard.write(newClip).then(function() {})
요건 텍스트 뿐 아니라 이미지 같은것도 클립보드에 넣을수 있다. 
