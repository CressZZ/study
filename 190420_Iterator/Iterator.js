/*
참고 : https://infoscis.github.io/2018/01/31/ecmascript-6-iterators-and-generators/
*/

// Iterator, Genrator, Iterable...

// # Iterator란?
// 1. Iterator는 반복을 위해 설계된 특정 인터페이스가 있는 객체입니다.
// 2. 모든 Iterator 객체는 결과 객체를 반환하는 next() 메서드를 가지고 있습니다.
// 3. next()를 호출하면 {done: true , value: '' } 의 형식으로 **done, value** 키값을 가진 객체를 반환한다. 

// #내장 Iterator (ES6에서 기본 제공되는 Iterator)
// 1. entries() 메서드를 호출하면
//      : 값이 **key - value** 쌍인 Iterator를 반환합니다.
// 2. values() 메서드를 호출하면 
//      : 값이 컬렉션의 **value**인 Iterator를 반환합니다.
// 3. keys() 메서드를 호출하면 
//      : 값이 컬렉션에 포함된 **key**인 Iterator를 반환합니다.

// ES5에서 Iterator 구현하기 
function createIterator(items){
    var i = 0;

    return {
        next: function(){
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;

            return {
                done, value
            };
        }
    };
}

var iterator = createIterator([1,2,3]);

console.log(iterator.next()); // {done: false, value: 1}
console.log(iterator.next()); // {done: false, value: 2}
console.log(iterator.next()); // {done: false, value: 3}
console.log(iterator.next()); // {done: true, value: undefined}
console.log(iterator.next()); // {done: true, value: undefined}


// # Generator란?
// 1. Iterator를 반환하는 함수
// 2. Generator 함수는 function 키워드 다음에 별표 (*)가 추가된다.
// 3. 새로운 yield 키워드를 사용한다.(return되는 객체의 value값이 된다.) (return과 비슷하게 사용한다. )
// 4. Generator 함수 중 가장 흥미로운 부분은 각 yield 문 다음에 실행을 멈추는 것입니다. 
// 5. 함수 중간에 실행을 중지하는 이 기능은 매우 *강력* 하며 Generator 함수의 사용을 흥미롭게 합니다.

function *genarator(){
    yield 1;
    yield 2;
    yield 3;
}

var iteratorByGenerator = genarator();
console.log(iteratorByGenerator.next()); // {done: false, value: 1}
console.log(iteratorByGenerator.next()); // {done: false, value: 2}
console.log(iteratorByGenerator.next()); // {done: false, value: 3}
console.log(iteratorByGenerator.next()); // {done: true, value: undefined}



// yield를 for문으로 반환
function *genarator_2nd(items){
    for(let i=0; i<items.length; i++){
        yield items[i];
    }
}

var iteratorByGenerator_2nd = genarator_2nd([1,2,3]);
console.log(iteratorByGenerator_2nd.next()); // {done: false, value: 1}
console.log(iteratorByGenerator_2nd.next()); // {done: false, value: 2}
console.log(iteratorByGenerator_2nd.next()); // {done: false, value: 3}
console.log(iteratorByGenerator_2nd.next()); // {done: true, value: undefined}



// 함수 표현식으로만든 generator
let genarator_3rd = function *(items){
    for(let i=0; i<items.length; i++){
        yield items[i];
    }
}

var iteratorByGenerator_3rdd = genarator_3rd([1,2,3]);
console.log(iteratorByGenerator_3rdd.next()); // {done: false, value: 1}
console.log(iteratorByGenerator_3rdd.next()); // {done: false, value: 2}
console.log(iteratorByGenerator_3rdd.next()); // {done: false, value: 3}
console.log(iteratorByGenerator_3rdd.next()); // {done: true, value: undefined}



// 객체의 메서드로서의 generator
let obj = {
    createIterator: function *(items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i];
        }
    },

    // ES6단축 메서드
    *createIterator_2nd(items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i];
        }
    }
}
let iteratorInObj = obj.createIterator([1, 2, 3]);
let iteratorInObj_2nd = obj.createIterator_2nd([1, 2, 3]);



// # Genrator에서의 중요한점!
// yield 키워드는 Generator 내부에서만 사용할 수 있습니다. 
// 예를 들면 다음과 같이 Generator 내부 함수에서 사용하는 것을 포함하여 
// 다른 곳에서 yield를 사용하는 것은 구문 오류입니다.

function *createIterator_syntaxError(items) {
    /*
    items.forEach(function(item) {
        // syntax error
        yield item + 1;
    });
    */

    // 이것도 안됨(즉, this의 문제가 아님)
    /*
    items.forEach((item) => {
        // syntax error
        yield item + 1;
    });
    */
}



// #Iterable 이란?
// 1. Symbol.iterator 프로퍼티를 가진 *객체*
// 2. Symbol.iterator 프로퍼티는 주어진 객체에 대한 Iterator를(next() 메서드 가진 객체) 반환하는 함수를 지정한다. 
// 3. ES6에서 Array, Set, Map, String 은 *Iterable* 이다. 
//    (즉, Symbol.iterator 프로퍼티를 가지고 있다. => 주어진 객체에 대한 Iterator를 반환하는 함수를 가지고 있다.)
// 4. Generator가 기본적으로 Symbol.iterator 프로퍼티를 할당하므로 Generator가 만든 모든 Iterator도 Iterable입니다.
// 5. Iterable은 ECMAScript에 새로 추가된 for-of 루프와 함께 사용하도록 설계되었습니다.

let values = [1, 2, 3];
for (let num of values) {
    console.log(num);
}

// 1
// 2
// 3

// 단순히 Array이나 컬렉션의 값을 반복한다면 for 루프 대신에 for-of 루프를 사용하는 것이 좋습니다. 
// for-of 루프는 일반적으로 추적하기 위한 조건이 적기 때문에 에러 발생이 전통적인 for 루프보다 적습니다.
// 보다 복잡한 제어 조건이 필요한 경우 전통적인for 루프를 사용 하십시오.



// #Symbol.iterator && Default Iterator
// 각 Iterable이 가지고 있는 [#Symbol.iterator]프로퍼티는 
// 각 Iterable이 가지고 있는 ** Default Iterator ** (next() 메서드 가진 객체)를 *반환하는 함수*를 반환한다. 
// for of 문은 이 ** Default Iterator ** 를 사용한다. 
// ** Default Iterator ** 말고 다른 Iterator (next() 메서드 가진 객체)를 사용하고자 할때는
// entries(), value(), keys()등의 메소드를 호출한다.



// #Spread 연산자 &&  Default Iterator
// 일단 Spread 연산자가 무엇인고 하니, 
// 예를들면 Set 을 Array로 변환하는데 Spread 연산자 (...) 를 사용할 수 있다. 

let set = new Set([1,2,3,4,5]),
    array = [...set];

// 이게 가능한 이유는 
// 1. Spread 연산자는 모든 Iterable에서 작동한다. 
// 2. Spread 연산자는 해당 Iterable이 가지고 있는 Default Iterator를 사용하여 포함할 값을 결정한다.
// 3. 모든 값은 Iterator에서 읽혀지고 Iterator에서 값이 리턴된 순서대로 Array에 삽입된다. 
// 4. 즉, Map에 대한 Default Iterator는 **키-값** 쌍을 반환하기 때문에 
// 5. Spread연산자를 사용하면 new Map()호출 중에 전달된 Array처럼 보인다. 
let map = new Map([ ["name", "Nicholas"], ["age", 25]]),
    array = [...map];
console.log(array);         // [ ["name", "Nicholas"], ["age", 25]]


// #고급기능 => 나중에 하장
// 1. Iterator에 파라미터 넘기기
// 2. Iterator에서 에러 던지기
// 3. Generator의 Return 문
// 4. 비동기(Asynchronous) 작업 실행





