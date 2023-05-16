import { useState } from 'react';
import { formatDate } from '../utils';
import { TX_TYPE_REVERSE } from '../configs';
import { ReactComponent as EditIcon } from '../images/edit.svg';

const Entries = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [tags, setTags] = useState([]);

  const tagSelect = (tag) => {
    let newTags = [];
    let index = -1;

    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === tag) {
        index = i;
        continue;
      }
      newTags.push(tags[i]);
    }

    if (index === -1) {
      newTags.push(tag);
    }

    setTags(newTags);
  };

  let ledger = [];
  for (let i = 0; i < props.ledger.length; i++) {
    let entry = props.ledger[i];

    if (!tags.length) {
      ledger.push(entry);
      continue;
    }

    if (tags.every((tag) => entry.tags.includes(tag))) {
      ledger.push(entry);
    }
  }

  return (
    <div className="box">
      <div className="row row-v-center">
        <h2>Entries</h2>
        <div
          className="collapser right"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <span>+</span> : <span>-</span>}
        </div>
      </div>
      {tags.length > 0 && (
        <div className="row">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="tag"
              onClick={() => {
                tagSelect(tag);
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className={collapsed ? 'gone' : 'row row-col'}>
        {ledger.map((row, index) => (
          <div key={index} className={`entry-row ${TX_TYPE_REVERSE[row.type]}`}>
            <div className="row data">
              <div>{row.item}</div>
              <div className="right" style={{ textAlign: 'right' }}>
                &#x20B9; {row.value}
              </div>
            </div>
            {row.tags && row.tags.length && (
              <div className="row tags">
                {row.tags.map((tag, index) => (
                  <span
                    className="tag"
                    key={index}
                    onClick={() => {
                      tagSelect(tag);
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="row date">
              <span>{formatDate(row.date)}</span>
              <span className="right">
                <EditIcon onClick={() => props.edit(index)} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entries;
