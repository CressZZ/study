import {useEffect, useRef, useState, useSyncExternalStore, useTransition,startTransition} from 'react';
import widthStore from './customStore'
export default function TestComponent(){
  console.log('__TestComponent__')
  const [name, setName] = useState('');
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(()=>{

    // window.addEventListener('resize', e=>startTransition(()=>setWidth(window.innerWidth)))
  }, [])

  return (
    <div>
      <CustomButton />
      <CustomInput/ >
    </div>
  )
}

let count = 0;

setInterval(() => {
  count++;
}, 1);

const CustomInput = () => {
  console.log('CustomInput')

  const [name, setName] = useState('');
  return (
    <div>
      <input value={name} onChange={(e) => startTransition(()=>setName(e.target.value))} />
      {Array(100).fill(true).map((e, idx)=>(<WindowSizeDisplay key={idx}/>))}
    </div>
  )
}

const CustomButton = () => {

  const [count, setCount] = useState(widthStore.getState().count)
  // const [flag, setFlage] = useState(100)
  const updateCount = () =>{
    widthStore.setState({count: widthStore.getState().count + 1});
    setCount(widthStore.getState().count)
  }

  // return <button onClick={()=>updateCount()}>click! {widthStore.getState().count} {flag}</button>
  // return <button onClick={()=>updateCount()}>click! {widthStore.getState().count} </button>
  return <button onClick={()=>updateCount()}>click! {count} </button>

}
const WindowSizeDisplay = () => {
  console.log('WindowSizeDisplay')
  // const [width, setWidth] = useState(widthStore.getState().innerWidth);

  // useEffect(() => {
  //   const unsubscribe = widthStore.subscribe(() => {
  //     // startTransition(()=>setWidth(widthStore.getState().innerWidth));
  //     (setWidth(widthStore.getState().innerWidth));
  //   });
  //   return unsubscribe;
  // }, []);
  const now = performance.now();
  while (performance.now() - now < 10) {
  }
  const a = widthStore.getState().count
  return (
    <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-2xl shadow-lg text-lg">
      <p>

        {/* Width: <span className="font-bold">{widthStore.getState().innerWidth}px</span> */}
        {/* Width: <span className="font-bold">{width}px</span> */}
        {/* Width: <span className="font-bold">{window.innerWidth}px</span> */}
        Width: <span className="font-bold">{a}</span>
      </p>
      <p>
        {/* Height: <span className="font-bold">{windowSize.height}px</span> */}
      </p>
    </div>
  );
};
