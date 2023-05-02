import { useState } from 'react';
import './styles/app.css';

function App() {
  const [item, setItem] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('credit');

  return (
    <div className="app">
      <header>
        <h1>Fin</h1>
      </header>
      <div className="container">
        <form>
          <div className="row">
            <input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              type="text"
              placeholder="Item"
            />
          </div>
          <div className="row">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Value"
            />
          </div>
          <div className="row">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
          </div>
          <div className="row">
            <button>add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
