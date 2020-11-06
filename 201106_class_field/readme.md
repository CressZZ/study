```js

class A {
	test = 'test A1'; // 인스턴스
	constructor(){
		this.test = 'test A2' // 인스턴스 
	}

	// 인스턴스에 직접 생성되는 메서드 (기본적으로 인스턴스가 프로토타입보다 우선)
	getTest = ()=>{		
		window.console.log('at instance');
		return this.test; 
	}

	// prototype 에 생성되는 메서드 (기본적으로 인스턴스가 프로토타입보다 우선)
	getTest(){
		window.console.log('at prototype');
		return this.test;
	}
}

class B extends A {
	// test = 'test B1' // 인스턴스

	getTest = super.getTest() // super 클래스의 prototype 에 있는 getTest() 를 실행시킨 결과값 으로 접근 시킨다. => constructor가 실행되기전에 super.getTest() 를 실행하는 듯합다. 
	getTest2 = super.getTest // super 클래스의 prototype 에 있는 getTest 에 접근 시킨다. 
	constructor(){
		super()
		this.test = 'test B2' // 인스턴스
		console.log('B constructor this.getTest:', this.getTest) //  # 'test A2' => constructor가 실행되기전에 super.getTest() 를 실행하는 듯합다. 
		console.log('B constructor this.getTest2() : ', this.getTest2()) // # 'test B2'
		console.log('B constructor this.test', this.test) // # 'test B2'
		this.getTest3 = super.getTest() // # 'test B2'
	}
	getTest4(){
		return super.getTest() // # 'test B2'
	}


}

var a = new A();
var b = new B();

console.log('a.test', a.test);
console.log('b.test', b.test)
console.log('a.getTest()', a.getTest());
console.log('b.getTest()',b.getTest)
console.log('b.getTest()',b.getTest3)
console.log('b.getTest()',b.getTest4())

```