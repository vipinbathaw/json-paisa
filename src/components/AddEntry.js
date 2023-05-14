import { useState } from 'react';
import { getLocalDBInstance } from '../Database';
import { formatDateForInput, removeItemByIndex } from '../utils';
import { TX_TYPE } from '../configs';

const db = getLocalDBInstance();

const AddEntry = (props) => {
  const [item, setItem] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState(TX_TYPE.DEBIT);
  const [date, setDate] = useState(formatDateForInput());
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  const [collapsed, setCollapsed] = useState(true);

  const handleForm = (e) => {
    e.preventDefault();

    db.addToLedger(item, value, parseInt(type), date, tags);

    if (props.onNewEntry) {
      props.onNewEntry();
    }
  };

  const removeTag = (index) => {
    setTags(removeItemByIndex(tags, index));
  };

  return (
    <div className="box">
      <div className="row row-v-center">
        <h2>Add Entry</h2>
        <div
          className="collapser right"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <span>+</span> : <span>-</span>}
        </div>
      </div>
      <form onSubmit={handleForm} className={collapsed ? 'gone' : ''}>
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
            <option value={TX_TYPE.DEBIT}>Debit</option>
            <option value={TX_TYPE.CREDIT}>Credit</option>
          </select>
        </div>
        <div className="row">
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
        </div>
        <div className="row">
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setTags([...tags, tag]);
                setTag('');
              }
            }}
            type="text"
            placeholder="Tags"
          />
        </div>
        <div className="row">
          {tags.map((tag, index) => (
            <span
              className="tag"
              key={index}
              onClick={() => {
                removeTag(index);
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="row">
          <button>add</button>
        </div>
      </form>
    </div>
  );
};

export default AddEntry;
