/* 클로저는 함수와 함수가 선언된 어휘적 환경 (렉시컬 환경, 렉시컬 스코프)의 조합이다. */
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures

// 어휘적 유효 험위 (Lexical scoping)
function init(){
    var name = "Cress";
    function displayName(){
        console.log(name);
    }
    displayName();
}

init();

// 단어 "어휘적(lexcal)"은 어휘적 유효 범위 지정이
// [소스코드 내에서 변수가 선언된 위치를 사용하여],
// 변수의 사용가능한 위치를 결정한다는 사실을 나타낸다. 

// 클로저 (Closure) - 기본 예제 (함수 팩토리)
function makeFunc(){
    var name = "Cress"; 
    // 아래의 displayName() 함수가 만들어 질때, 주위 환경(lexcal scope)를 기억한다.
    // 즉, name이라는 변수를 기억한다. 
    return function displayName(){
        console.log(name);
    }
}

var myFunc = makeFunc();
myFunc();

// 몇몇 프로그래밍 언어에서, 함수 안의 지역 변수들은 그 함수가 수행되는 기간 동안에만 존재 한다. 
// makeFunc() 실행이 끝나면 name 변수에 더이상 접근할 수 없게 될것으로 예상하는 것이 `합리적`이다. 
// 그러나 javascript는 아니다. 
// 그 이유는 자바스크립트의 함수가 클로저를 형성하기 때문이다. 
// ** 클로저는 함수와 함수가 선언된 어위적 환경의 조합니다. **
// ** 이 환경은 클로저가 생성된 시점의 => 범위 내에 있는 모든 지역 변수로 구성된다. **
// 위의 경우 변수 `myFunc` 은 `makeFunc` 가 실행될때 생성된 `displayName` 함수의 
// 인스턴스에 대한 `참조` 이다. 
// `displayName` 의 인스턴스는 `name` 이 있는 어휘적 환경에 대한 참조를 유지한다. 
// 이러한 이유로 `myFunc` 가 호출 될 때 변수 `name` 은 사용 할 수 있는 상태로 남게 된다. 


// 클로저 (Closure) - 인자로 전달받은 값에 대한 클로저 생성 예제(함수 팩토리)
function makeAdder(x){
    return function(y){
        return x + y;
    };
};

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(makeAdder(2))); // 12


// 클로저 (Closure) - 실용적인 함수 팩토리 
// 각각의 px에 따라 <body>의 font-size를 변경하는 함수 만들어 적용하기
function makeSizer(size){
    return function(){
        document.body.style.fontSize = size + 'px';
    };
}

// 함수 만들기
var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

// 각 이벤트에, 각각 해당하는 함수 바인딩 시키기
document.getElementById('size-12').oclick = size12; 
document.getElementById('size-14').oclick = size14; 
document.getElementById('size-16').oclick = size16; 


// 클로저 (Clousre) - Private method 구현하기 ([싱글톤 패턴])
// counter 객체는 하나밖에 존재 할 수 없으므로, 
// "클로저를 이용한" => "모듈패턴을 이용한" => "싱글톤 패턴이다."
var counter = (function(){
    var privateCounter = 0;
    function changeBy(val){
        privateCounter += val;
    }
    return {
        increment: function(){
            changeBy(1);
        }, 
        decrement: function(){
            changeBt(-1);
        }, 
        value: function(){
            return privateCounter;
        }
    }
})();

console.log(counter.value());
counter.increment();
counter.increment();
console.log(counter.value());
counter.decrement();
console.log(counter.value());


// 클로저 (Clousre) - Private method 구현하기 ([모듈 패턴])
// 각각 다른 counter 객체가 만들어 질 수 있고, 
// 각각 counter 객체는 'Private member' 와 '전역변수와의 구별' 이 구현되어 있으므로 
// "클로저를 이용한" => "모듈패턴" 이라고 할 수 있다. 
var makeCounterObject = function(){
    var privateCounter = 0;
    function changeBy(val){
        privateCounter += val;
    }
    return {
        increment: function(){
            changeBy(1);
        }, 
        decrement: function(){
            changeBt(-1);
        }, 
        value: function(){
            return privateCounter;
        }
    }
}

var counter1 = makeCounter();
var counter2 = makeCounter();
alert(counter1.value()); /* 0 */
counter1.increment();
counter1.increment();
alert(counter1.value()); /* 2 */
counter1.decrement();
alert(counter1.value()); /* 1 */
alert(counter2.value()); /* 0 */


// 클로저 (Clousre) - 일반적인 실수 ('콜백'&&'루프' 환경 에서)
function showHelp(help){
    document.getElementById('help').innerHTML = help;
}

function setupHelp(){
    var helpText = [
        { 'id': 'email', 'help': 'Your e-mail address' },
        { 'id': 'name', 'help': 'Your full name' },
        { 'id': 'age', 'help': 'Your age (you must be over 16)' }
    ]

    for (var i = 0; i<helpText.length; i++){
        var item = helpText[i];
        documebt.getElementById(item.id).onfocus = showHelp.bind(null, item.text);
    }
}

setupHelp();