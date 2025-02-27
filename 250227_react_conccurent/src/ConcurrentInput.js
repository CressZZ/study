

import {useEffect, useRef, useState, useSyncExternalStore, useTransition} from 'react';

export default function ConcurrentInput() {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState('');
  
  // 입력 이벤트는 높은 우선순위로 처리됨
  const handleInput = (e) => {
    setText(e.target.value);
  };
  
  // 클릭 이벤트는 낮은 우선순위로 처리됨
  const handleSubmit = () => {
    // 무거운 작업 시뮬레이션
    const start = Date.now();
    while (Date.now() - start < 1000) {
      // 블로킹 연산
    }
    setSubmitted(text);
  };

  return (
    <div>
      <input 
        value={text} 
        onChange={handleInput} 
        placeholder="계속 타이핑해보세요"
      />
      <button onClick={handleSubmit}>
        제출 (1초 소요)
      </button>
      <div>입력 중: {text}</div>
      <div>제출된 값: {submitted}</div>
    </div>
  );
}
