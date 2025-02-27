import {useState,startTransition, useTransition} from 'react';

let count = 0;

setInterval(() => {
  count++;
}, 1);

export default function TestComponent(){
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  // const [isPending, startTransition] = useTransition();

  console.log('__TestComponent__');

  const updateName = (newVal) => {
    // 동시성
    startTransition(() => { 
      setName(newVal);
    });   

    // 동기
    // setName(newVal);
  }

  const updateCount = ()=>{
    // 동기
    setCount(prev=>prev+1)
  }

  return (
    <div>
      <input value={name} onChange={(e) => updateName(e.target.value)} />
      {name}
      <button onClick={(e) => updateCount()}>click</button>
      {count}
      {/* {isPending && <div>Loading...</div>} */}
      <ul>
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
      </ul>
    </div>
  )
}


const ExpensiveComponent = () => {
  console.log('ExpensiveComponent', count);

  const counts = count;
  const now = performance.now();
  while (performance.now() - now < 100) {
    // Artificial delay -- do nothing for 100ms
  }
  return <>비용이 비싼 카운트 : {counts} </>
}