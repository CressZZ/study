import { useState, useTransition } from "react";

export default function StartTransitionExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const fetchData = async () => {
    setLoading(true); // 동기적으로 로딩 상태 변경
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const result = await response.json();
    
    startTransition(() => {
      setData(result.title);
      setLoading(false); // startTransition 내부에서 로딩 해제
    });
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading || isPending}>
        데이터 가져오기
      </button>

      {loading && <p>로딩 중...</p>}
      {isPending && <p>데이터 처리 중...</p>}
      {data && <p>결과: {data}</p>}
    </div>
  );
}
