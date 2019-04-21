/**
 * [ Javascript (ECMA-262) 에서의 this ]
 * 1. Javascript에서 함수의 this키워드는 다른언어와 조금 다르게 동작한다. 
 * 2. 또한 엄격 모드와 비엄격 모드에서도 일부 차이가 있을 수 있다. 
 * 3. ** 대부분의 경우 this의 값은 함수를 호출한 방법이 결정한다. **
 * 4. this는 실행하는 중 할당으로 설정 할 수 없고, 함수를 호출 할 때 마다 다를 수 있다. 
 * 5. ES5(ES2009)는 함수를 어떻게 호출했는지에 상관하지 않고 this를 설정 할수 있는 bind메서드를 도입했다.
 * 6. ES6(ES2015)는 스스로 this 바인딩을(결정 하는)제공하지 않는 화살표 함수를 추가 했다. * 
 */

/* 전역 문맥 */
console.log( this === window); // true
a='it is this';
console.log(window.a) // 'it is this'
console.log(a) // 'it is this'

/* 함수 문맥 */
// 함수내부에서 this의 값은 함수를 호출한 방법에 의해 좌우된다. 

// 1. 단순호출 
// 1-1. 엄격 모드가 아닐때 
// this의 값이 호출에 의해 설정 되지 않는다. => **기본값으로** 전역 객체를 참조한다.
// 엄격모드에서는 **기본값** 이라는게 없다.  

function f1(){
    return this;
}
// 브라우저 
f1() === window; // true;
// Node.js
f1() === global; // true;


// 1-2. 엄격 모드일때 
// 엄격모드에서 this값은 실행 문맥에 진입하며 설정되는 값을 유지한다. 
// 즉, 엄격모드에서 실행 문맥이 this의 값을 설정 하지 않으면 undefined로 남아 있게 된다. 
// 아래의 예에서(엄격모드 함수호출) window.f2()로 호출 했으면 this는 window가 된다. 
// 하지만, f2()로 호출 했으니, this는 undefined 가 되는것이다.

function f2(){
    "use stict"; // 엄격 모드 참고
    return this;
}

f2() === undefined; // true;


// 2. call(), apply()
// this의 값을 한 문맥에서 다른 문맥으로 넘길때 사용한다. 
// 바로 호출한다.

function add(c, d){
    return this.a + this.b + c + d;
}
var o = {a:1, b:3};
add.call(o, 5, 7); // 1+3+5+7 = 16;
add.apply(o, [10, 20]); // 1+3+10+20 //34;


// 3. bind() 메서드 
// this의 값을 한 문맥에서 다른 문맥으로 넘길때 사용한다. 
// 바로 호출 하는 것이 아니라, 새로운 함수로 재정의 한다. 
// 호출 하려면 다시 () 로 호출 해야 한다. ( "f.bind(someObjectForNewThis)()" )

window.a = "old"
function f(){
    return this.a;
}

var g = f.bind({a: 'new'});
console.log(g()); // "new"

var h = g.bind({a: "impossible"}) // bind는 한번만 사용가능
console.log((h())) // "new"

var o = {
    a: 37, // o.a === 37
    f: f, // this === o
    g: g, // this === {a: "new"} (binding 해줬으니까)
    h: h  // this === {a: "new"} (binding 은 한번만 되니까)
}
console.log(o.a, o.f(), o.g(), o.h()) // 37, 37, new, new


// 4. 화살표 함수 
// 화살표 함수에서 this는 자신을 감싼 정적 범위 lexical contenxt 이다. 
// 전역 코드에서는 전역 객체를 가르킨다. 
// 화살표 한수는 call(), bind(), apply()를 사용한 this의 바인드를 무시한다. 

var globalObject = this;
var foo = (()=>this);
console.log(foo() === globalObject); //true

// 객체로서 메서드 호출 
var obj = {func: foo};
console.log(obj.func() === gobalObject) // true; 안바뀐다.
// call()로 this 설정 시도 
console.log(foo.call(obj) === globalObject); //true; 안바뀐다.
// bind()로 this 설정 시도 
console.log(foo.bind(obj)() === globalObject); // true; 안바뀐다.ㅣ 

// 화살표 함수의 다른 예
var funcArrow = () => this;
var funcNormal = function(){
    return this
}
var tempObj = {
    funcArrow: funcArrow, // this가 변하지 않음 
    funcNormal: funcNormal, // this가 변함
};

funcArrow(); // window
funcNormal(); // window

tempObj.funcArrow() // window - 안변함, 생성될때 자신을 감싼 정적 범위
tempObj.funcNormal() // tempObj - 변함 

// 화살표 함수는 이것이 만들어 졌을때의 코드에서 바로 바깥의 함수(혹은 class)의 this값이 사용됩니다
// 다른 함수내에서 생성된 화살표 함수도 마찬가지 이다. 
// 다른 함수내에서 화살표 함수가 생성된 경우, 이 화살표 함수의 this는 이 화살표 함수를 둘러싸고 있는 함수(혹은 class)의 this 이다. 

// 위에 예에서 한번 꼬은 예제 
var obj = {
    bar: function(){
        // x() 함수는 x()함수 내의 this를 리턴 하는데, x는 화살표 함수이므로 
        // 해당하는 this는 이 화살표 함수의 this는 이 화살표 함수를 둘러싸고 있는 
        // '함수'(혹은 'class')의 this 이다. 
        // 즉 여기서는 x()를 둘러 쌓고 있는 bar() 안에서 정의된 this이다. 
        // (참고로 bar()는 화살표 함수가 아니므로 bar()의 this는 호출 방법에 따라 변할 수 있다는 것이 이예제의 핵심)
        // (즉 x() 함수의 this도 bar() 함수내의 this에 따라 변할 수 있다는 것도 핵심!)
        var x = (()=>this); 
        return x; 
    }
}

var fn1 = obj.bar() // bar()가 가지는 this는 obj이며 따라서 x()가 가지는 this역시 obj가 된다.
console.log(fn1() === obj) // true;
// 만약 x()가 화살표 함수가 아니라면, this는 메서드로서가 아닌, 메서드 안에서 호출 됬으므로 
// window 혹은 undefiend(엄격모드라면) 로 반환 되었을 것이다. 

var fn2 = obj.bar; 
fn2() // 여기서 x함수가 반환되는데, 이때 x함수가 가지는 this는 window가 된다. 왜냐하면 여기서 obj.bar가 가지는 this가 window이기 때문이다. 
console.log(fn2()() === window)

// 위의 예가 좀 햇갈리긴 한데, 잘보면 또 그렇지도 않다. 


// 5. 객체의 메서드로서
// 함수를 **어떤 객체의 메서드** 로 호출하면 this는 그 객체를 사용한다. 
var o ={
    prop: 37,
    f: function(){
        return this.prop;
    }
};
console.log(o.f()); // 37

var o = {prop: 37};
function independent(){
    return this.prop;
}
o.f = independent;

console.log(o.f()); // 37;

o.b = {g: independent, prop: 42};
// 여기서 independent함수는 o.b의 메소드 g로서 호출된다. 
// 이것은 independent함수 내부의 this는 o.b가 됨을 의미한다. 
console.log(o.b.g()); // 42 


// 6. 객체의 프로토타입 체인 안에서의 this
// later...

// 7. 접근자와 설정자의 this
// later...


// 8. 생성자로서
// this는 생성자로 생성된 새로운 객체(인스턴스)를 가르킨다.
// 생성자 함수는 기본적으로 this에 의해 참조된 객체를 반환하지만, 다른 객체를 반환할 수도 이따. 이때 반환값이 객체가 아니라면, 그냥 this에 의해 참조된 객체가 반환된다.
function C2() {
    this.a = 37;
    return {a: 38};
}

o = new C2();
console.log(o.a); // 38


// 9. DOM이벤트 처리기로서 
// 함수를 이벤트 처리기로사용하면 this는 이벤트를 밸생한 element로 설정된다. 

// 10. 인라인 이벤트 핸들러에서 
// 10-1. this가 이벤트 처리기로 배치한 DOM요소가 되는 경우 
<button onclick="alert(this.tagName.toLowerCase());">
  this 표시
</button>

// 10-2. this가 window가 되는 경우 
// 아래의 경우 내부함수의 this는 정해지지 않았으므로 
// 비엄격 모드에서 this를 설정하지 않은경우 기본값인 window가 설정된다. 
<button onclick="alert((function() { return this; })());">
  내부 this 표시
</button>





