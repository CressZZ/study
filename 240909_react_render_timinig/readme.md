부모 컴포넌트가 렌더링될 때 자식 컴포넌트들도 함께 렌더링되기 때문에, 부모의 첫 렌더링이 끝나려면 자식의 렌더링이 먼저 완료돼야 해.
따라서 부모 컴포넌트의 마운트(첫 렌더링 완료) 시점은 자식 컴포넌트의 마운트 시점보다 늦어.
예외적인 경우:

조건부 렌더링: 자식 컴포넌트가 특정 조건에 따라 렌더링될 때, 부모의 마운트 시점에서는 자식이 아직 렌더링되지 않을 수 있어.

비동기 렌더링: 자식 컴포넌트가 비동기 작업(예: 데이터 페칭, 타이머 등)에 의존해 렌더링될 때, 자식의 렌더링이 지연될 수 있어. 이 경우 부모의 마운트 시점에서 자식 컴포넌트가 완전히 렌더되지 않은 상태일 수 있어.

결론적으로, 특별한 조건 없이 단순한 부모-자식 구조에서는 자식이 먼저 렌더링 완료된 후에 부모의 마운트가 완료돼. 그래서 부모의 useEffect가 실행될 때, 자식의 DOM 요소가 존재하는 게 일반적인 상황이야. 하지만 조건부 렌더링이나 비동기 작업이 있으면 타이밍이 어긋날 수 있으니 주의가 필요해.