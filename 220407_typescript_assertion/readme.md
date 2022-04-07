# 할당 assertion (오피셜)
## 타입스크립트에 할당 assertion 기능 추가된 PR 
https://github.com/microsoft/TypeScript/pull/20166

## 내용 설명
This PR introduces the ability for a variable or property declaration to include a definite assignment assertion in the form of a ! character following the variable or property identifier. A definite assignment assertion instructs the control flow analyzer to always consider the variable definitely assigned, even when the analyzer is unable to prove it.

```ts
// Compile with --strict
class C {
    data!: string;  // Suppress strict initialization check
    setData(value: string) {
        this.data = value;
    }
    getData(): string {
        return this.data;
    }
}
```
In the example above, if it is known that setData will always be called before getData, there is no need to initialize the data property upon construction. However, the control flow analyzer can't make that assumption, and in --strictPropertyInitialization mode (see #20075) it reports an error unless a definite assignment assertion ! is included.

```ts
function f() {
    let x!: number;  // Suppress definite assignment check
    doSomethingWithCallback(() => {
        x = 1;
    });
    console.log(x);
}
```


In the example above, if it is known that doSomethingWithCallback will always invoke the callback before returning, there is no need to initialize x in its declaration. However, the control flow analyzer conservatively assumes that x is used before being assigned in the console.log(x) call and reports an error. A definite assignment assertion can now be included in the declaration to suppress this error.

Definite assignment assertions are permitted only in the following cases:

On a property declaration in a class, provided the property has a type annotation and no initializer and isn't static or abstract.
On a let or var variable declaration, provided the variable has a type annotation and no initializer.
Related issues: #11463, #12855, #13811.

# 연산 assertion 
## 할당 assertion 이랑 다르다. 

```ts
console.log(test.test1!.test);
```