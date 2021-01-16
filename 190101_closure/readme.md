# 추가 
```js
function baz() {
  var x = "x value";
  var z = "z value";

  function foo () {
    console.log(x);
  }

  function bar() {
    function test(){
		/**
		 * 이시점에서 크롬 devtool scope를 보면 closure 로 x 가 정의 되어 있다.
		 * 즉 closure 는 foo() 호출이 없어도 정의된다. 
		 */
        debugger; 
    }
	test();
  };

  bar();
}
baz();

```


```js
function baz() {
  var x = "x value";
  var z = "z value";

  function test() {
    /**
     * 이시점에서 크롬 devtool scope를 보면 closure 로 x 가 정의 되어 있다.
     * 즉 closure는 bar()를 안불러와도, 일단 함수내에서 outer 의 변수를 참조 하고만 있어도
	 * 생성이 된다고 보며, closure 라는건 baz()의 실행 컨텍스트 안에(?) 있다고 봐야 한다
     */
    debugger;
  }
  test();

  function bar() {
    function foo() {
      console.log(x);
    }
  }

  console.log("aa");
}
baz();
```

```js
function baz() {
  var x = "x value";
  var z = "z value";

  function bar() {

	function foo () {
		console.log(x);
	}

    function test(){
		/**
		 * 이시점에서 크롬 devtool scope를 보면 closure 로 x 가 정의 되어 있다.
		 * 즉 bar의 실행컨텍스트 안에 closure가 정의 되어 있다고 보이며, 
		 * 즉 closure 는 foo() 호출이 없어도 정의된다. 
		 */
        debugger; 
    }
	test();
  };

  bar();

  /**
   * 이시점에서는 closure가 없다. local 스코프로 , x, z 가 정의 되어 있을뿐...
   * 즉 bar의 실행컨텍스트 안에 closure가 정의 되어 있다고 보인다. 
   */
  console.log('aa');
}
baz();

```