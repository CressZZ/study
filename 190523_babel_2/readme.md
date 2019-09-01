# Cannot assign to read only property 'exports' of object '#<Object>' (mix require and export)
- 위 애러는 Babel 7환경에서 webpack을 이용해 번들링 하는 과정에서 `import` 구문(es module)과 `module.export`구문(CommonJS)을 병행해서 사용했을때 나타나는 애러이다. 
- Babel 6에서 `presets: ['env']` 을 설정해주면 `modules` 라는 프리셋 옵션 값이 `commonJS`로 디폴트 설정 되며, 이경우 `import` 구문을 `require`로 자동 변경 해준다. => 가만 놔두어도 애러가 없다
- Babel 7에서 `presets: ['@babel/preset-env']` 를 설정해주면 `modules` 라는 프리셋 옵션 값이 `auto` 로 설정 된다. => 애러 난다. 
- 해결방법은 Babel 7 옵션값인 sourceType 을 unambiguous로 변경한다. 
- 사실 잘 이해가 안간다. 

```
You've actually using import and module.exports in the same file, which is not allowed by Webpack. You can sidestep this by setting "modules": "commonjs", which will make Babel compile the import to a require. This breaks tree shaking, as mentioned above though, so fixing your code would be a better idea.
You're using useBultins: 'entry'/'usage, or @babel/plugin-transform-runtime, and you are running Babel on CommonJS files (either your own, or in random node_modules, if you're trying to compile that). Babel assumes files are ES modules by default, meaning those transforms would insert import statements into your file, triggering case 1. above. You can avoid this issue by setting sourceType: "unambiguous" in your Babel configuration, which will tell it to guess the type, like Webpack does, instead of assuming all files are modules.

```

https://github.com/webpack/webpack/issues/4039