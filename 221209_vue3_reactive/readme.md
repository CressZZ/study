https://ui.toast.com/weekly-pick/ko_20210112
https://velog.io/@happyjarban/Vue%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%B0%98%EC%9D%91%EC%84%B1%EC%9D%84-%EC%9C%A0%EC%A7%80%ED%95%98%EA%B3%A0-%EC%9E%88%EC%9D%84%EA%B9%8C



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