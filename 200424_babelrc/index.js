

function delayPromiseFactory(callback, ms){
    return new Promise((response)=>{
        setTimeout(()=>{
            callback()
            response();
        }, ms)
    })
}


const sayGoodmorning = ()=>{
    console.log('good morning');
}

const sayHi = () => {
    console.log('hi');
}

var delaySayGoodmoring = delayPromiseFactory(sayGoodmorning, 1000);

async function conversation(){
    startTimer();
    await delaySayGoodmoring;
    sayHi();
    endTimer();
}

conversation();

var time = 1;
var timer;
function startTimer(){
    timer = setInterval(() => {
        console.log(time++);        
    }, (100));
}

function endTimer(){
    clearInterval(timer)
}

