# d.ts
https://kjwsx23.tistory.com/522
https://joshua1988.github.io/ts/usage/declaration.html

잘 생각해보자.
d.ts 란 무었인가?

임포트 할때 필요한것! 이라는걸 다시 상기할 필요가 있다.
임포트 하지 않을 파일에는(js 혹은 전역 타입) d.ts 가 필요 없다. 

> 타입스크립트 선언 파일 d.ts는 타입스크립트 코드의 타입 추론을 돕는 파일입니다. 예를 들어, 전역 변수로 선언한 변수를 특정 파일에서 import 구문 없이 사용하는 경우 해당 변수를 인식하지 못합니다. 그럴 때 아래와 같이 해당 변수를 선언해서 에러가 나지 않게 할 수 있습니다.

보통 js 파일만 있는경우 이 js 파일을 모듈로 활용하여 ts 파일에서 import 하고 싶을때, 타입이 없으니까 타입을 모른다고 애러가 날것이다. 
그래서 필요한게 해당 js 와 매칭되는 d.ts 파일
d.ts는 어디에 있어야 하는가?

