# ESLint: 기존 설정 시스템 vs. Flat Config

## 1. 기존 `.eslintrc` 방식의 특징
### 다중 설정 파일 허용
- 프로젝트의 여러 디렉토리에 `.eslintrc` 파일을 둘 수 있었음.
- 다양한 형식(JSON, YAML, JavaScript)을 지원했으며, `package.json`에도 설정을 추가 가능.

#### 예시: 다중 설정 파일
```plaintext
project/
├── .eslintrc        <-- 루트 디렉토리 설정 파일
├── src/
│   ├── .eslintrc    <-- src 디렉토리 설정 파일
│   ├── index.js
│   └── components/
│       ├── Button.js
│       └── Input.js
└── test/
    ├── .eslintrc    <-- test 디렉토리 설정 파일
    └── example.test.js
```

#### 파일별 탐색 및 병합 과정
- ESLint는 lint할 파일 위치에서부터 상위 디렉토리로 올라가며 `.eslintrc` 파일을 검색.
- 찾은 설정 파일을 병합하여 최종 설정을 결정.

##### 예시: `src/components/Button.js` 파일 lint 시
1. `src/components/` 디렉토리: `.eslintrc` 없음.
2. `src/` 디렉토리: `.eslintrc` 발견, 설정 읽음.
3. `project/` 디렉토리: `.eslintrc` 발견, 설정 병합.

##### 문제점
1. **복잡성 증가**:
   - 디렉토리마다 설정 파일이 분산되어 관리가 어려움.
2. **성능 저하**:
   - 각 lint 대상 파일마다 설정 파일을 반복적으로 탐색 및 병합해야 함.
3. **충돌 가능성**:
   - 서로 다른 설정 파일 간의 규칙 충돌 가능.

---

## 2. Flat Config 방식의 특징
### 단일 설정 파일 사용
- 설정 파일 이름: `eslint.config.js`
- 파일 형식: JavaScript 하나로 통일.
- 프로젝트 내 모든 ESLint 설정을 단일 파일에 저장.

#### 예시: Flat Config 파일
```javascript
export default [
  {
    files: ["src/**/*.js"],
    rules: {
      "no-console": "warn",
    },
  },
  {
    files: ["test/**/*.js"],
    env: {
      jest: true,
    },
  },
];
```

### 설정 파일 검색 방식
1. **현재 작업 디렉토리(CWD)**에서 `eslint.config.js` 파일 검색.
2. 현재 디렉토리에 없으면 상위 디렉토리로 이동하며 검색.
3. 루트 디렉토리(`/`)에 도달할 때까지 반복.

#### 예시: 설정 파일 검색
```plaintext
project/
├── eslint.config.js    <-- Flat Config 설정 파일
├── src/
│   ├── index.js
│   └── components/
│       ├── Button.js
└── test/
    └── example.test.js
```
- **`cwd = project/`**: `eslint.config.js` 바로 발견.
- **`cwd = project/src`**: 상위 디렉토리로 이동하여 `project/`에서 발견.
- **`cwd = project/test`**: 상위 디렉토리로 이동하여 `project/`에서 발견.

### 장점
1. **간소화**:
   - 단일 파일로 설정 관리.
   - 디렉토리별 설정 파일 분산 문제 해결.
2. **성능 향상**:
   - 디스크 접근 및 설정 병합 과정 감소.
3. **JavaScript 유연성 활용**:
   - 조건부 설정이나 동적 구성이 쉬워짐.

---

## 3. 기존 `.eslintrc`와 Flat Config의 차이점
| 특징                    | 기존 `.eslintrc`                | Flat Config               |
|-------------------------|---------------------------------|---------------------------|
| **설정 파일 위치**      | 여러 디렉토리에서 허용          | 단일 위치 (`eslint.config.js`)|
| **파일 형식**           | JSON, YAML, JS, package.json    | JavaScript                |
| **파일 탐색 방식**      | lint 대상 파일마다 위로 탐색     | `cwd`에서 위로 탐색       |
| **설정 병합**           | 각 디렉토리별로 병합 필요        | 병합 불필요               |
| **성능**                | 디스크 접근 및 연산 비용 높음    | 디스크 접근 최소화         |
| **유연성**              | 제한적                         | JavaScript로 동적 구성 가능 |

---

## 4. 결론
Flat Config는 기존 `.eslintrc` 방식의 복잡성과 성능 문제를 해결하기 위해 도입된 새로운 설정 시스템이다. 단일 설정 파일과 JavaScript 기반 구성은 설정 관리를 단순화하고 성능을 향상시키며, 특히 대규모 프로젝트에서 효과적이다. 기존 방식에서 전환할 경우 설정 병합 문제를 줄이고 개발 생산성을 높일 수 있다.

