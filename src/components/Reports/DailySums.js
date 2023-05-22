import { useState } from 'react';
import { TX_TYPE } from '../../configs';

const DailySums = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  let sums = [];
  let dates = {};

  for (let j = 0; j < props.data.ledger.length; j++) {
    let i = null;
    let entry = props.data.ledger[j];

    if (entry.date in dates) {
      i = dates[entry.date];
    } else {
      sums.push({ date: entry.date, credit: 0, debit: 0, count: 0 });
      i = sums.length - 1;
      dates[entry.date] = i;
    }

    if (entry.type === TX_TYPE.CREDIT) {
      sums[i].credit += entry.value;
    }
    if (entry.type === TX_TYPE.DEBIT) {
      sums[i].debit += entry.value;
    }

    sums[i].count += 1;
  }

  console.log({ sums });

  return (
    <div className="box">
      <div className="row row-v-center">
        <h2>Daily Sums</h2>
        <div
          className="collapser right"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <span>+</span> : <span>-</span>}
        </div>
      </div>
      <div className={collapsed ? 'gone' : 'content-table'}>
        <table>
          <thead>
            <tr>
              <th>
                <h5>Date</h5>
              </th>
              <th>
                <h5>Count</h5>
              </th>
              <th>
                <h5>Credit</h5>
              </th>
              <th>
                <h5>Debit</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {sums.map((entry, i) => (
              <tr key={i}>
                <td>
                  <span>{entry.date}</span>
                </td>
                <td>
                  <span>{entry.count}</span>
                </td>
                <td>
                  <span className="credit">{entry.credit}</span>
                </td>
                <td>
                  <span className="debit">{entry.debit}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailySums;
