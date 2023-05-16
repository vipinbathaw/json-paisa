import { useEffect, useState } from 'react';
import { getLocalDBInstance } from '../Database';
import { formatDateForInput, removeItemByIndex } from '../utils';
import { TX_TYPE } from '../configs';

const db = getLocalDBInstance();

const EditEntry = (props) => {
  const [item, setItem] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState(TX_TYPE.DEBIT);
  const [date, setDate] = useState(formatDateForInput());
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');

  const handleForm = (e) => {
    e.preventDefault();

    db.editLedger(
      { item, value, date, tags, type: parseInt(type) },
      props.index
    );

    if (props.done) {
      props.done();
    }
  };

  const removeTag = (index) => {
    setTags(removeItemByIndex(tags, index));
  };

  useEffect(() => {
    const ledger = db.getData().ledger;
    const entry = ledger[props.index];

    setItem(entry.item);
    setValue(entry.value);
    setType(entry.type);
    setDate(entry.date);
    setTags(entry.tags);
  }, [props.index]);

  return (
    <div className="box">
      <div className="row row-v-center">
        <h2>Edit Entry</h2>
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
          <button>edit</button>
        </div>
      </form>
    </div>
  );
};

export default EditEntry;
