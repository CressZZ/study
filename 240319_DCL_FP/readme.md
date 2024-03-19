DCL (DOMContentLoaded): 이는 'DOMContentLoaded' 이벤트가 발생할 때를 의미해. 이 시점은 HTML이 완전히 로드되고 파싱됐을 때로, DOM이 완전히 구성되었으나, 스타일시트, 이미지, 서브프레임 등과 같은 외부 리소스는 아직 로드될 수도, 로드되지 않을 수도 있어.

FP (First Paint): '첫 번째 페인트'는 브라우저가 첫 번째 픽셀을 화면에 그리기 시작하는 시점을 가리켜. 이는 사용자가 페이지가 로드되기 시작했음을 시각적으로 인식할 수 있는 첫 순간을 의미해.

FCP (First Contentful Paint): '첫 번째 콘텐츠 페인트'는 텍스트, 이미지, 비디오 요소 또는 캔버스/SVG와 같은 콘텐츠가 화면에 처음 그려지는 시점을 나타내. 이 지표는 사용자가 페이지에서 실제 콘텐츠를 볼 수 있는 첫 시점을 의미해.

FMP (First Meaningful Paint): '첫 번째 의미 있는 페인트'는 사용자에게 페이지의 주요 콘텐츠가 보이기 시작하는 시점을 말해. 이 지표는 페이지의 '주요 콘텐츠'가 언제 화면에 나타나는지를 평가하기 위해 사용돼. 그러나 FMP는 공식적인 웹 성능 지표에서는 더 이상 널리 사용되지 않으며, 대신 LCP 같은 다른 지표로 대체되었어.

LCP (Largest Contentful Paint): '가장 큰 콘텐츠 페인트'는 뷰포트 내에서 가장 큰 콘텐츠 요소(예: 이미지, 비디오 블록, 큰 텍스트 블록 등)가 화면에 완전히 표시되는 시점을 말해. 이 지표는 페이지 로딩 중 사용자에게 중요한 콘텐츠가 언제 준비되는지를 측정해.

L (Load): '로드' 이벤트는 페이지의 모든 리소스가 로드되고 페이지 로딩이 완전히 완료된 시점을 나타내. 이는 JavaScript의 window.onload 이벤트가 발생하는 시점과 동일해.


https://stackoverflow.com/questions/34289535/why-first-paint-is-happening-before-domcontentloaded

http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#The_main_flow

It's important to understand that this is a gradual process. For better user experience, the rendering engine will try to display contents on the screen as soon as possible. It will not wait until all HTML is parsed before starting to build and layout the render tree. Parts of the content will be parsed and displayed, while the process continues with the rest of the contents that keeps coming from the network.


이것이 점진적인 과정이라는 것을 이해하는 것이 중요합니다. 더 나은 사용자 경험을 위해 렌더링 엔진은 가능한 한 빨리 콘텐츠를 화면에 표시하려고 시도합니다. 렌더 트리 구축 및 레이아웃을 시작하기 전에 모든 HTML이 구문 분석될 때까지 기다리지 않습니다. 콘텐츠의 일부는 구문 분석되어 표시되며, 네트워크에서 계속 들어오는 나머지 콘텐츠에 대한 프로세스가 계속됩니다.


# 즉,
DOMContentLoaded 전에 First Paint 가 발생할수 있고, 이건 렌더링 엔진이 가능한 빨리 콘텐츠를 화면에 표시하려고 하기 위함이다.