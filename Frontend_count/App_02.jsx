import { useState } from "react";  
  
  //Adding 3 and -3 button for convenience
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
          <button onClick={()=>setCount(count+3)} >
            +3
          </button>
          <button onClick={()=>setCount(count+1)} >
            +1
          </button>
          <button onClick={()=>setCount(count-1)} >
            -1
          </button>
          <button onClick={()=>setCount(count-3)} >
            +1
          </button>
        </div>
        <button
        onClick={()=>setCount(0)}
        //Adding spacing for beautiful
        style={{ marginTop: "10px" }}
        >
          reset
        </button>
      </div>
    );
  }
  export default App;
