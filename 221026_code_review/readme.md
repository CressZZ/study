# 기능 
- 쿠키 동의 레이어
- 쿠키 설정 레이어

# 서드파티 쿠키 / GDPR
https://ko.javascript.info/cookie

# 구조
## AbsGlobalCookie
- 이게 왜 Abs?
- 
## ConfirmToast

## SettingLayer



# async constructor class
- 비동기 생성자를 가지고 있는 class가 필요한가?
https://velog.io/@towozy/Typescript-%EC%83%9D%EC%84%B1%EC%9E%90%ED%95%A8%EC%88%98%EC%97%90-asyncawait-%EC%82%AC%EC%9A%A9%EC%9D%B4-%EA%B0%80%EB%8A%A5%ED%95%9C%EA%B0%80

# export  {default as SettingLayerIndex}  from './feature/settingLayer';
```js
import { ICookieLayerConfig } from "../interface/ICookieLayer";
export  {default as ConfirmToastIndex} from './feature/confirmToast';
export  {default as SettingLayerIndex}  from './feature/settingLayer';
// export class ConfirmToastIndex {

//     constructor(_config: ICookieLayerConfig = {}): InstanceType<typeof ConfirmToast>{
//         console.log('ConfirmToastIndex');

//         return new ConfirmToast({zIndex: _config.zIndex});
//     }
// }

// export class SettingLayerIndex {
//     constructor(_config: ICookieLayerConfig = {}){
//         return new SettingLayer({zIndex: _config.zIndex});
//     }
// }
```







# jest 한글 메뉴얼
- https://mulder21c.github.io/jest/docs/en/next/es6-class-mocks

# 첫번째 햇갈리는거 spyOn vs mock
- 차이점이라기 보다는 비교 대상이 아니다. 
- spyOn은 기존에 존재하는 메서드를 그 메서드가 가지고 있는 내용 그대로 `mock 함수`로 만드는 것이다. 
- spyOn은 아무튼 기존에 있는 메서드를 `mock 함수`로 만들어서 추척을 하겠다라는 의미이다.
- mock 함수는 아래 참조

# mock 함수 vs mock 모듈
- mock('{resource}') 를 사용하면 그 모듈(파일) 에 있는 모든 export된 함수, 객체, 원시 값들을 auto-mocking 시스템으로 mocking 시켜 버린다. 
- 그 중 함수는 mocking 함수가 된다. 
- 혹은 jest.fn()을 써서 새로운 mock 함수를 만든다.

## auto mocking

- 아마도 __mock__ 폴더 같은곳을 자체적으로 만들어서, 그곳에 같은 이름의 파일을 만들고, jest 가 돌아가는 도중에는 파일을 불러올때 mocking 된 파일을 불러오는듯 하다. 
- 결과 
```js
import {testFunction, testValue, testArr , testObj, Test} from  '../../_src/js/test-code/test';

jest.mock('../../_src/js/test-code/test');

describe('test', ()=>{
    test('value', ()=>{
        console.log('testValue', testValue);
        console.log('testArr', testArr);
        console.log('testObj', testObj);
        console.log('testObj_method', testObj.testObjMethod());
        console.log('testClassProperty', (new Test('kris'))); 
        console.log('testClassProperty', (new Test('kris')).age); // undefined
        console.log('testClassMethod', (new Test('kris')).sayHi('test')); // undefined

        expect(testValue).toBe('testValue');
        expect(testFunction()).toBe(undefined);

    })
})

```
## Function
- Creates a new mock function. The new function has no formal parameters and when called will return undefined. This functionality also applies to async functions.
- 매개변수 없고 undefined 반환하는 mock 함수가 만들어짐. 비동기 함수도 퐇마

## Class
- Creates a new class. The interface of the original class is maintained, all of the class member functions and properties will be mocked.

## Object
- Creates a new deeply cloned object. The object keys are maintained and their values are mocked.

## Array
- Creates a new empty array, ignoring the original.

## Primitives
- Creates a new property with the same primitive value as the original property.


# mock
- https://jestjs.io/docs/mock-functions
- mock 함수를 사용하면
- 함수에 대한 `호출(및 해당 호출에서 전달된 매개변수)을 캡처하`고, 
- new로 인스턴스화될 때 생성자 함수의 `인스턴스를 캡처`하고, 
- `테스트 시간 구성을 허용`하여 코드 간의 링크를 테스트할 수 있습니다. 
- 그리고 원래의 구현을 새롭게 변경 할수 있다 : `함수의 실제 구현을 지우고`(이건 선택지 이다. spyOn을 사용하고, mockImplementaion을 사용했을때) - spyOn().mockImplementation(()=>{}), 

# spyOn
- 테스트 결과 좀더 자세히 보면 spyOn 메서드는 일단 새로운 `mock 함수`를 생성/반환하는데 그것의 구현은 인자로 전달한 오브젝트의 메소드 안의 내용이다. 
- 그리고 새로운 `mock 함수` 를 생성/반환 함과 동시에, 인자로 전달한 오브젝트의 메소드 그 자체도 `mock 함수` 가 된다. 
- 새로운 `mock 함수` 와 `mock 함수`로 변경된 기존의 메서드는 서로 데이터가 연동된다. (implemetation 이라던가, reult 라던가)

```js

    let spy = jest.spyOn(testClass, 'sayName'); // 새로운 `mock 함수` 를 생성/반환 함

    spy.mockImplementation(()=>'mock'); // 이건 됨
    (testClass.sayName as jest.Mock).mockImplementation(()=>'mock!!!'); // 추가로 이거도 됨

```
- 단, restore 를 해버리면 기존 메서드는 (testClass.sayName) 더이상 `mock 함수` 가 아니게 되지만, 
- 새로 만들어진 `mock 함수` (위에서 spy 라는 변수) 는 계속 `mock 함수` 이다. 단지, reset이 적용 되었기 때문에, 기록과 implementation 은 날라간다
- 공식문서에 따르면 이 내용이 나와 있는데, 내용을 아래와 같다 (https://jestjs.io/docs/jest-object#jestspyonobject-methodname)
- Creates a mock function similar to jest.fn but also tracks calls to object[methodName]. Returns a Jest mock function. 
- If you want to overwrite the original function, you can use jest.spyOn(object, methodName).mockImplementation(() => customImplementation) or object[methodName] = jest.fn(() => customImplementation);

# mock 함수의 구현
- jest.fn() 을 사용하면 undefined를 반환하는 빈(?) `mock 함수`를 생성하고, 
- jest.fn(()=>{return 'mock'}) 처럼 함수를 인자로 넘기면 ()=>{return 'mock'} 를 실행하는 `mock 함수`를 생성하고, 
- spyOn(someObject, someMethod) 를 사용하면 someObject.someMethod 를 원래 가지고 있던 코드를 실행하지만, 일반 함수가 아닌 추적이 가능한 `mock 함수` 로 바꾸고
- `mock 함수`.mockImplementation(()=>{return 'new mock'}) 을 실행하면 `mock 함수` 의 내부 로직을 바꾸어 버리고, 
- `mock 함수`.mockRestore() 를 실행하면 `mock 함수` 의 내부 로직 원래의 로직으로 돌려 놓고 (spyOn으로 생성된 `mock 함수`에 한정된다. 햇갈리지만 잘생각해 보면 jest.fn() 으로 만든 `mock 함수`는 undefined 를 반환하는 빈(?) 함수이다.) - https://jestjs.io/docs/mock-function-api#mockfnmockrestore
- 추가로 `mock 함수`.mockReturnValue(value) 등을 사용하여 mockImplementation 을 사용하지 않고, `mock 함수`의 로직을 비교적 간단하게 구성할수 있다


# spyOn  / jest.fn() 
## jest.fn() 
```js
const mockFn = jest.fn(()=>'it is mock funciton'); // 인자로 넘긴 함수가 실행될뿐 아니라 ====> 호출 횟수, 호출 결과등을 추적 할수 있다.
```

## spy
- https://www.daleseo.com/jest-fn-spy-on/
- mocking에는 스파이(spy)라는 개념이 있습니다. 현실이나 영화 속에서 스파이라는 직업은 “몰래” 정보를 캐내야 합니다. 
- 테스트를 작성할 때도 이처럼, 어떤 객체에 속한 함수의 구현을 `가짜로 대체하지 않고`, 
- `해당 함수의 호출 여부와 어떻게 호출되었는지만을 알아내야 할 때가 있습니다.` 
- 이럴 때, Jest에서 제공하는 jest.spyOn(object, methodName) 함수를 이용하면 됩니다.

```js
const calculator = {
  add: (a, b) => a + b,
};

const spyFn = jest.spyOn(calculator, "add"); 
// 좀 다른 이야기인데, 이렇게 메서드 형태로 인자를 넘겨야 하는이유가, jest.spyOn(오브젝트, 오브젝트 메서드 키)
// 이렇게 넘겨야 calculator 객체에대한 add 라는 이름의 key 가 가지고 있는 참조값 value를 바꿀 거고, 그러면 다른데서 calculator를 불러와서 쓴다고 해도 변경된, 즉 mocking으로 변한 함수를 호출 할수 있을 것이다.
// 그래서 순서도 중요함
// 어떤 클래스의 constructor 에서 호출 해버리는 메서드를 
// 인스턴스를 생성하기 전에 spyOn 해버리지 않으면, 기존의 함수 그대로 사용하기 때문에 호출이 얼마나 됬는지 알아 내 수가 없다. 
// 물론 인스턴스 생성후, spyOn 해버리면 해당 메서드의 참조 값이 변경 되기때문에, 생성후에 호출하는건 mocking 화 된 함수가 들어가겠지.

const result = calculator.add(2, 3);

expect(spyFn).toBeCalledTimes(1);
expect(spyFn).toBeCalledWith(2, 3);
expect(result).toBe(5);

```

# mocking 시 주의점
```js

test('테스트 케이스', ()=>{
    /**
     * TescClas 인스턴스 생성시 constructor 에서 
     * TestClass.prototype.callApi(); 를 호출 한다고 했을때, 
     * TestClass.prototype.callApi의 mock 함수 정의는 당연히 
     * 생성 전에 선언 되어야 한다. 
     */
    TestClass.prototype.callApi = jest.fn().mockImplementation(() => Promise.resolve(value));
    TestClass.prototype.callApi = jest.fn().mockResolvedValue(value)

    let instance = new TestClass(); // constructor에서 TestClass.prototype.callApi 을 호출할 때, TestClass.prototype.callApi는 이미 mock 함수로 변경 되어 있어야 한다

})

```

# tobe / toEqual
- tobe 는 참조형에서 비교대상이 원본 참조형과 비교하는 거고
- toEqual은 참조형에서 딥복사해서 비교 한다고 생각하면 되고

- 즉, 
```js
    test('toBe, toEqual', ()=>{
        let a = [ [1], [2] ];
        a[1].push(3);

        expect(a).toBe( [ [1], [2, 3] ]); // fail

    })
    test('toBe, toEqual', ()=>{
        let a = [ [1], [2] ];
        a[1].push(3);;

        expect(a).toEqual( [ [1], [2, 3] ]); // success

    })

```


# 모듈 mock
https://www.daleseo.com/jest-mock-modules/
https://velog.io/@ysong0504/jest-spyOn%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EC%99%B8%EB%B6%80-%ED%95%A8%EC%88%98-mocking-%ED%95%98%EA%B8%B0

## 모듈 mock 에 대해 좀 더 자세히? - 좀 햇갈림
### automatic mocking
- mock('resource') 로 생성하고,
- 음 그러니까, 모듈 안에는 여러기지 export가 있을수 있다. 
- 객체가 하나 일수도 있고
- auto mock 은 모든 export 에 대해 빈 mock 함수를 만들어 버린다

### manual mocking
- 기본적으로 `__mock__` 폴더 안에 타겟으로 한 모듈 파일의 이름과 같은 이름의 파일을 넣고
- mock('resource') 로 생성하고,
- 그럼 폴더 안에 만들어 놓은 `__mock__` 모듈로 교체 된다

### createMockFromModule
- Given the name of a module, use the automatic mocking system to generate a mocked version of the module for you.
- 이건 automatic mocking 을 생성하는데, 위에 automatic mocking 과, manual mocking 이 한번 실행되면, 이후에 같은 리소스로 모듈을 불러오면 mocking module로 교체 되는 것과는 달리
- 이건 그냥 생성된 mocking 모듈을 반환할 뿐이다. 
- 이후에 import {} from 'resource' 에 영향을 주지 않는다는 이야기

# es6 class Mock
https://jestjs.io/docs/es6-class-mocks

## 1) Automatic mock
```js
import SoundPlayer from './sound-player';
import SoundPlayerConsumer from './sound-player-consumer';
jest.mock('./sound-player'); // SoundPlayer is now a mock constructor
```

## 2) Manual mock
https://jestjs.io/docs/manual-mocks#mocking-node-modules
```js
// __mocks__/sound-player.js
export const mockPlaySoundFile = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return {playSoundFile: mockPlaySoundFile};
});

export default mock;


// sound-player-consumer.test.js
import SoundPlayer, {mockPlaySoundFile} from './sound-player';
import SoundPlayerConsumer from './sound-player-consumer';
jest.mock('./sound-player'); // SoundPlayer is now a mock constructor
```

## 3) Calling jest.mock() with the module factory parameter
```js
import SoundPlayer from './sound-player';
const mockPlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
  return jest.fn().mockImplementation(() => { // 이렇게 해도 되고, jest.fn(()=>{}) 이렇게 구현해도 된다. ====> jest.fn(implementation?)
    return {playSoundFile: mockPlaySoundFile};
  });
});
```

## 4) Replacing the mock using mockImplementation() or mockImplementationOnce()
```js
import SoundPlayer from './sound-player';
import SoundPlayerConsumer from './sound-player-consumer';

jest.mock('./sound-player');

describe('When SoundPlayer throws an error', () => {
  beforeAll(() => {
    SoundPlayer.mockImplementation(() => { 
      return {
        playSoundFile: () => {
          throw new Error('Test error');
        },
      };
    });
  });

  it('Should throw an error when calling playSomethingCool', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(() => soundPlayerConsumer.playSomethingCool()).toThrow();
  });
});
```

# mock() 함수의 호이스팅
- 팩토리 파라미터의 한계는 jest.mock() 호출이 파일의 최상단으로 호이스팅 되기 때문에, 
- 먼저 변수를 정의한 다음 팩토리에서 그것을 사용할 수 없다는 것입니다. 
- `예외는 'mock'이라는 단어로 시작하는 변수에 대해 만들어 집니다.` 
- 제시간에 초기화 될 것이라고 보장하는 것은 여러분께 달려있습니다! 예를 들어, 다음은 변수 선언에서 'mock' 대신 'fake'의 사용으로 인해 범위를 벗어난 오류를 던질 것입니다

```js
import SoundPlayer from './sound-player';
const mockPlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
  return jest.fn().mockImplementation(() => {
    return {playSoundFile: mockPlaySoundFile};
  });
});

// 주목: 이것은 실패할 것입니다
import SoundPlayer from './sound-player';
const fakePlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
  return jest.fn().mockImplementation(() => {
    return {playSoundFile: fakePlaySoundFile};
  });
});

```




# cleare / reset / restore
## clear
- 몇번 호출됬는지, 호출 결과는 뭔지 기록한거 클리어

## reset
- clear + impliment (가짜 실행코드) 초기화 (unddifend 됨)

## restore
- clear + impliment (가짜 실행코드) 초기화 (unddifend 됨) + impliment 를 원래 코드로 돌림

```js
/* tempClss.js */
export default class TempClass {
    constructor( name){
        this.name = name
    }

    sayName(){
        return this.name;
    }
}


/* test.test.ts */
import TempClass from '../../_example/tempClass';

describe("mock 테스트", () => {
    let spy: jest.SpyInstance;
    let testClass: TempClass;
    beforeAll(()=>{
        testClass = new TempClass('kris');
        spy = jest.spyOn(testClass, 'sayName');
        spy.mockImplementation(()=>'mock'); // 이건 됨
        (testClass.sayName as jest.Mock).mockImplementation(()=>'mock!!!'); // 추가로 이거도 됨
    });

    // beforeEach(()=>{

    // })

    test('test mock2', () => {
        console.log('test mock', spy.mock.results); // []

        let result = testClass.sayName();
        console.log('test mock isMockFunction', spy.mock.results); // [ { type: 'return', value: 'mock' } ]
        expect(result).toBe('mock'); // pass
    })

    test('test mock2', () => {
        console.log('test mock2', spy.mock.results); // [ { type: 'return', value: 'mock' } ]

        let result = testClass.sayName();

        console.log('test mock2', spy.mock.results);  // [ { type: 'return', value: 'mock' }, { type: 'return', value: 'mock' } ]
        console.log('test mock2', (testClass.sayName as jest.Mock).mock.results);  // [ { type: 'return', value: 'mock' }, { type: 'return', value: 'mock' } ]
        console.log('test mock2 isMockFunction', jest.isMockFunction(testClass.sayName)); // true
        console.log('test mock2 isMockFunction', jest.isMockFunction(spy)); // true
        expect(result).toBe('mock'); // pass
    })

    test('test mock.clear', () => {
        spy.mockClear();
        console.log('test mock.clear', spy.mock.results); // []

        let result = testClass.sayName();

        console.log('test mock.clear', spy.mock.results); //  [ { type: 'return', value: 'mock' } ]
        console.log('test mock.clear isMockFunction', jest.isMockFunction(testClass.sayName)); // true
        expect(result).toBe('mock'); // pass
    })

    test('test mock.reset', () => {
        spy.mockReset();
        console.log('test mock.reset', spy.mock.results); // []

        let result = testClass.sayName();

        console.log('test mock.reset', spy.mock.results); // [ { type: 'return', value: undefined } ]
        console.log('test mock.reset', (testClass.sayName as jest.Mock).mock.results); // [ { type: 'return', value: undefined } ]

        console.log('test mock.reset isMockFunction', jest.isMockFunction(testClass.sayName)); // true
        expect(result).toBe(undefined); // pass

    })

    test('test mock.restore', () => {
        spy.mockRestore();
        console.log('test mock.restore', spy.mock.results); // []
        let result = testClass.sayName();

        console.log('test mock.restore', spy.mock.results); // []
        // console.log('test mock.restore', (testClass.sayName as jest.Mock).mock.results); // Error

        console.log('test mock.restore isMockFunction', jest.isMockFunction(testClass.sayName)); // false
        console.log('test mock2 isMockFunction', jest.isMockFunction(spy)); // true
        expect(result).toBe('kris'); // pass
    })
})
```


# description, test 실행순서
```js

description('첫번째 description', ()=>{
    console.log('description 1') // [1]
    beforeAll(()=>{
        console.log('beforeAll 1') // [3]
    })
    test('첫번째 테스트', ()=>{
        console.log('test 1'); // [4]
    })
    test('두번째 테스트', ()=>{
        console.log('test 2'); // [5]
    })
})

description('두번째 description', ()=>{
    console.log('description 2') // [2] ===> 이게 두번째임
    beforeAll(()=>{
        console.log('beforeAll 2') // [6]
    })
    test('세번째 테스트', ()=>{
        console.log('test 3'); // [7]
    })
})

```

# 한번 mocking 된 모듈(파일)은 돌아 올수 있는가?
- 하나의 테스트 파일에서 모듈을 mock() 을 통해 auto-mocking 또는 메뉴얼 mocking 했다면, 
- mock() 은 최상단으로 호이스팅 될테고, 
- 그 파일에서는 이미 mocking 된 상태이다. 
- 그럼 이걸 하나의 테스트 파일안의 각 테스트에서 어떤 test 에서는 mocking된걸 쓰고, 어떤 테스트에서는 오리지널 모듈을 쓰고 싶다고 한다면, 
- 그게 가능한것인가..?
- 불가능 하다고 하는데...
- My current n wretched 'solution' is to separate tests into several files. Not sure if that's what they call "simple" and "delightful".
- https://github.com/facebook/jest/issues/2649


# (조금 중요?) jest.spyOn(오브젝트, 오브젝트 메서드 키) 에 대해
- 아래와 같이 목함수를 만들때는, 오브젝트와, 메서트 형태로 가야한다.
- 왜냐하면 import 키워드로 불러오기 된 함수들은 기본적으로 const 변수이기 때문에 한 번 초기화되면 다른 값으로 변경이 불가능하기 때문입니다.
- 그리고 참조 값이 바뀌므로 테스트 파일이 아닌 다른곳에서 someModule 을 import 하더라도, 목함수로 변경된 함수가 import 될것이다.
```js
import someModule, {someObject} from './someModule'; 

jest.spyOn(someObject, 'someMethod', ()= >{}) 
```

- jest.fn() 도 마찬가지 이다.
```js
import someModule, {someObject} from './someModule'; 

someModule = jest.fn(()=>{}); // 애러
someObject = jest.fn(()=>{}); // 애러

someObject.someModule = jest.fn(()=>{});
```

## 모듈안에 함수만 있을경우 전체 모듈을 불러오자
```js
import * as someFunctions from './someFunctions'; 

jest.spyOn(someFunctions, 'someMethod', ()= >{}) 
```


# jest 에서 html 에 등록한 이벤트를 삭제하거나, 아무튼 html 자체를 리셋 하고 싶다. 
- https://github.com/facebook/jest/issues/1224
- Element.outerHTML 은 조작이 안됨....ㅠㅠ (https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML)
- 이벤트 삭제가 안된다!
- 이벤트 위임을 body에 걸어 주면 되는데, 테스트를 위해 코드를 변경할 필요가 있을가?

