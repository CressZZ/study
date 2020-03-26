# [Using readable streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams)

자바스크립트 개발자로서, 프로그래밍적으로 네트워크로부터 받은 데이터 스트림을 chunk단위로 읽고 다루는 것은 매우 유용합니다! 그러나 어떻게 스트림 API의 Readable stream을 잘 사용할수 있을까요. 이번 내용은 그것을 설명하고 있습니다. 

# 브라우저 지원 현황
파이어폭스 65+ 와 크롬 42+ 에ㅇ서 Fetch Body 객체를 스트림으로서 사용 할수 있고, custom readable 스트림을 만들수 있습니다. 현재 Pipe Chanis의 경우 오직 크롬에서만 지원하고 있고 그 기능은 변경될 수 있습니다. 

# fetch를 스트림으로 사용 하는 것

Fetch API는 네트워크를 통해 리소스를 가져는 현대적인 XHR의 대안책 입니다. Fetch API의 수많은 이점 가운데 가장 훌륭한점은 최근 브라우저들이 fetch response를 Readable stream으로 이용할수 있는 기능을 추가한것 입니다. 

Body 믹스인은 body 속성을 포함하고 있습니다. 그리고 이 body 속성은 body의 내용을 Readable 스트림으로 노출시키는 간단한 getter 입니다. 이 Body 믹스인은 Request와 Response 인터페이스로부터 구현 되며, 따라서 두 경우 모두 사용 할수 있습니다. 다만 Response body의 스트림을 사용하는 것이 조금더 명확합니다.

우리의 Simple stream pump 예시에서 보여주듯(예시 라이브 페이지), Response의 body 속성에 접근하면 됩니다. 

```js
// 오리지널 이미지 Fetch
fetch('./tortoise.png')
// body를 ReadableStream으로서 접근 
.then(response => response.body)
```
 
이것은 우리에게 ReadableStrem객체를 제공해줍니다.

reader 붙이기
이제 우리는 우리의 스트림화된 body를 가지고 있고, 스트림을 읽어들이기 위해서는 리더기를 붙일 필요가 있습니다.  ReadableStream.getReader()메서드를 사용하면 가능합니다. 

```js
// 오리지널 이미지 Fetch
fetch('./tortoise.png')
// body를 ReadableStream으로서 접근 
.then(response => response.body)
.then(body => {
    const reader = body.getReader();
})
```
이 메서드(ReadableStrea.getReader())는 리더를 생성하고 리더를 스트림에 고정(locks)시킵니다. - ReadableStreamDefaultReader.releseLock()메서드를 사용하여 이 고정이 풀리기 전까지, 다른 어떤 리더는 이 스트림을 읽을수 없습니다.

참고로 위의 예시는 한 스텝으로 줄일수 있습니다. r 

```js
// 오리지널 이미지 Fetch
  fetch('./tortoise.png')
  // body를 ReadableStream으로서 접근 
  .then(response => {
    const reader = response.body.getReader();
```

예를 들어 우리의 Simple stream pump example에서는 {{domxref("ReadableStreamDefaultReader.read()")}} 사용하여 Data Chunk 새로운 커스텀 ReadableStream에 집어 넣고 있습니다. 그리고 만약 읽을수 있는 Data Chunk가 또 있다면, {{domxref("ReadableStreamDefaultReader.read()")}} 를 다시 사용하여 또 다른 Data Chunk를 커스텀 ReadableStream에 집어 넣습니다. 더이상 읽을수 있는 Data Chunk가 없다면, 그 커스텀 ReadableStream(우리는 이 새로운 Readable 스트림에 대해 다음 섹션에서 다 자세히 살펴 볼것 입니다.)을 통해 새로운 {{domxref("Response")}} 객체를 생성합니다. 그 다음 이 {{domxref("Response")}} 객체를 {{domxref("Blob")}} 형태로 변환하고  이 {{domxref("Blob")}} 으로 부터 {{domxref("URL.createObjectURL()")}} 메서드를 사용하여 URL 객체를 생성합니다. 마지막으로 이 URL객체를 {htmlelement("img")}} 에 적용하여 이미지를 보여줌으로서 fetch된 오리지널 이미지를 효과적으로 복사하는 것입니다.

```js
 return new ReadableStream({
    start(controller) {
      return pump();
      function pump() {
        // 스트림 내부 큐의 다음 청크에 대한 액세스를 제공하는 psomise를 리턴한다.
        return reader.read().then(({ done, value }) => {
          // 더이상의 데이터 조각이 없을때 스트림을 닫는다
          if (done) {
              controller.close();
              return;
          }
          // 데이터 조각을 새로 타겟 스트림(새로 만드는 커스텀 스트림)에 넣는다.
          controller.enqueue(value);
          return pump();
        });
      }
    }  
  })
})
.then(stream => new Response(stream))
.then(response => response.blob())
.then(blob => URL.createObjectURL(blob))
.then(url => console.log(image.src = url))
.catch(err => console.error(err));

```

어떻게 read() 가 사용되었는지 자세히 들여다 봅시다. 위 예제의 pump() 함수는 제일먼저 read() 를 실행하였습니다. read() 는 스트림으로부터 읽어 들인 내용의 결과를 { done, value } 의 형식으로 가지고 있는 pomise를 반환합니다. 

```js

return reader.reader.read().then({done, value} => {})
```
read() 메서드의 결과는 3개의 타입이 될수 있습니다. 
- 만약 조각이(chunk)가 아직 읽을수 있는 상태라면 리턴되는 프로미스는 아래 형식의 객체와 함께 fullfile 될것입니다. 
{value: theChunk, done: false}
- 먄약 스트림이 닫힌경우라면 리턴되는 프로미스는 아래 형식의 객체와 함께 fullfile될것입니다. 
{value: undefined, done: true}
- 만약 스트림이 애러가 난다면 프로미스는 관련 error와 함께 reject될것 입니ㅏㄷ. 

다음으로, 우리는 done이 true인지 확인해야 합니다. 만약 true가 맞아면 더이상읠 조각(chunk)는 없으며(value는 undefined가 된다), 따라서 우리는 함수로 부터 return 해야 하며, ReadableStreamDefaultController.close()를 통하여 커스텀 스트림을 닫아야 합니다. 

```js
if(done){
    controller.close()
    return;
}
```
Note: 여기서 쓴 close() 는 새로운 커스텀 스트림의 것이며 오리지널 스트림의 것잉 아닙니다. 우리는 커스텀 스트림에 대해 다음 섹션에서 더 자세히 살펴 볼겁니다.

만약 done이 true라면, 일단 읽어 드린 새로운 조각(chunk) 을 처리하고 pump()함수를 다시 호출함으로서 다음 조각(chunk)를 읽습니다. 

```js
// Enqueue the next data chunk into our target stream
controller.enqueue(value);
return pump();
```

스트림 리더를 사용할 경우의 기본적인 패턴은 아래와 같습니다. 

1. 스트림을 읽으므로서 시작하는 함수를 작성합니다. 
2. 만약 더 읽을 스트림이 없다면 함수에서 리턴하여 나갑니다. 
3. 만약 더 읽을 스트림이 남아 있다면, 현재의 데이터 조각(chunk)을 처리하고 그런다음 함수를 재실행 합니다. 
4. 더 읽을 수 있는 스트림이 남아 있을때까지 함수를 재귀적으로 실행하고, 최종저긍로 2번 step을 따릅니다. 

# Creating your won custom readable strea 

두번째 장에서 사용했던 Simple stream pupmp 예제와 같이, fetch의 body로 부터 이미지를 조각들로(chunks) 읽은 다음에는 그 cunk를 우리가 만든 커스텀 스트림에 다시 옮겨 심어야 합니다. 우리는 ReadableStream() 생성자로 이 커스텀 스트림을 만들 수 있습니다. 

Tre ReadableStream() constructor
Fetch와 같이 브라우저가 스트림을 제공하는 경우 스트림을 읽는 것은 쉽습니다. 하지만 때때로 우리는 새로운 커스텀 스트림을 만들고 이것에 조각들(chunks)를 채워 넣어야 하기도 합니다. ReadableStream생성자는 처음에는 복잡해 보이지만 실제로는 그렇게 나쁘지 않은 아래의 구문을 통하여 이러한 것들을 가능하게 합니다.

일반적인 뼈대 문법은 다음과 같습니다. 

```js
const stream = new ReadableStrem (
    {
        start(controller){},
        pull(constroller){}, 
        cancel(){},
        type,
        autoAllocateChunkSize
    },{
        highWaterMark,
        size()
    }
});
```

생성자는 두개의 객체를 인자로 받습니다. 첫번째 객체는 필수 값이며 데이터를 읽어 들일 기본 소스 모델을 Javascript로 생성합니다. 두번째 객체는 필수 값은 아니며, 스트림에 사용할 custom queuing 전략을 설정하는데 필요합니다. 이것은 드물게 설정하는 값이므로 일단 첫번째 인자 객체에 집중해보도록 합시다. 

첫번째 객체는 5개의 맴버를 가질수 있으며, 첫번째 맴버만이 필수 값입니다. 
1. start(controller) - ReadableStream이 생성되자 마자 단 한번만 호출되는 메서드 입니다. 이 메서드 안에는 스트림을 효과적으로 설정할수 있는 코드가 포함되어야 합니다. 예를 들면 데이터 생성을 시작하는 것 이라던가 그렇지 않으면 접근 소스를 획득하는 것 입니다.
2. pull(controller) - 이 메서드는 스트림의 내무 큐가 가득찰때까지 반복적으로 호출 됩니다. 이것은 더 많은 조각들이(chunks)큐에 들어갈때 스트림을 제어 하는데 사용 됩니다. 
3. cancel() - 이 메서드는 스트림이 캔슬될때 호출 됩니다.(예를 들어 ReadableStream.cancel()이 호출 되었을때) 메서드의 내용은 스트림 소스를 고정한 것을 해제하는데 필요한 모든 것들을 수행 하는 것이어야 합니다. 
4. type and autoAllocateChunkSize - 이 맴버가 포함된 경우는 스트림이 바이트 스트림으로 된다 라는 것을 명시할때 입니다. 바이트 스트림은 다른 튜토리얼에서 다룰 예정입니다. 왜냐하면 바이트 스트림은 일반적인 스트림에 대비하여 그 목적과 사용법이 다르기 때무입니다. 또한 이것들은 아직 어디에서도 구현되지 않았습니다. 

우리의 simple code예제를 다시한번 살펴 보면, ReadableStrema() 생성자가 오로지 단하나의 메서드 start() 만 가지고 있는걸 볼수 있습니다. 이것은 fetch 스트림으로부터 모든 데이터를 읽는 것을 제공합니다. 

```js

return new ReadableStream({
    start(controller) {
      return pump();
      function pump() {
        return reader.read().then(({ done, value }) => {
          // When no more data needs to be consumed, close the stream
          if (done) {
            controller.close();
            return;
          }
          // Enqueue the next data chunk into our target stream
          controller.enqueue(value);
          return pump();
        });
      }
    }  
  })
})
```

ReadableStream controllers
ReadableStrem() 생성자에 인자로 전달된 객체안의 start()와 pull()메서드에 controller라는 인자가 전달되는 것을 볼수 있습니다. 이것은 ReadableStreamDefaultController 클래스의 인스턴스이며 우리의 스트림을 제어하는데 사용 됩니다. 

우리의 예제에서, 우리는 fetch된 body로부터 chunks의 값을 읽은 뒤 그 값을 커스텀 스트림에 집어 넣기 위하여 컨트롤러(ReadableStreamDefaultController 클래스의 인스턴스)의 enqueue() 메서드를 상용하고 있습니다. 

또한, fetch된 body를 읽어들이는 것을 완료 했을때 우리는 커스텀 스트림을 닫기 위해 컨트롤러의 close() 메서드를 사용합니다. close() 메서드를 사용한 바로 이때에는 이미 들어가 있는 chunks는 여전히 읽을 수 있지만 다른 새로운것들은 커스텀 스트림에 넣을수 없습니다. 그리고 chunks를 읽는것이 끝나면 스트림은 닫혀 버립니다.

Reading from custom streams

우리의 예제에서, 우리는 Response 생성자 함수에 커스텀 readable 스트림을 인자로 전달하였고 그 후 생성된 response 인스턴스를 blob()으로 사용 하였습니다. 

```js
.then(stream => new Response(stream))
.then(response => response.blob())
.then(blob => URL.createObjectURL(blob))
.then(url => console.log(image.src = url))
.catch(err => console.error(err));

```

그러나 커스텀 스트림은 여전히 ReadableStream 인스턴스이며, 이것의 의미는 우리는 여전히 커스텀 스트림에 reader를 붙일 수 있다는 의미이다. 이 예로 Simple random stream demo(see it live also)를 살펴보자. 이 예에서는 커스텀 스트림을 생성하고 그 스트림에 랜덤 문자열을 집어 넣는다. 그런다음 문자열 생성 중지 버튼을 누를때 스트림으로부터 데이터를 읽어 들인다. 

Note: FethEvent.respondWith() 메서드를 사용하여 스트림을 사용하기 위하여 스트림에 삽입되는 내용은 반드시 Unit8Array 타입이어야 한다. 이것은 TextEncoder를 사용하여 만들수 있다. 

 Simple random stream demo (see it live also)예제 에서 커스텀 스트림 생성자는 WindowTimers.setInterval()을 호출하여 매 초마다 랜덤 문자열을 생성하는 start() 메서드를 가지고 있다. 그런다음 사로 생성된 문자열을 스트림에 집어 넣기 위하여 ReadableStreamDefaultController.enqueue() 메서드가 사용된다. 문자열 생성 중지 버튼을 누르면 이 interval 은 취소되며, readStream() 이라는 임의로 만든 함수를 실행하여 스트림으로부터 데이터를 다시 읽어 들인다. 또한 새로운 데이터를 스트림에 집어 넣지 않기 위하여 우리는 스트림을 닫는다. 

 ```js
const stream = new ReadableStream({
  start(controller) {
    interval = setInterval(() => {
      let string = randomChars();
      // Add the string to the stream
      controller.enqueue(string);
      // show it on the screen
      let listItem = document.createElement('li');
      listItem.textContent = string;
      list1.appendChild(listItem);
    }, 1000);
    button.addEventListener('click', function() {
      clearInterval(interval);
      readStream();
      controller.close();
    })
  },
  pull(controller) {
    // We don't really need a pull in this example
  },
  cancel() {
    // This is called if the reader cancels,
    // so we should stop generating strings
    clearInterval(interval);
  }
});

 ```
 readStream() 함수를 보면 ReadiableStream.getReader()를 사용하여 reader를 스트림에 고정(lock) 시키고, 앞서 살펴봤던 패턴과 마찬가지로 read()를 사용하여 chunk들을 읽고, done이 true인지 아닌지 확인하여 만약 true이면 프로세스를 끝내버리고 그렇지 않으면 읽어 들인 chunk를 후속 처리한후 read()메서드를 재 실행한다. 

 ```js
function readStream() {
  const reader = stream.getReader();
  let charsReceived = 0;

  // read() returns a promise that resolves
  // when a value has been received
  reader.read().then(function processText({ done, value }) {
    // Result objects contain two properties:
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
    if (done) {
      console.log("Stream complete");
      para.textContent = result;
      return;
    }

    charsReceived += value.length;
    const chunk = value;
    let listItem = document.createElement('li');
    listItem.textContent = 'Read ' + charsReceived + ' characters so far. Current chunk = ' + chunk;
    list2.appendChild(listItem);

    result += chunk;

    // Read some more, and call this function again
    return reader.read().then(processText);
  });
}
 ```

Closing and cancelling streams

우리는 이미 ReadableStreamDefaultController.close()를 사용하여 리더기를 닫는 예제를 살펴 보았습니다. 리더기가 닫혔을 경우 앞서 언급한 것처럼 이미 삽입된 chunks는 읽을수 있습니다만 더이상의 chunk는 삽입할수 없습니다. 

만약 스트림을 완벽하게 제거하고 삽입되어 있는 chunk들을 포기하고 싶다면 ReadableStream.cancel() 또는 ReadableStreamDefaultReader.cancel()을 사용 하십시요

# Teeinig a Stream
때때로 스트림을 동시에 두번 읽어 들일 필요가 있습니다. 이것은 ReadableStrea.tee()메서드를 통해 가능합니다. ReadabelStream.tee()메서드는 원본 readable 스트림의 독립적인 두개의 복사본을 가진 배열을 리턴하고 이 독립적인 두개의 복사본 스트림은 두개의 리더기를 통해 각각 읽어 들일수 있습니다. 

만약 서버로부터 fetch된 response를 브라우저에도 전달해야 할 뿐만아니라 서비스워커 캐쉬에도 전달 해야 하는 상황이 그러한 예시 입니다. response body는 한번이상 사용하수 없으며 하나의 스트림은 한번에 하나의 리더로만 읽어들일수 있기 때문에 두개의 카피된 스트림이 필요 합니다. 

우리는 Simple tee example(see it live also)를 통해 위에 해당하는 예제를 제공합니다. 이 예제는 랜덤 문자열 중지 버튼을 눌렀을때 커스텀 스트림을 가져와 teed 시켜 두개의 스트림을 읽어들인다는 점만 빼고, 앞서 살펴본 Simple random stream예제와 매우 유사합니다.

```js
function teeStream(){
    const teedOff = stream.tee();
    readStream(teedOff[0], list2); // readStream('Custom Stream', 'List Element')
    readStream(teedOff[1], list3); // readStream('Custom Stream', 'List Element')
}
```

















# (ReadableStream)[https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream]
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