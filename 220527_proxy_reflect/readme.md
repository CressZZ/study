# proxy and reflect
https://ui.toast.com/weekly-pick/ko_20210413

# 그래서 위에걸 사용해서 무얼 만들었은가?
https://ui.toast.com/weekly-pick/ko_20210112

# 보는 와중에 핵심은
- reflect 가 없어도 반응형(reactive 함수)는 잘 동작한다. 

## reflect 적용된 버전
```js
const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }

  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());
  }
}

function reactive(target) {
  const proxy = new Proxy(
    target,
    {
      get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver);
        track(target, key);

        return res;
      },
      set(target, key, value, receiver) {
        const oldValue = target[key];
        const res = Reflect.set(target, key, value, receiver);

        if (oldValue !== res) {
          trigger(target, key, value, oldValue);
        }
        return res;
      }
    }
  )

  return proxy;
}

let activeEffect = null;

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

const numbers = reactive({a: 1, b: 2});
const sumFn = () => { sum = numbers.a + numbers.b; };
const multiplyFn = () => { multiply = numbers.a * numbers.b };

let sum = 0;
let multiply = 0;

effect(sumFn);
effect(multiplyFn);

console.log(`sum: ${sum}, multiply: ${multiply}`);
numbers.a = 10;
console.log(`sum: ${sum}, multiply: ${multiply}`);

```


## reflect 적용 안된 버전
```js
const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }

  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());
  }
}

function reactive(target) {
  const proxy = new Proxy(
    target,
    {
      get(target, key, receiver) {
        // const res = Reflect.get(target, key, receiver);
        const res = target[key];
        track(target, key);

        return res;
      },
      set(target, key, value, receiver) {
        const oldValue = target[key];
        // const res = Reflect.set(target, key, value, receiver);
        const res =  target[key] = value;

        if (oldValue !== res) {
          trigger(target, key, value, oldValue);
        }
        return res;
      }
    }
  )

  return proxy;
}

let activeEffect = null;

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

const numbers = reactive({a: 1, b: 2});
const sumFn = () => { sum = numbers.a + numbers.b; };
const multiplyFn = () => { multiply = numbers.a * numbers.b };

let sum = 0;
let multiply = 0;

effect(sumFn);
effect(multiplyFn);

console.log(`sum: ${sum}, multiply: ${multiply}`);
numbers.a = 10;
console.log(`sum: ${sum}, multiply: ${multiply}`);

```

# 그런데 ,첫번째 링크를 보면 Reflect 를 사용한 이유가 나와 있는데, 
- Vue 개발자인 Evan You는 온라인 강의를 통해 Proxy의 트랩 내 Reflect를 언급하며, "주제에서 벗어나기 때문에 자세히 말할 수는 없지만, 프로토타입에 대한 사이드 이펙트를 처리하기 위해 사용했다" 라고 했다. 
- 이 멘트에 집중하여 프록시 객체인 반응형 객체를 프로토타입으로 사용할 경우 어떤 일이 일어나는지 보도록 하겠다.

# 즉 reactive 함수로 만든 반응형 객체를 프로토 타입으로 사용할 경우 문제가 생긴다는 것이다. 
- 즉 특수 상대성 이론 처럼? 특수한 경우(반응형 객체를 프로토 타입으로 사용할 경우)에 발생할수 있는 사이드 이펙트를 방지하기 위해 reflect 를 사용한것이다. 
  

```js
function reactive(target) {
  const proxy = new Proxy(
    target,
    {
      get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver);
        // track(target, key);

        return res;
      },
      set(target, key, value, receiver) {
        const oldValue = target[key];
        const res = Reflect.set(target, key, value, receiver);

        if (oldValue !== res) {
          // trigger(target, key, value, oldValue);
        }
        return res;
      }
    }
  )

  return proxy;
}

const child = {
  birthYear: 2019
};

const parent = {
  birthYear: 1981,
  get age() {
    return new Date().getFullYear() - this.birthYear;
  }
};

const reactivityParent = reactive(parent);
child.__proto__ = reactivityParent;

```