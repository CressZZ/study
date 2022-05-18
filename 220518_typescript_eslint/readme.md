# 타입 스크립트와 eslint 를 같이 쓸때, no-undef 옵션은 끄는걸 추천함

- [스텍오버 플로우](https://stackoverflow.com/questions/64170868/why-eslint-consider-jsx-or-some-react-types-undefined-since-upgrade-typescript)
- [typescript-esllint 공식 문서](https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/linting/TROUBLESHOOTING.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors)
I get errors from the no-undef rule about global variables not being defined, even though there are no TypeScript errors
The no-undef lint rule does not use TypeScript to determine the global variables that exist - instead, it relies upon ESLint's configuration.

We strongly recommend that you do not use the no-undef lint rule on TypeScript projects. The checks it provides are already provided by TypeScript without the need for configuration - TypeScript just does this significantly better.

As of our v4.0.0 release, this also applies to types. If you use global types from a 3rd party package (i.e. anything from an @types package), then you will have to configure ESLint appropriately to define these global types. For example; the JSX namespace from @types/react is a global 3rd party type that you must define in your ESLint config.

Note, that for a mixed project including JavaScript and TypeScript, the no-undef rule (like any role) can be turned off for TypeScript files alone by adding an overrides section to .eslintrc.json:

```json
    "overrides": [
        {
            "files": ["*.ts"],
            "rules": {
                "no-undef": "off"
            }
        }
    ]
```

If you choose to leave on the ESLint no-undef lint rule, you can manually define the set of allowed globals in your ESLint config, and/or you can use one of the pre-defined environment (env) configurations.
