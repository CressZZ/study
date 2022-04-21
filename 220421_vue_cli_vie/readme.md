# 
202204 현재 [vue 공식 사이트](https://vuejs.org/guide/typescript/overview.html)에서는 vue를 타입스크립트랑 사용하려면 [create-vue](https://github.com/vuejs/create-vue) 를 사용하라고 나온다. 

# vue-cli
webpack 배이스

# creat-vue
vite 배이스
vite 는 Vue.js를 만든 Evan You 작품
그니까 다 지내꺼 써라 이거지 뭐

# vite 배이스를 써야 하는 이유 
[Note on Vue CLI and ts-loader](https://vuejs.org/guide/typescript/overview.html#note-on-vue-cli-and-ts-loader)

In webpack-based setups such as Vue CLI, it is common to perform type checking as part of the module transform pipeline, for example with ts-loader. This, however, isn't a clean solution because the type system needs knowledge of the entire module graph to perform type checks. Individual module's transform step simply is not the right place for the task. It leads to the following problems:

    ts-loader can only type check post-transform code. This doesn't align with the errors we see in IDEs or from vue-tsc, which map directly back to the source code.

    Type checking can be slow. When it is performed in the same thread / process with code transformations, it significantly affects the build speed of the entire application.

    We already have type checking running right in our IDE in a separate process, so the cost of dev experience slow down simply isn't a good trade-off.

If you are currently using Vue 3 + TypeScript via Vue CLI, we strongly recommend migrating over to Vite. We are also working on CLI options to enable transpile-only TS support, so that you can switch to vue-tsc for type checking.

간단히 말하면 성능 문제도 있고, 타입체크 과정이 꼬여서 문제가 생길수 있다 정도...

# 현실적으로 써야 하는 이유
```js
// test.vue
<template>
    <div>
        hi
    </div>
</template>

<script setup lang="ts">

</script>

<script lang="ts">
    export type Test = string;
</script>

```

```ts
// index.ts
export {default as InputString} from './InputString.vue';
import type {Test} from './InputString.vue';

const a: Test = 'a';
console.log(a)



```

위에 처럼 두개의 파일이 있다고 하자, 
vue파일 에서 export 를 두개 해준다. 
- setup 스크립트에서 생성되는 vue 파일 (default export 로 자동 설정 된다. )
- 그리고 다른 script 에서 export한 Test 라는 타입

문제는 `vue-cli`, `vite` 모두 IDE에서는 애러를 안 뿌린다는 것이다. 

근데 `vue-cli`에서 빌드 하면 애러가 나고, `vite`는 애러가 안난다. 

## vue-cli 의 경우 
음 default export 가 commonjs 형태로 뽑히는거 같다. 그러니까 import 할때 import * as IputString 으로 하고, InputString.defaults 로 뽑으면 애러 가 안난다. 
그리고 Test 라는 타입을 export 안하고, 원래 쓰던대로 해도 애러가 안난다. 
그러니까 하나의 파일에 commonjs/esmodule 이 동시에 사용되서 애러가 나는 건데 이부부은 `190430_babel_preset_env` 내용과 관련있는거 같은데.. 음 애러 나면 안될거 같은데(babel에서 처리 해줄거 같은데) 암튼 애러가 난다. 

## vite 의 경우 
애러 안난다!

# 아 근데 잘 모르겠네