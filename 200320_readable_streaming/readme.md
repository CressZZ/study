# [Using readable streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams)

<!-- As a JavaScript developer, programmatically reading and manipulating streams of data received over the network, chunk by chunk, is very useful! But how do you use the Streams API’s readable stream functionality? This article explains the basics. -->

자바스크립트 개발자로서, 프로그래밍 적으로 네트워크로부터 chunk by chunk로 받은 데이터 스트림을 읽고 다루는 것은 매우 유용합니다! 그러나 어떻게 스트림 API의 읽기가능한 스트림(readable stream)을 잘 사용할수 있을까요. 이번 내용은 그것을 설명하고 있습니다. 

<!-- # Browser support
You can consume Fetch [Body](https://developer.mozilla.org/en-US/docs/Web/API/Body) objects as streams and create your own custom readable streams in Firefox 65+ and Chrome 42+ (and equivalent Chromium-based browsers). Pipe chains are only supported in Chrome at the moment, and that functionality is subject to change. -->

# 브라우저 지원 현황
우리는 파이어폭스 65+ 과 크롬 42+ 에서 Fetch Body 객체를 스트림으로서 사용 할수 있고, custom한 읽기 가능한 스트림을 만들수 있습니다. 현재는 [Pipe Chanis](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Concepts#Pipe_chains)의 경우 오직 크롬에서만 지원하고 있고 그 기능은 변경될 수 있습니다. 

# fetch를 스트림으로 사용 하는 것

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)는 XHR의 현대적인 대안으로서, 네트워크를 통해 리소스를 가져오게 합니다. Fetch API의 수많은 이점가운데 가장 좋은것은 브라우저들이 최근 fetch의 응담을 읽을수 있는 스트림(Readable stream)으로 이용할수 있는 기능을 추가했다 라는 점입니다. 

[Body](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 믹스인은 현제 [body](https://developer.mozilla.org/en-US/docs/Web/API/Body/body) 속성을 포함하고 있습니다. 그리고 이[body](https://developer.mozilla.org/en-US/docs/Web/API/Body/body)속성은 body의 내용을 읽을수 있는 스트림(Readable stream)으로 노출시키는 간단한 getter 입니다. Body 믹스인은 [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)와 [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) 인터페이스로부터 생성 되며, 따라서 두 경우 모두 사용 할수 있습니다. 다만 Response body의 스트림을 사용하는 것이 조금더 명확합니다.




# ReadableStream
[Stream API](https://developer.mozilla.org/ko/docs/Web/API/Streams_API)의 `ReadableStream` 인터페이스는 바이트 데이터의 읽을수 있는 스트림을 제공합니다. [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)는 [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)객체의 [body](https://developer.mozilla.org/en-US/docs/Web/API/Body/body)속성을 통하여 `ReadableStream`의 구체적인 인스턴스를 제공합니다. 

# 생성자 함수
[ReadableStream()](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/ReadableStream)
  읽을수 있는 스트림 객체를 생성하고 리턴 합니다. 

# 속성
[ReadableStrea.locked](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/locked) Read Only
  Readable strem이 reader에 고정되어있는지 여부를 리턴하는 getter.

# 메서드
[ReadableStream.cancel]
    스트림을 취소하여, 소비자가 스트림에 대해 관심이 없음을 알립니다. The supplied reason argument will be given to the underlying source, which may or may not use it.

[ReadableStream.getReader()]
    Reader를 만들고 스트림을 그 Reader에 고정 시킵니다. 스트림이 고정되어 있는 동안에는 다른 Reader를 얻을수 없습니다. 

[ReadableStream.pipeThrough()]
    인자로 주어지는 [WritableStream]과 현재의 ReadableStream을 연결하고 프로미스를 리턴합니다. 이 프로미스는 파이핑 프로세스가 성공적으로 완료될때 fullfil되며 애러가 발생했을때 reject됩니다. 

[ReadableStrem.tee()]
    The tee method tees this readable stream, returning a two-element array containing the two resulting branches as new ReadableStream instances. Each of those streams receives the same incoming data.

# Examples
아래 예시에서, 다른 리소스에서 fetche된 HTML 조각들을 스트림 하기위해 가공의 [Response]를 만듭니다. 이것은[Unit8Array]로 구성된 [ReadableStream]의 사용법을 보여줍니다. 
```js
fetch("https://www.example.org/").then((response) => {
  const reader = response.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      // The following function handles each data chunk
      function push() {
        // "done" is a Boolean and value a "Uint8Array"
        reader.read().then(({ done, value }) => {
          // Is there no more data to read?
          if (done) {
            // Tell the browser that we have finished sending data
            controller.close();
            return;
          }

          // Get the data and send it to the browser via the controller
          controller.enqueue(value);
          push();
        });
      };
      
      push();
    }
  });

  return new Response(stream, { headers: { "Content-Type": "text/html" } });
});
```