
async function test(){
    await Promise.all([
         test2(),
         test3()
    ]);
    console.log('end')
}

 function test2(){

    return new Promise(res=>{
        setTimeout(()=>{
            console.log('done test2')
            res(true)
        },2100)
    })
}
function test3(){
    return new Promise(res=>{
        setTimeout(()=>{
            console.log('done test3')

            res(true)
        },2000)
    })
}
// test2().then(r=>console.log(r))
test()