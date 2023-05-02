import { useState } from 'react';
import { getLocalDBInstance } from '../Database';

const db = getLocalDBInstance();

const AddEntry = () => {
  const [item, setItem] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('debit');

  const handleForm = (e) => {
    e.preventDefault();

    db.addToLedger(item, value, type);
    db.getLedger();

    alert('item added');
  };

  return (
    <div className="box">
      <div className="row">
        <h2>Add Entry</h2>
      </div>
      <form onSubmit={handleForm}>
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
  );
};

export default AddEntry;
