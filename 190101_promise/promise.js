/**
 * Promise 는 비동기 조작의 '최종완료'나 '실패'를 표현해 주는 객체이다. 
 */

// 1. promise의 가장 기본적인 예제 - 프로미스 객체를 직접 실행
var promise1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve('Done');
    }, 3000);
}) 

promise1.then((result)=>console.log(result)); // 프로미스 객체를 직접 실행


// 2. promise를 함수를 통하여 실행 - Promise를 반환해주면 된다. 
function myAsyncFunction(text){
    var promiseObj = new Promise((resolve, reject)=>{
        setTimeout((text)=>{
            resolve(text+" !!!")
        }, 1000)
    })

    return promiseObj
}

myAsyncFunction("done")
    .then((result)=>console.log(result));



// 3. 'ajax' && 'promise' && 'async/await' 예제

// ajax 및 프로미스 관련 함수 
function ajaxTest(){
    var promise = new Promise((resolve, reject)=>{
        try{
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'index.html');
            xhr.onload = ()=>{resolve(xhr.responseText)};
            xhr.onerror = () =>{reject(xhr.status)};
            xhr.send();
        }catch{
            reject('애러가 발생했당')
        }
    })
    return promise;
}

// 일반적인 프로미스
ajaxTest()
    .then((result)=>console.log(result), (message)=>console.log(message))
    .catch((err)=>console.log(err))

// async/await
async function asyncTest(){
    try{
        var message = await ajaxTest();
        console.log(message);
    }catch(err){
        console.log(err)
    }
}