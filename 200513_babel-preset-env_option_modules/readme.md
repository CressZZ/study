# babel.config.js 에서 preset-env 설정중 module 옵션에 관하여

https://babeljs.io/docs/en/babel-preset-env#modules

Enable transformation of ES6 module syntax to another module type.
Setting this to false will not transform modules.
Also note that cjs is just an alias for commonjs.

즉, ES6 모듈 문법을 다른걸로 바꿀꺼냐 하는건데...

일단 웹펙에세는 ES6 모듈을 자체 지원하고 있다. 

https://webpack.js.org/api/module-methods/#es6-recommended
Version 2 of webpack supports ES6 module syntax natively, meaning you can use import and export without a tool like babel to handle this for you. Keep in mind that you will still probably need babel for other ES6+ features. The following methods are supported by webpack:


그리고 웹펙에서 Treeshaking 을 하려면 ES6모듈을 다른걸로 바꾸지 말라고 나온다.
심지어 babel preset-env 의 디폴트 설정은 ES6를 다른걸로(아마 commonjs)로 바꾸는 거니까, 이 설정을 커스텀으로 건드리라고 나온다.  

https://webpack.js.org/guides/tree-shaking/

So, what we've learned is that in order to take advantage of tree shaking, you must...

- Use ES2015 module syntax (i.e. import and export).
- Ensure no compilers transform your ES2015 module syntax into CommonJS modules (this is the default behavior of the popular Babel preset @babel/preset-env - see the documentation for more details).
- Add a "sideEffects" property to your project's package.json file.
- Use the production mode configuration option to enable various optimizations including minification and tree shaking.


# 반전
그런데
2018년 8월에 babel에서 수정이 하나 있었는데, 현재의 프로세스가 ES6 모듈 문법을 알고 있으면
modules의 기본 설정인 `auto` 가 자동으로 `false` 처리를 하게 바꾼 것이다. 
예를들면 babel-loader를 사용할경우 babel-loader가 현재의 프로세스는 ES6 모듈 문법을 알고 있다로 알려주고, 
즉 이 경우에는 아무 설정도 안거드려도 기본적으로 Treeshaking 이 된다. 

테스트 결과도 아무설정 안했을때 보다 babel.config.js 의 modules 설정을 cjs 등으로 변경했을때가 용량이 더 컷다. 
즉 아무것도 안해도 트리쉐이킹이 된다는 이야기. 
참고로 modules의 설정으로 false로 한것과 아무것도 안한것과의 번들 파일의 크기는 같았다. 

위에건 babel 7 부터 적용된다. (https://github.com/babel/website/issues/1852)

# 참고

https://medium.com/naver-fe-platform/webpack%EC%97%90%EC%84%9C-tree-shaking-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-1748e0e0c365

https://hoilzz.github.io/webpack/2-add-babel/