# https://www.testim.io/blog/typescript-skiplibcheck/

According to TypeScript’s official documentation, skipLibCheck will “skip type checking of declaration files.” Let’s try clarifying it. When set, 
skipLibCheck ignores all errors in declaration (d.ts) files, including ones in node_modules. This includes type errors and compilation errors (like invalid syntax). It does not mean that declaration files are being ignored completely. tsc will only ignore errors from these files.

This behavior is a bit confusing for two reasons:

“Skip lib check” suggests that only library-related code will be skipped. This isn’t true – d.ts files that are part of the project will be affected too.
d.ts files aren’t really skipped entirely. As shown in the demo project, valid types coming from d.ts files are never skipped.
Perhaps the name skipDeclarationErrors is more accurate.

With skipLibCheck, tsc will make a “best effort” to handle valid types coming from declaration files, while treating invalid types as any instead of failing.

# 그니까 내가 궁금했던건
- skiplibcheck 옵션이 타입스크립트에서 기본제공하는 lib(library)만 건너뛰냐? d.ts 다 건너 뛰냐였는데, 
- 위 문서를 보면 나의 프로젝트에 있는 d.ts 모두 건너 뛰는 것으로 나온다. 
