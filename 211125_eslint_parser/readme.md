# @babel/eslint-parser
[@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)
>You only need to use @babel/eslint-parser if you are using Babel to transform your code. If this is not the case, please use the relevant parser for your chosen flavor of ECMAScript (note that the default parser supports all non-experimental syntax as well as JSX).

>you don't have to use it just because you are using Babe

즉, 타입스크립트정도 사용할때만 @babel/eslint-parser 를 사용하라는 이야기. 바벨 쓴다고, @babel/eslint-parser 를 사용하는 것은 아니라는 이야기 이다. 

# 그럼 parser 란
> ESLint는 사용자 정의 파서를 사용할 수 있습니다. 이 플러그인을 사용하면 Babel의 파서(Babel 구성 파일에 지정된 구성 사용)가 코드를 구문 분석하고 결과 AST는 ESLint가 이해할 수 있는 ESTree 호환 구조로 변환됩니다. 행 번호, 열과 같은 모든 위치 정보도 유지되므로 오류를 쉽게 추적할 수 있습니다.

# Class fields
그런데 [Class fields](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Public_class_fields) 사용하려면 [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) 사용해야 한다. 