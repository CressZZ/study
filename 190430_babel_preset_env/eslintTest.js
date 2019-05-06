
console.log('dd')

new Promise(()=>{
   


})

// console.log(var2)
var2 = "d";

async function test(){
    await test3();
}

function test3(){
    console.log('aa')
}

class Test{

    #age = 319;
    a = 2;
    boundFunction = () => {
        return this.instanceProperty;
    };

  
}

class Person {
    #aged = 1;
  
    #increaseAge() {
      this.#aged++;
    }
  
    birthday() {
      this.#increaseAge();
      alert("Happy Birthday!");
    }
  }