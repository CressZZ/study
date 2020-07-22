상으# 내용
.ignore 가 적용되는 범위는 어떻게 될까?

# 일단 기본적으로 .gitignore 파일이 있는 폴더의 상위 폴더내용은 ignore처리를 못한다.

# /ignore.js
- .gitignore 파일이 있는 depth의 ignore.js만 적용한다. 하위폴더는 적용 안됨

# */ignore.js
- .gitignore 파일이 있는 depth의 바로 아래 하위 depth의 ignore.js만 적용 된다. 같은 depth의 폴더는 적용 안됨

# **/ignore.js
- .gitignore 파일이 있는 depth를 포함하여 모든 하위 depth(리커시브)의 ignore.js만 적용 된다. 

# */**/ignore.js (응용!)
- .gitignore 파일이 있는 depth 하위 depth(리커시브)의 ignore.js만 적용 된다. 같은 depth의 폴더는 적용 안됨

# ignore.js
- 현재의 depth 및 하위 depth의 ignore.js 모두 적용 한다. (**/ignore.js 와 같은걸로 보임)

# 상위 폴더와 하위퐁더에 .gitignore가 있을 경우
상위폴더가 먼저 적용되고 하위 폴더가 덮어 쓴다. 