As a JavaScript developer, programmatically reading and manipulating streams of data received over the network, chunk by chunk, is very useful! But how do you use the Streams API’s readable stream functionality? This article explains the basics.

자바스크립트 개발자로서, 프로그래밍 적으로 네트워크로부터 chunk by chunk로 받은 데이터 스트림을 읽고 다루는 것은 매우 유용합니다! 그러나 어떻게 스트림 API의 읽기가능한 스트림(readable stream)을 잘 사용할수 있을까요. 이번 내용은 그것을 설명하고 있습니다. 

# Browser support
You can consume Fetch [Body](https://developer.mozilla.org/en-US/docs/Web/API/Body) objects as streams and create your own custom readable streams in Firefox 65+ and Chrome 42+ (and equivalent Chromium-based browsers). Pipe chains are only supported in Chrome at the moment, and that functionality is subject to change.

우리는 파이어폭스 65+ 과 크롬 42+ 에서 Fetch Body 객체를 스트림으로서 사용 할수 있고, custom한 읽기 가능한 스트림을 만들수 있습니다. 현재는 [Pipe Chanis](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Concepts#Pipe_chains)의 경우 오직 크롬에서만 지원하고 있고 