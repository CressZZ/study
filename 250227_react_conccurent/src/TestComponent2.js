import {useEffect, useRef, useState, useSyncExternalStore, useTransition,startTransition} from 'react';

let count = 0;

setInterval(() => {
  count++;
}, 1);

function CumstomInput({update}){
  const [name, setName] = useState('');
  console.log('__CumstomInput__')

  const updateName = (newVal) =>{
    setName(newVal)
    update(newVal)
  }

  return(
    <>
    <input value={name} onChange={(e) => updateName(e.target.value)} />
    <br />
    Name: {name}
    </>
    
  )
}
export default function TestComponent(){
  const [name2, setName2] = useState('');
  // const [isPending, startTransition] = useTransition();
  console.log('__TestComponent__')
  return (
    <div>
      <CumstomInput update={(val)=>startTransition(()=>setName2(val))} />
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

  const now = performance.now();
  while (performance.now() - now < 100) {
    // Artificial delay -- do nothing for 100ms
  }
  return <>비용이 비싼 카운트 : {count} </>
}