// import "core-js";
// import "regenerator-runtime/runtime";
// import "./babelTest";
// async function test(){
//     await Promise.all([
//          test2(),
//          test3()
//     ]);
//     console.log('end')
// }

 function test2(){

    return new Promise(res=>{
        setTimeout(()=>{
            console.log('done test2')
            res(true)
        },2100)
    })
}
import "./babelTest";
// require("./compiled");
// function test3(){
//     return new Promise(res=>{
//         setTimeout(()=>{
//             console.log('done test3')

//             res(true)
//         },2000)
//     })
// }
// test2().then(r=>console.log(r))
// // test()

// console.log('a');
// export const a = 1;
// exports.v = 1;

// console.log(exports);
console.log(typeof [1,2]);




var a = 2;
if(a === 1) this._node.find('iframe').attr('src', '');

exports.Modal = 1;