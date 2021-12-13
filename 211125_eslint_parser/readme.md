# eslint 
좋은 참고 문서 -> https://develoger.kr/frontend/eslint-%ea%b8%b0%eb%b3%b8%ec%a0%81%ec%9d%b8-%ec%82%ac%ec%9a%a9%eb%b2%95/

https://velog.io/@kyusung/eslint-config-2
# @babel/eslint-parser
[@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)
>You only need to use @babel/eslint-parser if you are using Babel to transform your code. If this is not the case, please use the relevant parser for your chosen flavor of ECMAScript (note that the default parser supports all non-experimental syntax as well as JSX).

>you don't have to use it just because you are using Babe

즉, 타입스크립트정도 사용할때만 @babel/eslint-parser 를 사용하라는 이야기. 바벨 쓴다고, @babel/eslint-parser 를 사용하는 것은 아니라는 이야기 이다. 

# 그럼 parser 란
> ESLint는 사용자 정의 파서를 사용할 수 있습니다. 이 플러그인을 사용하면 Babel의 파서(Babel 구성 파일에 지정된 구성 사용)가 코드를 구문 분석하고 결과 AST는 ESLint가 이해할 수 있는 ESTree 호환 구조로 변환됩니다. 행 번호, 열과 같은 모든 위치 정보도 유지되므로 오류를 쉽게 추적할 수 있습니다.

# Class fields
그런데 [Class fields](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Public_class_fields) 사용하려면 [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) 사용해야 한다. 
왜냐하면 아직 stage3 이니까 그렇겠지...


# 실험적 기능이란
https://github.com/eslint/eslint/blob/a675c89573836adaf108a932696b061946abf1e6/README.md#what-about-experimental-features

ESLint's parser only officially supports the latest final ECMAScript standard. We will make changes to core rules in order to avoid crashes on stage 3 ECMAScript syntax proposals (as long as they are implemented using the correct experimental ESTree syntax). We may make changes to core rules to better work with language extensions (such as JSX, Flow, and TypeScript) on a case-by-case basis.

In other cases (including if rules need to warn on more or fewer cases due to new syntax, rather than just not crashing), we recommend you use other parsers and/or rule plugins. If you are using Babel, you can use the babel-eslint parser and eslint-plugin-babel to use any option available in Babel.

Once a language feature has been adopted into the ECMAScript standard (stage 4 according to the TC39 process), we will accept issues and pull requests related to the new feature, subject to our contributing guidelines. Until then, please use the appropriate parser and plugin(s) for your experimental feature.

# parser & plugin 
In other cases (including if rules need to warn on more or fewer cases due to new syntax, rather than just not crashing), we recommend you use other parsers and/or rule plugins. If you are using Babel, you can use the babel-eslint parser and eslint-plugin-babel to use any option available in Babel.
> 다른 경우(단순히 충돌하지 않는 것이 아니라 새로운 구문으로 인해 규칙이 더 많거나 적은 경우에 대해 경고해야 하는 경우 포함)에는 다른 파서 및/또는 규칙 플러그인을 사용하는 것이 좋습니다. Babel을 사용하는 경우 babel-eslint 파서 및 eslint-plugin-babel을 사용하여 Babel에서 사용 가능한 모든 옵션을 사용할 수 있습니다.

# extends VS plugin
extends는 다른 사람이 만든 규칙을 가져와서 내 규칙에 붙여서 확장되는거고, plugin은 다른사람이 만든 규칙을 가져오는것이다. 다시말해 extends에 그냥 뭘 확장할건지만 써주면 자동으로 rules에 rule group이 추가 되고, plugin을 쓸때는 내가 일일이 rules에 적어줘야한다. (아님 extends랑 섞어서 쓰던지)

# 즉....
파서만 가져다 쓰면 (@babel/eslint-parser) 내가 작성한 코드의 stage3 문법을 추상구문트리(abstract syntax tree, AST)로 만들수 있다. 만약 stage3 문법을 사용했는데, 파서가 기본 파서라면 eslint 에서 파싱애러가 난다. 

일단 적절하게 파싱이 되었으면, 이제 그 파싱한 내용을 분석해야 하는데 (이게 애러 인지 아닌지) 그걸 정의해논게 plugin 이다. 즉, 파싱은 제대로 했는데, 플러그인이 업다면 기껏 파싱해놓은 정보를 사용하지 않겠다라는 의미이다. 확실하지는 않지만 플러그인 자체는  rule 이 다 허용으로 되어 있고, 이 룰을 애러로 바꾸려면 수동으로 작성해 줘야 한다. 
> extends는 추가한 플러그인에서 사용할 규칙을 설정합니다.
플러그인은 일련의 규칙 집합이며, 플러그인을 추가하여도 규칙은 적용되지 않습니다.
규칙을 적용하기 위해서는 추가한 플러그인 중, 사용할 규칙을 추가해주어야 적용이 됩니다. (https://velog.io/@kyusung/eslint-config-2)

즉,규칙을 적용한다는 것은 특정한 rule 에 error 를 설정한다는 것이고, 이 Rule 을 세팅해놓은게 extends 옵션의 `eslint:recommended` 와 같은 내용이다. 
> 여기서 eslint-plugin- 접두사를 생략하고 plugin:를 사용하여 사용할 플러그인을 지정할 수 있습니다. eslint:all과 eslint:recommended는 ESLint에 기본으로 제공되는 확장입니다. ESLint는 eslint:all를 프로덕션 용도로 사용하지 않기를 권장하고 있습니다. (https://velog.io/@kyusung/eslint-config-2)

# 결론
나누어서 생각하자

eslint 가 구문분석을 위해 parser 를 사용한다. 
적절하지 않은 parser 라면 애러가 난다. 
파싱이 되면 이제 어느 부분이 애러인가를 정의해야 한다. 이것이 플러그인.
플러그인을 설치했으면 이제 문장에 오류가 있을때 애러를 발생시킬지, 경고를 띄울지 결정한다. 이것이 Rule.
그리고 Rule을 미리 정의 해놓은 것이 extends 이다 