# 아래 두개의 코드의 경우에는 어때? 동일한 동작을 하게 될까?

```js
  const title2 = useMemo(() => {
    return titleMaps[WAREHOUSE_TYPE];
  }, [WAREHOUSE_TYPE]);


  const [title2, setTile2]  = useState('');
  useEffect(()=>{
    setTile2(titleMaps[WAREHOUSE_TYPE]);
  }, [WAREHOUSE_TYPE])
```

## ChatGPT
이 두 코드 조각은 비슷한 결과를 달성하지만, 그 작동 방식에는 약간의 차이가 있습니다. 둘 다 WAREHOUSE_TYPE의 값이 변경될 때마다 title2 값을 업데이트하는 것이 목표입니다.

useMemo: useMemo는 WAREHOUSE_TYPE 값이 변경될 때만 title2 값을 다시 계산하고 그 값을 저장합니다. 이는 렌더링 도중에 동기적으로 발생하므로, 렌더링 결과에는 최신의 title2 값이 즉시 반영됩니다.

useState와 useEffect: useState는 컴포넌트의 로컬 상태를 관리하기 위해 사용하고, useEffect는 주어진 종속성 배열의 값이 변경될 때마다 부수 효과를 발생시키기 위해 사용합니다. 이 경우, WAREHOUSE_TYPE 값이 변경될 때마다 useEffect가 실행되어 setTile2를 호출하고 title2 값을 업데이트합니다. 그러나 이는 비동기적으로 발생하며, 렌더링이 완료된 후에 실행됩니다. 따라서, useEffect 내부에서 상태를 변경하면 그 변경 사항이 즉시 렌더링에 반영되지 않습니다. 대신, 상태 업데이트는 새로운 렌더링을 트리거합니다.

따라서, 이 두 코드 조각은 약간 다른 방식으로 작동하지만, 최종 결과는 동일합니다: title2 값은 WAREHOUSE_TYPE 값이 변경될 때마다 업데이트됩니다. 그러나 성능 및 렌더링 효율을 고려하면, useMemo는 비용이 많이 드는 연산에 대한 결과를 메모이제이션하기 위한 것이고, useState와 useEffect는 로컬 상태 업데이트와 부수 효과를 관리하기 위한 것이므로, 각 사용 사례에 따라 적절한 것을 선택해야 합니다.

## 결국
동기와 비동기의 차이인거 같다! 


# 추가 reselct


```js

import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// reselect를 사용한 선택자 함수
const selectExpensiveData = createSelector(
  (state) => state.data,
  (data) => {
    // 비용이 많이 드는 계산이나 데이터 변형
    // ...
    return transformedData;
  }
);

const MyComponent = () => {
  const data = useSelector(selectExpensiveData);

  // ...
};

```
