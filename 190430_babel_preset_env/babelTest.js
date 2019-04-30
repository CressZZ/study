class Test {
    property=1;
    method=function(){
        console.log(this.property);
        this.#increaseAge();
        console.log('age:', this.#age)
    }
    #age=19;
    #increaseAge() {
        this.#age++;
    }

    
}
const test = new Test();
