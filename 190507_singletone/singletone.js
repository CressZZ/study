// https://stackoverflow.com/questions/26205565/converting-singleton-js-objects-to-use-es6-classes/26227662#26227662


/* Singleton.js */
const singleton = Symbol();
const singletonEnforcer = Symbol()

class SingletonTest {

  constructor(enforcer) {
    if(enforcer != singletonEnforcer) throw "Cannot construct singleton";
  }

  static get instance() {
    if(!this[singleton]) {
      this[singleton] = new SingletonTest(singletonEnforcer);
    }
    return this[singleton];
  }
}

export default SingletonTest


/* Test.js */
class Test{
    test(){
        console.log('test')
    }
}


/**
 * 밑밑에꺼 실행안됨 .. Object.assign 에 prototype 복사는 안된다.
 */
/* index.js */
var singletonTest = SingletonTest.instance
object.assigin(singletonTest.prototype, Test.prototype)

singletonTest.test();


// 이런 식으로 하면, `SingletonTest.instance`를 통해 instance는 싱글톤의 목적대로 하나만 생성 가능 하고, 
// Class `SingletonTest` 를 통하여 다른 class의 메서드를 prototype을 통해 object.assigin할수 있다

