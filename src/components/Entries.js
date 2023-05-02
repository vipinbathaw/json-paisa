import { useState, useEffect } from 'react';
import { getLocalDBInstance } from '../Database';

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
      <div className="row">
        <table>
          <thead>
            <th>Item</th>
            <th>Value</th>
            <th>Type</th>
          </thead>
          <tbody>
            {ledger.map((row, index) => (
              <tr key={index}>
                <td>{row.item}</td>
                <td>{row.value}</td>
                <td>{row.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Entries;
