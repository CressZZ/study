// iterable : iterator 객체를 리턴하는 [Symbol.iterator] 메서드를 가지고 있는 객체

// iterator : next() 메서드를 통해 {valule, done} 를 리턴하는 객체

// Well Fomred Iterator : 자기자신을  리턴하는 [Symbol.iterator] 메서드를 가지고 있는 iterator

// generator : Well Fomred Iterator을 반환하는 함수 / iterator이자 iterable을 반환하는 함수,

// map
const map = (f, iter) => {
    let res = [];
    for (const e of iter){
        res.push(f(e));
    }
    return res;
}

// filter
const filter = (f, iter) => {
    let res = [];
    for (const e of iter){
        f(e) && res.push(e);
    }
    return res;
}

// reduce: 반복할 함수, 초기값, 이터럴을 받아서 누적값을 구한다.
const reduce = (f, acc, iter) => {
    if(!iter){
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }

    for(const a of iter){
        acc = f(a, acc); // 인자로 받은 함수를 '현재 값'과 '누적 값'을 인자로 실행한다. 
    }

    return acc;
}

// go : [하나의 값과, 함수들]로 이루어진 인자들을 배열로 바꾼다음에 reduce의 iter매개변수에 던지고,
// iter에 있는 함수를 누적값으로 실행하는 함수 
const go = (...args) => reduce((a, acc)=>a(acc), args);

// pipe : go함수를 함수 팩토리 취급하여 go 함수를 만드는데, 인자로는 초기값을 던지는 함수를 만든다. 
const pipe = (firstFs, ...fs) => (...inits) => go(firstFs(...inits), ...fs);

// curry : 함수를 받아서 함수를 리턴한 후, 이후 인자를 받으면, 인자가 원하는 갯수일 경우 함수를 실행한다. 
const curry = f => (a, ...arg) => arg.length ? f(a, ...arg) : (...arg2) => f(a, ...arg2); 