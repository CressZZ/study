/**
 * Promise 는 비동기 조작의 '최종완료'나 '실패'를 표현해 주는 객체이다. 
 */

// 1. promise의 가장 기본적인 예제 - 프로미스 객체를 직접 실행
var promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Done');
    }, 3000);
})

promise1.then((result) => console.log(result)); // 프로미스 객체를 직접 실행


// 2. promise를 함수를 통하여 실행 - Promise를 반환해주면 된다. 
function myAsyncFunction(text) {
    var promiseObj = new Promise((resolve, reject) => {
        setTimeout((text) => {
            resolve(text + " !!!")
        }, 1000)
    })

    return promiseObj
}

myAsyncFunction("done")
    .then((result) => console.log(result));



// 3. 'ajax' && 'promise' && 'async/await' 예제

// ajax 및 프로미스 관련 함수 
function ajaxTest() {
    var promise = new Promise((resolve, reject) => {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'index.html');
            xhr.onload = () => { resolve(xhr.responseText) };
            xhr.onerror = () => { reject(xhr.status) };
            xhr.send();
        } catch{
            reject('애러가 발생했당')
        }
    })
    return promise;
}

// 일반적인 프로미스
ajaxTest()
    .then((result) => console.log(result), (message) => console.log(message))
    .catch((err) => console.log(err))

// async/await
async function asyncTest() {
    try {
        var message = await ajaxTest();
        console.log(message);
    } catch (err) {
        console.log(err)
    }
}


// 4. promise chainig
/*
[https://javascript.info/promise-chaining#returning-promises]
Normally, a value returned by a `.then` handler is immediately passed to the next handler, But thiere's and exceoption.
If the returned value is a promise, then the futher execution is suspended until it settles. After that, the result of that promise is given to the next `.then` handler.

for instance:
*/

new Promise((resolve, reject)=>{
    setTimeout(()=>resolve(1),1000);

}).then(result=>{
    alert(result); // 1

    return new Promise((resolve, reject)=>{ // (*)
        setTimeout(()=>resolve(result * 2), 1000);
    })

}).then(result =>{ //(**)
    alert(result) // 2
    return new Promise((resolve, reject)=>{
        setTimeout(()=>resolve(result*2), 1000)
    });
}).then(result =>{
    alert(result) // 4
});

/*
Here the first `.then` shows `1` and return `new Promise(...)` in the line(*).
After one sectond it resolves, and the result (the argument of `resolve`, here it's `result*2`) is passed on to handeler of the second `.then`in the line `(**)`. it shows `2` and does the same thing.
so the output is again 1->2->4, but now with 1second delay between `alert` calls.
Returning promises allows us to build chains of asynchronous actions.

*/

// promise chain에 대한 고찰


Promise.reject(1)
    .catch(res => { 
        console.log(res); 
        return new Promise((resolve) => {
            resolve(res + 3) 
        }) 
    })
    .then(console.log)

Promise.reject(1)
    .catch(res => { 
        console.log(res); 
        return new Promise((resolve, reject) => { 
            reject(res + 3) 
        }) 
    })
    .then(console.log)
    .catch((res) => {
        console.log(res + 10) 
    })


Promise.reject(1)
    .catch(res => { 
        console.log(res); 
        return new Promise((resolve, reject) => { 
            reject(res + 3) 
        })
        .catch(res=>{return res+2}) 
    })
    .then(console.log)
    .catch((res) => {
        console.log(res + 10) 
    })

Promise.reject(1)
    .catch(res=>{
        console.log(res);
        return res+4
    })
    .then(console.log)
    .catch((res) => {
        console.log(res + 10) 
    })

Promise.reject(1)
    .catch(res => { 
        console.log(res); 
        return new Promise((resolve, reject) => { 
            return 5
        }) 
    })
    .then(console.log)
    .catch((res) => {
        console.log(res + 10) 
    })

Promise.reject(1)
    .catch(res => { 
        console.log(res); 
        return Promise.resolve(5)
    })
    .then(console.log)
    .catch((res) => {
        console.log(res + 10) 
    })


/** 
 * 아래 두개의 차이점을 알아야 한다. 
 * // 1,2,3,4,5,6,7
 */

async function test(){
    console.log(1);
    console.log(await test2());
    console.log(3);
    await test3(); // await가 있음
    console.log(7);
}

function test2(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, (1000));
    })
};

async function test3(){
    console.log(4);
    console.log(await test4());
    console.log(6);
};

function test4(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(5);
        }, (1000));
    })
};

test();



/**
 * // 1,2,3,4,7,5,6
 */


async function test(){
    console.log(1);
    console.log(await test2());
    console.log(3);
    test3(); // awiat가 빠졌음
    console.log(7);
}

function test2(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, (1000));
    })
};

async function test3(){
    console.log(4);
    console.log(await test4());
    console.log(6);
};

function test4(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(5);
        }, (1000));
    })
};

test();

/**
 * 아무튼 reject를 잡아낸 catch뒤에는 resolve.
 * reject뒤에 catch가 없어야 진정한 reject(대신 catch없다면서 애러 난다)
 */
Promise.reject('1'); // reject (1)

Promise.reject('1') // reject (1)
    .catch(err=>{   // resolve(undefined)
        console.log(err); 
    });

Promise.reject('1') // reject (1)
    .catch(err=>{  // reject (3) // 밑에서 reject해줬으니까
        console.log(err); 
        return Promise.reject(3)
    })
    .catch(err=>{ // resolve (5)
        console.log(err); 
        return Promise.resolve(5) 
    });

/**
 * 위 상황에 대한 현실적인 예시
 */

self.addEventListener('install', event => {
    console.log('io');
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('install origin!', self.location.origin);

            return cache.addAll(CACHED_URLS) // 실패한다고 치자. reject 가 반환되고 부모의 then도 reject가 된다.
                .then(()=>{console.log('service worker is installed!')}) 
                .then(()=>{  self.skipWaiting();}) // 여기까지 올수 없다. 
        })
        .catch(err => console.log(err)) // 프로미스에 catch가 있으므로 이 프로미스는 resolve 된것 이고, 결과적으로  event.waitUntil()의 인자는 resolve이므로, install 이벤트가 완료 된다.
    )
})