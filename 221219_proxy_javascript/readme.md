https://stackoverflow.com/questions/41299642/how-to-use-javascript-proxy-for-nested-objects

- 아래 코드에서, proxy.inner.salary = 'foo' 을 실행하면, get 트랩이 실행되는데, 이건 proxy.inner.salary 에 대한 get 트랩이 실행된게 아니다. 
- proxy.inner 까지 읽어 들이는 과정에서 inner에 대한 get 트랩이 실행된거고, 
- proxy.inner 의 get 트랩에 대한 반환값에 대해 set을 실행하는데 이때는 set 트랩이 동작하지 않는다.
- 즉 2depth에 대한 프로퍼티는 get 트랩이나 set 트랩이 동작하지 않는다.
- 2depth에도 proxy를 적용하려면 위 stackoverflow의 내용처럼 재귀로 돌려야 한다. 


```js


var validator = {
    get(target, key, value){
        console.log('dd');
        return target[key];
    }, 
  set (target, key, value) {
    console.log(target);
    console.log(key);
    console.log(value);

    return true
  }
}


var person = {
      firstName: "alfred",
      lastName: "john",
      inner: {
        salary: 8250,
        Proffesion: ".NET Developer"
      }
}
var proxy = new Proxy(person, validator)
proxy.inner.salary = 'foo'

```