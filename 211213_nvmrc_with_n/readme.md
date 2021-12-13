# n 에서 .nvmrc 파일 사용하기

https://www.npmjs.com/package/n
`n auto`

위 명령어를 입력하면 아래 3개의 파일을 순차적으로 검색한다.


There is an `auto` label to read the target version from a file in the current directory, or any parent directory. n looks for in order:

- `n-node-version`: version on single line. Custom to n.
- `node-version`: version on single line. Used by multiple tools: node-version-usage
- `nvmrc`: version on single line. Used by nvm.
if no version file found, look for engine as below.