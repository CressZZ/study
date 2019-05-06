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
      this.name = name; // this is public
      privateProps.set(this, {age: 20}); // this is private
    }
    greet() {
      // Here we can access both name and age
      console.log(`name: ${this.name}, age: ${privateProps.get(this).age}`);
    }
  }
  return Person;
})();
let joe = new Person('Joe');
joe.greet();
// here we can access joe's name but not age