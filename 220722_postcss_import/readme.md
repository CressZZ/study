# postCss-import 와 그냥 네이티브 css import 문법은 뭔 차이냐?
https://www.freecodecamp.org/news/what-is-postcss/


Popular PostCSS Plugins
PostCSS Import
One of the basic and most important plugins to use is postcss-import. It lets us import CSS files into other files.

To check how to use this plugin go to src/style.css in the postcss-tutorial repository.

@import './components/comp1.css';
@import './components/comp2.css';
You can see that it is very similar to the way that we use the @import method in Sass.

Note: postcss-import is different than the import rule in native CSS. You should avoid the import rule in native CSS, since it can prevent stylesheets from being downloaded concurrently which affects the loading speed and performance.

The browser has to wait for every imported file to be loaded instead of being able to load all the CSS files at once.

# 정리하면
native 는 브라우저가 css 파일안에서 import 구문을 만나면 네트워크 로딩을 하는데, 
postcss-import 는 빌드 를해서 하나의 파일로 만든다는 이야기