
/**
 * class 의 constructor 함수가 프로미스(async함수의 호출결과)를 리턴하고, 
 * 이 리턴된 프로미스가 Resolved 되면 인스턴스가 리턴된다. 
 * 
 * 추가로 싱글톤 형식으로 만듬. * 
 */

const singleton = Symbol();
const singletonEnforcer = Symbol();

class Test{
    constructor({enforcer} = {}){
        if (enforcer !== singletonEnforcer) throw new Error('[Pwa.js] can not construct [PWa]. static getInstance() 를 사용해 주세요.');

        return (async ()=> {
            try{
                await this.init();
                return this
            }catch(err){
                console.error(err);
            }
        })();
    }

    async init(){
        console.log('init!')
        this.result = await this.awaitFn();
    }

    awaitFn(){
        console.log('awaitFn!')

        return new Promise(res=>{
            setTimeout(()=>{   
                console.log('done Promise')
                res('done');
            }, 3000)
        })
    }

    static async getInstance(){
        if(this[singleton]) {
            console.log('[Pwa.js] Already have Instance!');
         console.log(this[singleton]);

            return this[singleton];
        }

        this[singleton] = new Test({enforcer: singletonEnforcer});
        console.log(this[singleton]);
        return this[singleton];
    }
}

// let [a, b] = await Promise.all([Test.getInstance(), Test.getInstance()])
let a =  getInstanceA(); 
let b =  getInstanceB();

async function getInstanceA(){
    console.log('getInstanceA');
    await Test.getInstance();
}

async function getInstanceB(){
    console.log('getInstanceB');
    await Test.getInstance();
}

console.log(a, b);

a.then(res=>console.log('a done'))
b.then(res=>console.log('b done'))