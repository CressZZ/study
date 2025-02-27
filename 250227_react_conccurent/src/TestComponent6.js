import {useState, useSyncExternalStore, useTransition} from 'react';

let count = 0;

setInterval(() => {
  count++;
}, 1);

export default function TestComponent(){
  const [name, setName] = useState('');
  const [isPending, startTransition] = useTransition();
  const updateName = (newVal) => {
    startTransition(() => { 
      setName(newVal);
    });   
  }

  return (
    <div>
      <input value={name} onChange={(e) => updateName(e.target.value)} />
      {isPending && <div>Loading...</div>}
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
  const counts = count;
  const now = performance.now();
  while (performance.now() - now < 100) {
    // Artificial delay -- do nothing for 16ms
  }
  return <>비용이 비싼 카운트 : {counts} </>
}