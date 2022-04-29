# `<script setup>`
타입 스크립트 쓸꺼면 이거 쓰자 
- Ability to declare props and emitted events using pure TypeScript
(https://vuejs.org/api/sfc-script-setup.html)



# defineProps
defineProps 을 (타입스크립트와) 사용하는건 크게 두가지 방법이 있다 
## runtime declaration
- 실제 사용했을때 이거 단점은 vue 에서 제공하는 type (첫 단어 대문자) 인 String, Number, Object 등만 타입 추론이 가능 하다는 점 이다. 
- 이렇게 되면 객체는 배열의 경우 객체나 배열 안에 있는 요소를 any 나 unknow 으로 추론 해버린다. 
- Currently complex types and type imports from other files are not supported. It is possible to support type imports in the future. (https://vuejs.org/api/sfc-script-setup.html#typescript-only-features)
  
This is called "runtime declaration", because the argument passed to defineProps() will be used as the runtime props option.
```js
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})
```
## type-based declaration (추천 - 컴파일 할때 runtime declaration 을 자동 추가 해줌)
When using type declaration, the equivalent runtime declaration is automatically generated from static analysis to remove the need for double declaration and still ensure correct runtime behavior.
(https://vuejs.org/api/sfc-script-setup.html#typescript-only-features)

This is called "type-based declaration". The compiler will try to do its best to infer the equivalent runtime options based on the type argument.
```js
const props = defineProps<{
  foo: string
  bar?: number
}>()

```

## 제한
https://vuejs.org/guide/typescript/composition-api.html#typing-component-props

아근데 되는거 같은데...안된다고 나오네..
```js
import { Props } from './other-file'

// NOT supported
defineProps<Props>()
```


# defineComponent
vue 에서 typescript 사용하려면 
`<script lang="ts">` 는 당연히 필요하고, 
props 의 타입을 추론 하려면 크게 두가지 방법이 필요하다. 

## `<script lang="ts" setup>`  & `defineProps`
`<script lang="ts" setup>` 을 해주던지 (위의 `defineProps` 와 함께 사용)

## defineCompnent
`setup` 없이 `defineCompnent` 로 감싸던지 해야 한다. (https://vuejs.org/guide/typescript/composition-api.html#without-script-setup)

```js
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- type: string
  }
})


```

# defineEmits
```js

const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

```


# PropType
이런 방법도 있다.
https://www.youtube.com/watch?v=GdWrYfDfqRE&list=PL4cUxeGkcC9gCtAuEdXTjNVE5bbMFo5OD&index=4

```html

<script setup lang="ts">
  import {PropType} from 'vue'
  const props =  defineProps({
    items: {
      type: Array as PropType<Item[]>,
      default: true,
    },
  }
  
<script>
```