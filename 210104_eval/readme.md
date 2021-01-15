# eval 사용하면 안되는 이유
https://velog.io/@modolee/javascript-eval-is-evil

## 전역 실행 컨텍스트의 렉시컬 인바이런먼트를 오염 시킨다. 
https://recordar.tistory.com/entry/eval-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95

## 최신 JS 엔진에서 여러 코드 구조를 최적화하는 것과 달리 eval()은 JS 인터프리터를 사용해야 하기 때문에 다른 대안들보다 느림

# 사용할거면
함수로 감싸서 스코프를 분리해라.

# eval로 객체를 만들때 왜 `eval("(" + data + ")") 처럼 문자역 소괄호로 감싸야 하는가. 
- https://stackoverflow.com/questions/42755864/why-does-js-eval-return-only-the-value-of-an-object
- "{a: 'dd'}" 이란 스트링이 있다고 치자
- "" 는 스트링임을 알리는 거니까 삭제된다. 
- 그다음 {} 를 코드 블럭 유효 범위로 인식해서 {} 가 제거된다. (콘솔창에서 {} 로 치고 안에 무언가를 적어보자.)
- 그런다음 a: 를 label 로 인식한다. 
- 그런다음 'dd' 만 출력 한다. 그러니까 () 로 범위를 지정해줘야 한다. 


# 추가 JSON 에 대해
JSON 문법은 JavaScript 문법에 비해 제약이 있기 때문에, 유효한 JavaScript 리터럴이 JSON으로 변환되지 않는 경우도 있습니다. 예를 들어, JSON에서는 배열이나 객체를 콤마로 끝낼 수 없고, 객체 리터럴에서 속성명(키)은 반드시  따옴표로 감싸야 합니다. 나중에 JSON으로 파싱할 문자열을 생성할 때는 JSON 직렬 변환기JSON serializer를 사용하여야 합니다.