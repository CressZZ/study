export const ExpensiveComponent = () => {
  // console.log(count)
  console.log('ExpensiveComponent');
  // const counts = count;
  // const [countState, setCountState] = useState(count);
  // const countRef = useRef(count);
  // useEffect(()=>{
  //   // setCountState(count)
  //   countRef.current = count
    
  // })
  // const consistentCount = useSyncExternalStore(
  //   ()=>{}, 
  //   ()=>count
  // );
  
  const now = performance.now();
  while (performance.now() - now < 100) {
    // console.log('2')
    // Artificial delay -- do nothing for 16ms
  }
  return <>비용이 비싼 카운트 : {window.count} </>
}