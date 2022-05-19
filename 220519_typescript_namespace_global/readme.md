# 알수 없는 현상 발견! (지식이 부족한거겠지만..)

# 애러 남

```ts
// test.d.ts
declare namespace Handlebars2 {
  // export let a: string; // 요부분 없으면
}

declare module "handlebars2" {
  export = Handlebars2;
}
```

```ts
// inedex.ts
import Handlebars2 from 'handlebars2';

window.Handlebars = Handlebars; // 타입 애러 남 

// Property 'Handlebars2' does not exist on type 'Window & typeof globalThis'. Did you mean 'Handlebars'?
```

# 애러 안남
```ts
// test.d.ts
declare namespace Handlebars2 {
  export let a: string; // 요부분
}

declare module "handlebars2" {
  export = Handlebars2; 
}
```

```ts
// inedex.ts
import Handlebars2 from 'handlebars2';

window.Handlebars = Handlebars; // 애러 안남
```

## 왜죠?
나중에 알아보자