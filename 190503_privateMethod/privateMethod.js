// 참조
// http://chanlee.github.io/2016/08/15/hello-es6-part-3/ 
// http://voidcanvas.com/es6-private-variables/
// https://gomugom.github.io/how-to-make-private-member/

/*
http://voidcanvas.com/es6-private-variables/

Why not Map instead of WeakMap?
The difference between Map and WeakMap will automatically delete the value if the key object is ready to be garbaged. 
Whereas in case of Map, it will keep a reference of the key object forever. Thus memory leak will be caused.

Private메서드 구현할때 왜 Map이 아니라 WeakMap 을 사용하냐하면, 
인스턴트가 삭제될때 해당 WeakMap의 키값(키값으로 인스턴스(this)를 가지고 있다.)도 자동으로 삭제 하려고
*/


let Person = (function () {
  let privateProps = new WeakMap();
  class Person {
    constructor(name) {
      privateProps.set(this, {age: 20, name}); // this is private
    }
    greet() {
      // Here we can access both name and age
      console.log(`name: ${privateProps.get(this).name}, age: ${privateProps.get(this).age}`);
    }
    addAge(){
      const originals = privateProps.get(this);
      const originalAge = privateProps.get(this).age;
      privateProps.set(this, Object.assign({},original,{age: originalAge+1}));
    }
  }
  return Person;
})();
let joe = new Person('Joe');
joe.greet();
// here we can access joe's name but not age







// Symbole 을 이용한 private member 구조
const Count = (() => {
  const count = Symbol('COUNT');
  class Count {
    constructor() {
      this[count] = 0;
    }
    inc() {
      return ++this[count];
    }
    dec() {
      return --this[count];
    }
    get score() { return this[count]; }
    set score(n) { this[count] = n; }
  }
  return Count;
})();
const test = new Count();
console.log(test.inc());   // 1
console.log(test.inc());   // 2
console.log(test.dec());   // 1
console.log(test.score);   // 1
test.score = 10;
console.log(test.score);   // 10
console.log(test.inc());   // 11

// 접근루트가 있다....
const testSymbol = Object.getOwnPropertySymbols(test)[0];
test[testSymbol] = 20;
console.log(test.score);    // 20
console.log(test.inc());    // 21

const testSymbol = Reflect.ownKeys(test)[0];
test[testSymbol] = 20;
console.log(test.score);    // 20
console.log(test.dec());    // 19



/*

아래 예제의 접근법은 생성자 함수에 private 데이터를 제공하게 해준다. ‘let age’는 블록스코프를 가지고 외부에서 접근할 수 없는 값이다.

하지만, 이경우 모든 Person인스턴스는 age를 생성하게 되고, 메모리를 낭비하는 결과를 초래한다.

WeakMap과 WeakSet을 사용하면 이러한 메모리 낭비를 막고 성능을 개선할 수 있다. let을 이용해 private한 WeakMap을 만들고, 이 WeakMap을 이용해 this와 연관된 private데이터를 조회할 수 있다. 이렇게 하면 모든 인스턴스가 하나의 WeakMap을 공유하게 된다.
*/


function Person(name) {
  let age = 20; // this is private
  this.name = name; // this is public
  this.greet = function () {
    // here we can access both name and age
    console.log(`name: ${this.name}, age: ${age}`);
  };
}
let joe = new Person('Joe');
joe.greet();
// here we can access name but not age