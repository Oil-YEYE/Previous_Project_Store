import { useState } from "react";  
  
  
  function App(){

    const [count, setCount] = useState(0);

    return(
    //
      <div
        style={{
          display: "flex",
          //Center.
          alignItems: "center",
          //Sorting each division below.
          flexDirection: "column",
        }}
      >
        <h1>{count}</h1>
        <div style={{ display: "flex", gap: "10px", }}>
          <button onClick={()=>setCount(count+1)} >
            +1
          </button>
          <button onClick={()=>setCount(count-1)} >
            -1
          </button>
          <button onClick={()=>setCount(0)} >
            reset
          </button>
        </div>
      </div>
    );
  }
  export default App;
