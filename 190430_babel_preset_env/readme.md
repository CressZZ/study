# 아 또 햇갈림

https://ui.toast.com/weekly-pick/ko_20190418/ (ESM 이랑 commonjs 혼재)

https://stackoverflow.com/questions/47255455/babel-polyfill-vs-babel-plugins/47326735

Babel 변환 플러그인과 babel-polyfill / babel-runtime의 차이점은 ES5에서 오늘 기능을 다시 구현할 수 있는지 여부입니다. 예를 들어 Array.from은 ES5에서 다시 작성할 수 있지만 ES5에서 JavaScript에 화살표 함수 구문을 추가하기 위해 작성할 수있는 내용이 없습니다. 따라서 화살표 함수에는 변환이 있지만 Array.from에는 변환이 없습니다. Babel-polyfill 또는 babel-runtime과 같은 별도의 polyfill에 의해 제공되어야합니다.

즉 화살표 함수는 문장 자체를 완전 바꿔야 하고, 
메서드는 그냥 정의만 하면 문장을 바꾸는게 아니라, 메서드만 추가로 정희 한다는 이야기 인거 같다. 

그니까...
babel@preset-env 를 쓰고, 타겟을 지정하면
기본적으로 플러그인! 즉, 문장변환을 지정한 타겟 환경에 따라 바꿔 주는 역할을 하는 것. (왜만한 플러그인이 다 들어 있다고 보면 되고 )

preset-env 의 usage 옵션은 
This option configures how @babel/preset-env handles polyfills.
와 같이 preset-env 가 polyfills 를 어떻게 제어 하는지 (폴리필은 메서드 추가 개념)
을 결정 하는 것이다. ?



# core-js@3
https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md


# babel-preset-env  @babel/preset-env
## useBuiltIns
- `usage` : import "core-js"; import "regenerator-runtime/runtime"; 을 직접 넣어 주지 않아도,실제로 쓰는 것만! 바벨이 알아서 필요한 corejs와 필요시 regenrator-runtime을 import 시킨다. 
- `entry` : 직접  import "core-js"; import "regenerator-runtime/runtime"; 을 넣어주어야 하며, 주어진 환경에 맞춰 (실제로 쓰는지 안쓰는지는 중요하지 않다.) 환경에 필요한 모든 모듈을 다 때려 넣는다.
- `false`(default) : 직접  import "core-js"; import "regenerator-runtime/runtime"; 넣어줘야 하고, 다 끌어다 쓴다. 

# babel 6.X 의 경우
- `true` : `entry` 와 같다.
- `false` : `false` 와 같다.

# babel-polyfill 이란
- 이제 안쓴다. 
- babel-polyfill 은 core-js 와 regenerator-runtime/runtime 을 가지고 있는 그냥 집합체이다. 
- 근데 이제는 core-js가 필요한경우와 regenerator-runtime/runtime가 필요한 경우가 다를수 있고, 두개가 항상 같이 움직여야 하는것 은 아니기 때문에 deprecated 되었다. 
-  This package doesn't make it possible to provide a smooth migration path from core-js@2 to core-js@3: for this reason, it was decided to deprecate @babel/polyfill in favor of separate inclusion of required parts of core-js and regenerator-runtime.


# important!!!!!!!!! 바벨에서 ESModule 과 Commonjs 모듈을 혼용하고 + preset 설정중 useBuiltIns를 usage로 하고 modules를 auto(babel-loader 사용시) 및 false로 하면 애러가 생긴다. 

해결책은 babel 옵션중 `sourceType` 을 `unambiguous`로 설정함 


## https://github.com/babel/babel-loader/pull/660

Ah! Alright, this is an expected error. In https://github.com/react-cosmos/react-cosmos/blob/7ad046f79b20b979cdcbff4155c2aaa8d7817f0b/packages/react-cosmos-playground/src/index.js#L15 you use a mix of import and module.exports, which is not something we'd generally expect.

This happens to work with Babel's module transform because Babel just see's the file as ESM and doesn't even know that module.exports is there.

Webpack on the other hand, since it has to bundle everything, absolutely cares if you use a mix of import and module.exports in the same file, and the previous Babel transform was basically hiding that on accident.

My recommendation would be to use export default there, and if avoiding .default is your goal, use https://webpack.js.org/configuration/output/#output-libraryexport

## https://babeljs.io/docs/en/next/options#sourcetype
This option is important because the type of the current file affects both parsing of input files, and certain transforms that may wish to add import/require usage to the current file.

For instance, @babel/plugin-transform-runtime relies on the type of the current document to decide whether to insert an import declaration, or a require() call. @babel/preset-env also does the same for its "useBuiltIns" option. Since Babel defaults to treating files are ES modules, generally these plugins/presets will insert import statements. Setting the correct sourceType can be important because having the wrong type can lead to cases where Babel would insert import statements into files that are meant to be CommonJS files. This can be particularly important in projects where compilation of node_modules dependencies is being performed, because inserting an import statements can cause Webpack and other tooling to see a file as an ES module, breaking what would otherwise be a functional CommonJS file.

Note: This option will not affect parsing of .mjs files, as they are currently hard-coded to always parse as "module" files.

# 위에 내용을 정리하면
- 바벨은 모든 파일을 ESmodule 이라고 생각한다. 
- preset-env 의 설정중 module 옵션을 false로 변경 하면 core-js 가 ESModule 형태로 들어간다. (import)
- false가 아니라 cjs로 변경하면 core-js 는 require 로 들어가고, auto(default)로 변경해도  require 로 들어간다. 
- auto(default)로 변경해도 require 로 들어가는 이유는 nodejs 환경이 ESModule 을 모르는 환경이므로 commonjs 로 변환 시켜 버릴려는 것이다. (babel-loader 가 있는 경우에는 babel-loader 가 webpack 은 ESModule 을 알고 있다고 판단하여 굳이 commonjs 로 변환 하지 않는 것)
- **뒤에 나오지만 babel-loader가 개입된경우 auto(defaul)인 경우에도 ESModule 이 된다. 이경우에도 당연히 애러가 남**

- preset-env usebuiltinst: usage 는 필요한 core-js 를 각각의 파일에 집어 넣는데, 만약 파일 하나가 이미 commonjs 모듈을 쓰고 있었다면, 이경우 두개의 모듈 문법이 섞여 버린다. (core-js 가 MSModule 형태로 들어가기 때문)
- 자세한 내막을 모르겠으나, 이렇게 혼재 되어 사용될경우 webpack은 exports 객체(commonjs 모듈시스템을 위한 객체)를 없애 버린다. (This can be particularly important in projects where compilation of node_modules dependencies is being performed, because inserting an import statements can cause Webpack and other tooling to see a file as an ES module, breaking what would otherwise be a functional CommonJS file.)
- 그렇면 exports 객체를 찾을 수 없으므로 해당 모듈은 정상적으로 export 되지 않는다. 
- 이러한 일이 빈번히 발생하지 않는 이유는 한파일에 commonjs 형태만 들어 있을경우에는 webpack이 잘 처리 해주기 때문이다. 
- 만약 preset-env usebuiltinst: usage 에서 module을 cjs 로 변경하면 바벨이 모든 모듈을 cjs로 변환하기때문에 하나의 파일은 cjs 모듈 하나만 가지기 때문에 문제가 없다. 
- 또한 babel 옵션중 sourcetype을  unambiguous 로 바꿔도 이문제는 해결 되는데 자세한건 위에거 참조

- 근데 이게 babel 만 가지고 돌리면 webpack 이랑 다른 결과가 나온다. 
- 무슨 말이고 하니 nax babel ./index.js 로 돌리면 module 옵션이 default 즉, auto일때 결과물은 core-js 가 require로 들어가 있고, 
- webpack으로 돌리면 import로 되어 있어서 기존 코드에 commonjs 가 있으면 충돌된다. 
- 왜그런고 하니, 중요한건 preset의 module 옵션이 auto 라서 생기는 이유인데
- babel-loader 는 현재의 환경이 ESModule을 알고 있다라고 판단하기 때문에 commonjs 모듈을 (다른 모듈도) commonjs 로 변경하지 않는다. 
- 벗뜨... babel로만 돌릴 경우에는 현재의 프로세스가 ESMdule을 모른다고 판단하여 그냥 commonjs 로 core-js 를 집어 넣기 때문에 기존의 commonjs와 충돌나지 않는다. 

- 그리고 당연히 preset 설정과 관계 없이 하나의 파일에 두개 이상의 module 문법이 섞여 있으면 애러가 터진다!
- 완전히 참고로 typescript 의 경우 .tsconfig에서 아래의 esModuleInterop 옵션을 통해 모듈 형식이 섞여있어도 잘 풀어 주는듯 하다 
- https://ui.toast.com/weekly-pick/ko_20190418/
```js
{
    "compilerOptions": {
        "esModuleInterop": true,
    }
}
```

- 결론은 문법을 섞어서 쓰지 맙시다!

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
2018년 8월에 babel에서 수정이 하나 있었는데, 현재의 프로세스(환경이)가 ES6 모듈 문법을 알고 있으면
modules의 기본 설정인 `auto` 가 자동으로 `false` 처리를 하게 바꾼 것이다. 
예를들면 babel-loader를 사용할경우 babel-loader가 현재의 프로세스는 ES6 모듈 문법을 알고 있다로 알려주고, 
즉 이 경우에는 아무 설정도 안거드려도 기본적으로 Treeshaking 이 된다. 

테스트 결과도 아무설정 안했을때 보다(`auto`) babel.config.js 의 modules 설정을 cjs 등으로 변경했을때가 용량이 더 컷다. 
즉 아무것도 안해도 트리쉐이킹이 된다는 이야기. 
참고로 modules의 설정으로 false로 한것과 아무것도 안한것과의 번들 파일의 크기는 같았다. 

위에건 babel 7 부터 적용된다. (https://github.com/babel/website/issues/1852)

결론은 modules 옵션은 `false` 나 `auto`로 해야 treeshaking 이 된다.
# 참고

https://medium.com/naver-fe-platform/webpack%EC%97%90%EC%84%9C-tree-shaking-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-1748e0e0c365

https://hoilzz.github.io/webpack/2-add-babel/


# babel-register
- 이건 뭐하는건지 잘 모르겠다. 
- gulp에서 사용하는것 같다
- 무슨 gulp hook module 이라는데...
- 아무튼, preset-env에서 module 옵션을 false 로 주고 useBuiltIns 옵션을 usage로 주고 gulp를 돌리면
- 자동으로 core-js 가 import 구문으로 들어간 지점에서 애러가 난다. (import 구문을 해석 못하는 듯 하다.);
- 단, preset-env를 통해 들어간 import 구문이 아니라 수동으로 넣은 import 구문은 무리 없이 통과 된다. 
- gulp로 번들링 되는 과정에서  preset-env가 core-js 를 import 시키는 시점이 조금 다른 것같다. 
- 같은 파일로 webpack만들 통해 번들링 할경우 잘 번들링 된다. 
- module 옵션이 auto 일경우 애러가 안생기는건 좀 신기하다. 
- 아마 auto 로 하면 일단 require로 집어 넣고(애러가 터질꺼면 이 시점에서 발생해야 하는거 아닐까?) babel-loader가 import로 변경해 줘서 그런 것일까?


## 위 상황에 대한 예시
- 예시로 어떤 파일에 `jQuery('.test').find('.test2)` 라는 문구가 있다고 하자
- preset-env의 module은 false, useBuiltIns는 usage 인경우, 바벨을 돌리면 바벨은 find 를 보고는 `Array.prototype.find` 인줄 알고 `import "core-js/modules/es.array.find";` 를 삽입한다. (module은 false 이므로 ESModule 형태로 들어감)
- 그런데 이 상황에서 gulp인지, babel-register 인지, 그안에서 쓰는 다른 라이브러리든지 여튼 거기서 애러를 밷는다. 
```
import "core-js/modules/es.array.concat";
       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

SyntaxError: Unexpected string
    at Module._compile (internal/modules/cjs/loader.js:723:23)
    ...
```
- 그러나 webpack 만 사용했을때는 (babel-loader) 문제 없이 빌드 되고 정상 작동 한다. 
- 만약 preset-env 가 동작하지 않는 상황(`find` 같은 문구가 파일에 안쓰였을 경우)에서는
- 파일내에 `import '../vendor/test';` 라는 ESModule이 있다 하더라도
- 애러가 나지 않는다!



