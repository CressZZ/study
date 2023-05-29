https://stackoverflow.com/questions/63424069/when-i-import-a-type-from-an-npm-package-in-typescript-which-file-is-it-coming


명히 Typescript는 전역적으로 설치된 유형 패키지로 대체되지 않습니다. VSCode BTW에는 캐싱 메커니즘(자동 유형 획득)이 있습니다. node_modules 디렉토리에서 유형을 찾을 수 없을 때마다 다음 디렉토리에서 유형을 찾습니다.

맥: ~/Library/Caches/TypeScript
윈도우: %LOCALAPPDATA%MicrosoftTypeScript
리눅스: ~/.cache/typescript/

찾을 수 없는 경우에는 SimplyTyped에서 누락된 유형을 다운로드하여 앞서 언급한 디렉토리에 넣습니다.