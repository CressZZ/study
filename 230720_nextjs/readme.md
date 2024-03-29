# 정적 페이지의 경우 서버 컴포넌트를 쓰는 이유
## 질문
음 아니 나는 초기 렌더링의 상황을 물어 본게 아니야. 초기 렌더링일때는 너의 말이 맞지. 그런데 내가 a.html 에서 test.html 로 라우터를 이용해 이동했다고 하자. 
만약 test.html 이 클라이언트 컴포넌트였다면, a.html 에 진입하여 초기 렌더링이 진행될때, 자바스크립트가 test.html 에 대한 내용을 가지고 있을 것이고, 그렇다면 test.html에 진입할때 서버에 별도 요청없이 페이지를 렌더링 할수 있잖아.
그런데 서버 컴포넌트라면 a.html에서 test.html 로 이동할때 test.html 에 대한 내용을 서버에 네트워크 요청해서 가지고 와야 하는거 아니냐는 거지

## 답변
ChatGPT
아, 이해했습니다. 그럼 그 질문에 대한 답을 하겠습니다. 맞습니다, 말씀하신 대로 test.html이 클라이언트 컴포넌트라면, 초기 로딩에서 해당 페이지에 대한 JavaScript 코드가 클라이언트에 다운로드 되었을 것이고, a.html에서 test.html로 라우팅 할 때 추가적인 네트워크 요청 없이 페이지를 렌더링 할 수 있을 것입니다.

반면에, 만약 test.html이 서버 컴포넌트라면, a.html에서 test.html로 이동할 때 서버에 요청을 보내고 서버는 해당 컴포넌트를 렌더링한 결과를 클라이언트에 보내주어야 합니다. 그래서 이 경우 네트워크 요청이 발생하게 됩니다.

`그러나, 여기서 고려해야 할 것은 "test.html"이 클라이언트 컴포넌트인 경우, 초기 로딩에서 "a.html"과 "test.html"에 대한 모든 JavaScript를 다운로드해야 한다는 점입니다. 이것은 초기 로딩 시간을 길게 할 수 있습니다. 또한 이는 사용하지 않는 코드를 다운로드하는 것을 의미하기도 합니다. 이는 특히 대규모 앱에서는 문제가 될 수 있습니다.`

이러한 상황을 고려하면, 정적인 페이지나 큰 의존성을 가진 컴포넌트는 서버 컴포넌트로 만드는 것이 이점이 있을 수 있습니다. 또한, React Server Component는 결과를 스트림으로 보내기 때문에, 네트워크 요청의 느린 시작 시간을 상쇄하는 경우가 많습니다.

그래서 서버 컴포넌트와 클라이언트 컴포넌트 사이의 선택은 애플리케이션의 특성과 필요에 따라 달라질 수 있습니다. 일부 컴포넌트는 서버에서 렌더링하는 것이 좋을 수 있고, 다른 일부 컴포넌트는 클라이언트에서 렌더링하는 것이 좋을 수 있습니다.

## 질문
그럼 좀 다른 질문인데, test.html 을 서버 컴포넌트를 사용했다고 할때, 초기 렌더링이 아닌경우, 즉 라우터를 통해 이동했을때 서버에서 주는 건 test.html의 html 문서는 아닌거지?
필요한 내용만 줘서, 브라우저내에서 필요한 내용만 갈아끼우는 거지? 
일반적으로 페이지가 변경됬을때의 그 깜빡임 없이.

## 답변
맞습니다. 서버에서 보내는 것은 전체 HTML 문서가 아닙니다. 대신 서버에서는 특정 서버 컴포넌트의 렌더링 결과만 보내줍니다. 클라이언트에서는 이 결과를 받아서 이미 렌더링된 페이지의 해당 부분만 갱신합니다.

즉, "test.html"에서 필요한 컴포넌트의 부분만 서버에서 렌더링되어 HTML 형태로 전송됩니다. 그런 다음 클라이언트(브라우저)는 해당 HTML을 받아 이미 로딩된 페이지에 병합하는 방식으로 작동합니다.

이런 방식은 일반적인 페이지 리로드와는 달리 페이지 전체를 새로 불러오지 않아서, 페이지가 완전히 깜빡이며 리로드되는 것을 방지하며, 사용자 경험을 더욱 부드럽게 만들어줍니다.

# data fetching 의 위치는 서버가 좋다
- [데이터 가져오기를 서버로 이동하면 성능과 사용자 경험이 향상됩니다.](https://nextjs.org/docs/getting-started/react-essentials#data-fetching)

# Client Components: 
- "Client Components"는 일반적으로 React 애플리케이션의 주요 컴포넌트들을 말해. 이러한 컴포넌트들은 주로 뷰(View)를 구성하고 사용자와 상호작용하며, React의 상태(State)와 컨텍스트(Context)를 사용하는 경우가 많지 않아.

# Provider components: 
- "Provider components"는 React의 Context API를 사용하여 상태를 관리하고 애플리케이션 내에서 전역적으로 데이터를 공유하는 역할을 하는 컴포넌트들을 말해. 이러한 컴포넌트들은 보통 애플리케이션의 최상위 루트에서 사용되며, Context를 제공하는 역할을 수행해.

# createContext / context


# Using context in Client Components
```tsx
// app/theme-provider.tsx

'use client'
 
import { createContext } from 'react'
 
export const ThemeContext = createContext({})
 
export default function ThemeProvider({ children }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```

```tsx
// app/layout.tsx

import ThemeProvider from './theme-provider'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```
- 그럼 next.js 에서  context provider 를 상단에 넣어버리면,  next.js 의 장점중 하나인 server component 의 서버 렌더링 장점이 사라지는거나 다름이 없는거네?

- 그런 면에서는 맞는 말이야. Context provider를 전역적으로 최상위에 배치하면 그 아래의 모든 컴포넌트들이 클라이언트 컴포넌트가 돼서 서버 렌더링이 불가능하게 되지. 이건 Next.js의 서버 컴포넌트를 활용하는 데 있어서 제한점이 될 수 있어.
하지만, 모든 상황이나 어플리케이션에서 전역적으로 Context provider를 최상위에 배치하는 것이 문제가 되는 것은 아니야. 이건 상황에 따라 다르지. 어플리케이션이 클라이언트에서 주로 동작하는 기능을 갖고 있다면, 서버 컴포넌트의 서버 렌더링 기능을 제대로 활용하지 못하는 것이 문제가 되지 않을 수 있어.
또한, 클라이언트 컴포넌트는 서버에서 사전 렌더링이 가능하기 때문에, 빠른 초기 페이지 로드 시간을 유지하면서도 클라이언트에서만 실행 가능한 코드를 사용할 수 있어.
그래서, Context provider를 어디에 배치할지 결정하는 것은 개발자의 판단에 달려 있어. 어플리케이션의 요구 사항과 서버와 클라이언트 사이에서 어떤 부분이 렌더링되어야 하는지를 고려해야 해. 그렇지 않으면 너가 말한대로 Next.js의 서버 컴포넌트의 장점을 제대로 활용하지 못할 수 있어.


# https://nextjs.org/docs/getting-started/react-essentials

- 이 문서는 React와 Next.js를 사용한 애플리케이션 개발에서 서버 컴포넌트와 클라이언트 컴포넌트에 대해 설명하고 있어. 이 둘은 서버와 클라이언트 간에 애플리케이션을 구축하는 데 도움을 주며, 클라이언트 측 앱의 풍부한 상호 작용과 서버 렌더링의 성능 향상을 결합해줘.

서버 컴포넌트를 이용하면 개발자들이 서버 인프라를 더 잘 활용할 수 있어. 예를 들어, 데이터를 서버에서 더 가까운 곳으로 가져오거나, 클라이언트 자바스크립트 번들 크기에 영향을 미치는 큰 의존성을 서버에 유지할 수 있어. 이로 인해 성능이 향상되며, 애플리케이션 성장에 따라 클라이언트 측 자바스크립트 번들 크기가 늘어나지 않아.

클라이언트 컴포넌트를 사용하면 애플리케이션에 클라이언트 측 상호작용을 추가할 수 있어. 이들은 서버에서 사전 렌더링되고 클라이언트에서 채워져.

이 둘을 적절하게 사용하면, 대부분의 컴포넌트는 상호 작용이 없고 서버 컴포넌트로 렌더링될 수 있어. *상호 작용하는 작은 UI 부분에는 클라이언트 컴포넌트를 추가할 수 있지.*

클라이언트 컴포넌트에만 존재하는 클라이언트 전용 코드를 실수로 서버에 포함시키는 것을 방지하기 위해 'server-only' 패키지를 사용할 수 있어. 이 패키지를 사용하면 서버 전용 코드를 포함하는 모듈을 클라이언트 컴포넌트에 잘못 임포트하는 경우 빌드 시간 오류가 발생해.

서버 컴포넌트 간에 데이터를 공유할 때는 React 상태가 아닌 네이티브 자바스크립트 패턴을 사용할 수 있어. 예를 들어, 여러 컴포넌트에서 데이터베이스 연결을 공유하려면 모듈을 사용할 수 있어.

마지막으로, 데이터를 가져올 때 페이지나 레이아웃과 그 하위 컴포넌트간에 결과를 공유하려는 경우가 있을 수 있어. 이는 컴포넌트 간에 불필요한 결합을 초래할 수 있으므로, 대신 데이터를 가져오는 작업을 데이터를 사용하는 컴포넌트와 같은 위치에 두는 것이 좋아. 이렇게 하면 서버 컴포넌트에서의 fetch 요청이 자동으로 중복 제거되므로, 각 라우트 세그먼트는 정확히 필요한 데이터만 요청할 수 있어.


# app router
- 앱 라우터는 페이지 라우터보다 우선합니다.


# 라우터 가로 체기
## 질문 1
For example, when clicking on a photo from within a feed, a modal overlaying the feed should show up with the photo. In this case, Next.js intercepts the /feed route and "masks" this URL to show /photo/123 instead.

이 문장이 이해가 잘안가, 어떤걸 가로첸다는 거지?

## 답 1
ChatGPT
이게 무슨 의미냐면, 사용자가 피드 내부의 사진을 클릭했을 때, 해당 사진을 보여주는 모달이 피드 위에 나타나는 상황을 말하는 거야. 이 때, Next.js는 원래의 "/feed" 라우트를 가로채서, 대신 "/photo/123" 이라는 URL을 보여주게 되는 거지.

실제로는 사용자가 여전히 "/feed" 페이지에 있지만, 모달에 "/photo/123"의 내용이 표시되는 거야. 그래서 만약에 사용자가 브라우저의 뒤로 가기 버튼을 클릭한다면, 모달이 닫혀서 원래의 "/feed" 페이지가 다시 보이게 되는 거지. 이렇게 라우트를 가로채는 기능 덕분에, 현재 페이지의 맥락을 유지하면서도 다른 페이지의 내용을 보여줄 수 있게 되는 거야. 이해됐어?




## 질문 2
굳이 왜? 
왜 /feed 라우터에서 /photo/123  url을 사용하려는지 이해가 잘안가. 
/feed 에서 사진을 모달로 보여줄대는 /feed/photo/123 이렇게 라우터를 쓰고, 
직접 사진을 보여주는 라우터는 /photo/123 으로 해서 따로 url 을 사용해도 전혀 문제가 없지 않아?
## 답 2
ChatGPT
아, 이해하는 거 같아. 진짜, 왜 이렇게 했을까?

근데 이건 사실 디자인 패턴의 일종이라고 보면 돼. 라우트 가로채기 기능은 모달을 통해 다른 페이지를 보여줄 때 유용하게 사용할 수 있는 거야. 예를 들어, 피드 페이지에서 사진을 클릭하면 모달로 사진이 나오는데, 이때 URL이 "/feed/photo/123"로 변경된다고 생각해봐. 사용자는 여전히 피드 페이지에 있지만, URL만 바뀌는 거지. 그럼 `이 상태에서 사용자가 URL을 복사해서 다른 사람에게 보낸다면 어떻게 될까?`

사실 이 URL은 피드 페이지 내의 특정 사진을 가리키는 거지만, 그렇게 바로 알아차리기는 어려울 수 있어. 대신 "/photo/123"라는 URL이라면, 이건 특정 사진을 가리키는 URL로 보이게 되는 거지. 이렇게 URL을 보기만 해도 어떤 페이지인지 알 수 있도록 하는 건 웹사이트를 사용하는 사람들에게 도움이 되는 거야.

그리고 이런 식으로 라우트를 가로채서 사용하면, 사용자가 뒤로 가기 버튼을 눌렀을 때 모달을 닫는 등의 추가적인 기능도 쉽게 구현할 수 있게 되는 거지. 물론 이건 선택사항이고, 항상 이렇게 해야 하는 건 아니야. 다만 이런 기능이 있으니, 필요에 따라 이런 식으로 사용할 수 있게 되는 거지. 이제 좀 더 이해가 돼?

# meta data
- 메타데이터는 layout.js 또는 page.js 파일에서 메타데이터 개체 또는 generateMetadata 함수를 내보내서 정의할 수 있습니다.
- 하지만 주의할 점이 있어. <head> 태그나 <title>이나 <meta> 같은 태그를 수동으로 root 레이아웃에 추가하면 안 돼. 대신에 Metadata API를 사용해야 해. 왜냐하면 이 API는 <head> 요소의 스트리밍과 중복 제거와 같은 고급 요구사항을 자동으로 처리해 주거든.


# Layout
## 최상위 레이아웃 
- 일반적으로 Root Layout 이라고도 하는데 app/ 하위에 꼭 있어야 한다. 
- 없어도 되는 경우는 mulitple root layout 을 구성할때 이다. 

## multiple root layout
- app/ 하위의 모든 폴더에 layout.js 가 있다면, 최상위에 layout.js 가 없어도 된다. 

