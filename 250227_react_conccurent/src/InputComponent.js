import { useState } from "react";

export default function InputComponent() {
  const [text, setText] = useState("");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        style={{ padding: "10px", fontSize: "16px", width: "200px" }}
        placeholder="Type something..."
      />
      <p style={{ fontSize: "20px", fontWeight: "bold", marginTop: "10px" }}>
        {text}
      </p>
    </div>
  );
}