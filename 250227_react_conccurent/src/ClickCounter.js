import { useState } from "react";
import { ExpensiveComponent } from './ExpensiveComponent';

export default function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)} 
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Click me
      </button>

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
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
        <li><ExpensiveComponent /></li>
      </ul>


    </div>
  );
}
