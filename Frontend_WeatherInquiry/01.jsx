import { useState } from "react";  
  
  //Adding max and min limit
  function App(){

    const [count, setCount] = useState(0);

    return(
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>{count}</h1>
        <div style={{ display: "flex", gap: "10px", }}>
          
          //Max this metho give the limit
          <button onClick={() => setCount(Math.min(count + 3, 10))} >
            +3
          </button>
          <button onClick={() => setCount(Math.min(count + 1, 10))} >
            +1
          </button>
          <button onClick={() => setCount(Math.max(count - 1, -10))} >
            -1
          </button>
          <button onClick={() => setCount(Math.max(count - 3, -10))} >
            -3
          </button>
        </div>
        <button
        onClick={()=>setCount(0)}
        style={{ marginTop: "10px" }}
        >
          reset
        </button>
      </div>
    );
  }
  export default App;
