// require("@babel/polyfill");

const test = 'test';

var promise = function(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('test');
        },1000)
    })
}


promise().then((val)=>{console.log(val)});

var as = async function(){
    var val = await promise();
    console.log(val);
}

as();