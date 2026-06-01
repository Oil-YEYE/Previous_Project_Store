import { useState } from "react";
function App() {

  const [value, setValue] = useState('');

  const [list,setList] = useState([])

  function Add(){
    if(value.trim() === ''){
      return;
    }
    setList([...list, {id:Date.now(),name:value} ]);
    setValue('');
  }

  function Delete(id){
    setList(list.filter(list => list.id !== id));
  }

  function CleaningUp(){
    setList([]);
  }

  return(
    <div>
      <h1>LIST</h1>

      <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Please type here"
      />
      <button onClick={Add} >Add</button>
      <button onClick={CleaningUp} >Cleaning up</button>
      <ul>
        {list.map(lists=>
          <li key={lists.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            listStylePosition: 'inside',
          }}>
            <span style={{ marginRight: '20px' }}>●</span>
            {lists.name}
            <button 
            onClick={() => Delete(lists.id)}
            style={{ marginLeft: 'auto' }}
            >
              Delete
            </button>
          </li>
        )}
      </ul>
    </div>

  );
}

export default App;
