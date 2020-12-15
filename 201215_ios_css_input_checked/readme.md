# 이슈
ios 에서......

```scss
  input:checked + label {
	  display: none;
  }
```

이 초기 렌더링시 적용이 안되는 현상이 발생 (그것도 간헐적으로 적용이 되기도 한다.)

## 해결방안
```scss
  input[type="radio"]:checked + label {
	  display: none;
  }
```
- 해결 된다. ...... 이게 예전에는 없었던 이슈인거 같다. ios 업데이트좀.....잘....