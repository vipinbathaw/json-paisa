import { useState, useEffect } from 'react';
import { getLocalDBInstance } from '../Database';
import { formatDate } from '../utils';
import { TX_TYPE_REVERSE } from '../configs';

const db = getLocalDBInstance();

const Entries = () => {
  const [ledger, setLedger] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setLedger(db.getLedger());
  }, []);

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
