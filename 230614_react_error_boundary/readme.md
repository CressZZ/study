# 아마도 추측성 글

## 기본적으로 React 에서 Errorboundary 를 사용하는 예시
- 함수형 컴포넌트로 만들려면, `react-error-boundary` 가 필요하다. 
- ErrorBoundary 가 컴포넌트들의 상단에 위치 함으로서, 내부적으로 어찌 어찌 해서 애러를 잡고, (class 컴포넌트인 경우 `getDerivedStateFromError` 스테틱 메서드가 잡는듯 - https://ko.legacy.reactjs.org/docs/error-boundaries.html)
- 애러가 잡히면, child 컴포넌트를 렌더링 하는게 아니라, 
- FallbackComponent 을 렌더링하면서 잡은 애러를 prop으로 넘겨준다. 

``` js
import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function MyComponent() {
  const [count, setCount] = useState(0);

  if (count === 5) {
    // 에러를 발생시키는 예시입니다.
    throw new Error('에러가 발생했습니다.');
  }

  return (
    <div>
      <h1>카운트: {count}</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h2>에러가 발생했습니다.</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>재시작</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>앱</h1>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MyComponent />
      </ErrorBoundary>
    </div>
  );
}

export default App;
```

## 문제는 react-router-dom 을 썼을때 (https://reactrouter.com/en/main/route/error-element)
- 마찬가지로 기본적으로 React 에서 사용하는 Errorboundary와 같으나, 
- 일단 router 가 react compoenent 를 전부 감싸고 있기때문에, 
- react-router-dom 에서 사용하는 Errorboundary가 적용 되어야 하는 점인거 같다. 
- 아무튼 기본 Errorboundary 와 마찬가지로, router 가 감싸고 있는 컴포넌틀이 렌더링 될때, 애러가 있으면, Errorboundary 가 렌더링 되는 형식인거 같은데, 
- 좋은건 router-loader 에서 애러가 발생 했을때, 이게 component 를 렌더링 하고 렌더링 하면 애러가 생긴걸 보고  Errorboundary 가 렌더링 되는게 아니라, 
- router-loader 에서 애러를 던지면 그 던져진 애러를 가지고 Errorboundary 가 렌더링 된다는 점인거 같다. 
- 자, 잘 생각해 보면, router-loader 는 라우터 내에서 지정한 url 에 접근했을때, 해당 컴포넌트를 그리기 전데, 데이터를 가져 오는 역할을 한다. 

- 데이터를 가져 오는 도중 애러가 났다고 하자. 

- 이때 loader 에서 애러를 던지지 않고, catch 로 잡아서 정상적으로 아무거나 return 해버리면 사실상 loader 에서 애러가 난게 아니다. 
- 그럼 router 는 음 loader 에서 데이터 리턴 됬네? 하면서 컴포넌트를 그리려고 하나, 
- 컴포넌트가 그려질때 당연해 loader 에서 준 데이터를 사용할건데, 정상적이 데이터가 없으니 애러가 날것이고 그럼 Errorboundary 가 렌더링 된다. 

- 그럼 이번엔 catch 로 잡고 throw로 애러를 던진다고 해보자.
- 그럼 router 는 음 loader 에서 애러가 났네? 컴포넌트 그리지말고  Errorboundary 나 렌더링 하자. 하고 Errorboundary 가 렌더링 된다. 

- 대충 이런 로직이다. 

- 근데 내가 한 실수는 router-loader 에서 catch 로 애러를 잡은후에, 아무것도 리턴도 안하고, 아무것도 throw 안했더니
- `You defined a loader for route "1" but didn't return anything from your `loader` function. Please return a value or "null".` 이f런 애러가 발생 했던것이다. 

- 아, router에서 Errorboundary 에서 전달된 error 확인 하려면 useRouteError 가 필요하다


```js
// itemList 라우터 로더
const itemList = async ({request}: LoaderFunctionArgs) => {
  const {warehouseType, itemIds, itemType, deleteDate, itemName} = getParamsFromUrl(request.url);
  try{
    return await callGetItemItemList({warehouseType: Number(warehouseType) as WarehouseType, itemIds, itemType, deleteDate, itemName});

  }catch(err){
    // throw err;
    // return err;
  }
};
```
```js
// router.ts
export const router = createBrowserRouter([
  {
    path: PATH_ITEM_LIST,
    errorElement: <ErrorFallback />,
    element: <ItemList />,
    loader: routerLoader.itemList,
  },
]);
```
```js

export function ErrorFallback() {
  // 에러 처리 로직 및 대체 컨텐츠를 구현합니다.
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h2>에러가 발생했습니다.</h2>
      {/* <p>{error}</p> */}
      {/* <button onClick={resetErrorBoundary}>다시 시도</button> */}
    </div>
  );
}


```