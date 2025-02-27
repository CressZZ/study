import {useEffect, useRef, useState, useSyncExternalStore ,startTransition} from 'react';

export default function TestComponent(){
  console.log('__TestComponent__')
  return (
    <div>
      <CumstomInput />
      {/* {Array(10).fill(true).map((e, idx)=>(<WindowSizeDisplay key={idx}/>))} */}
      <WindowSizeDisplay />
      <WindowSizeDisplay />
      <WindowSizeDisplay />
      <WindowSizeDisplay />
      <WindowSizeDisplay />
      {/* <WindowSizeDisplay />
      <WindowSizeDisplay />
      <WindowSizeDisplay />
      <WindowSizeDisplay />
      <WindowSizeDisplay /> */}
    </div>
  )
}

function CumstomInput(){
  const [name, setName] = useState('');
  console.log('__CumstomInput__')

  const updateName = (newVal) =>{
    setName(newVal)
  }

  return(
    <>
    <input value={name} onChange={(e) => updateName(e.target.value)} />
    <br />
    Name: {name}
    </>
    
  )
}
const WindowSizeDisplay = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth });
  console.log('WindowSizeDisplay')
  const now = performance.now();
  // while (performance.now() - now < 1000) {
  //   // Artificial delay -- do nothing for 100ms
  // }
  useEffect(() => {
    const handleResize = () => {
      // console.log('handleResize')

      /// 비동기
      startTransition(()=>setWindowSize({ width: window.innerWidth, }));

      // 동기
      // setWindowSize({  width: window.innerWidth, })

      console.log(window.innerWidth)
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-2xl shadow-lg text-lg">
      <p>
        {/* Width: <span className="font-bold">{windowSize.width}px</span> */}
        <br />
        <ExpensiveComponent />
        <ExpensiveComponent />
        <ExpensiveComponent />
        <ExpensiveComponent />
        <ExpensiveComponent />
        <ExpensiveComponent />
        <ExpensiveComponent />
        <ExpensiveComponent />
        <ExpensiveComponent />
        <ExpensiveComponent />

      </p>
    </div>
  );
};

const ExpensiveComponent = () => {
  console.log('ExpensiveComponent');

  const now = performance.now();
  while (performance.now() - now < 50) {
    // Artificial delay -- do nothing for 100ms
  }
  return <>비용이 비싼 카운트 :  </>
}