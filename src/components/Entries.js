import { useState, useEffect } from 'react';
import { getLocalDBInstance } from '../Database';
import { formatDate } from '../utils';

const db = getLocalDBInstance();

const Entries = () => {
  const [ledger, setLedger] = useState([]);

  useEffect(() => {
    setLedger(db.getLedger());
  }, []);

  return (
    <div className="box">
      <div className="row">
        <h2>Entries</h2>
      </div>
      <div className="row row-col">
        {ledger.map((row, index) => (
          <div key={index} className={`entry-row ${row.type}`}>
            <div className="row data">
              <div>{row.item}</div>
              <div className="right" style={{ textAlign: 'right' }}>
                &#x20B9; {row.value}
              </div>
            </div>
            {row.tags && row.tags.length && (
              <div className="row tags">
                {row.tags.map((tag, index) => (
                  <span className="tag" key={index}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="row date">{formatDate(row.date)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entries;
