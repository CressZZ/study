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