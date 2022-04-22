https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void

Why are functions returning non-void assignable to function returning void?
I wrote some code like this and expected an error:


```ts
function doSomething(): number {
    return 42;
}

function callMeMaybe(callback: () => void) {
    callback();
}

// Expected an error because 'doSomething' returns number, but 'callMeMaybe'
// expects void-returning function
callMeMaybe(doSomething);
```

This is the expected and desired behavior. First, refer to the "substitutability" primer -- the fact that doSomething returns "more" information than callMeMaybe is a valid substitution.

Second, let's consider another case:
```ts
let items = [1, 2];
callMeMaybe(() => items.push(3));
```
This is isomorphic to the example that "wanted" an error. Array#push returns a number (the new length of the array), but it's a safe substitute to use for a void-returning function.

Another way to think of this is that a void-returning callback type says "I'm not going to look at your return value, if one exists".


##
잘생각해보면 
void 리턴 타입이 string 을 포용한하고, 또 string 리턴 타입의 함수에 할당이 가능하다고 해도, 
내가 void 형태로 안쓰고, 리턴된 string을 사용하려면 타입스크립트가 애러를 뿌려 줄 것이다. 
그러니까 난 함수가 실제로 string 을 리턴 한다고 할지라도, 
쓰면 안되는 거다. (코드를 컴파일 할때 애러를 뿌려 주니까 쓸수가 없다. 물론 진짜 컴파일이 아니니까 쓸수는 있겠지...)

아무튼 이거 관련해서 글을 읽다보면, 함수가 실제로 string 을 리턴 해주냐 안해주냐는 상관없다고 나오는데 그게 무슨 소린지 몰랐는데
대충 이해가 간다. 
함수가 리턴 해주고 말고는 상관이 없다. 

난 쉽게 말하면 vscode 에서 리턴된 string 을 가져다가 쓸수가 없다. (타입스크립트 애러)