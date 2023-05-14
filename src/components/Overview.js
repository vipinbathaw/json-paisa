import { useEffect, useState } from 'react';
import { getLocalDBInstance } from '../Database';
import { TX_TYPE } from '../configs';
import { formatCurrency } from '../utils';

const db = getLocalDBInstance();

const Overview = () => {
  const [ledger, setLedger] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [outstandingBalance, setOutstandingBalance] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const calculate = () => {
    let credit = 0;
    let debit = 0;

    for (let i = 0; i < ledger.length; i++) {
      let entry = ledger[i];
      if (entry.type === TX_TYPE.CREDIT) {
        credit += parseFloat(entry.value);
      } else if (entry.type === TX_TYPE.DEBIT) {
        debit += parseFloat(entry.value);
      }
    }

    setTotalCredit(credit);
    setTotalDebit(debit);
    setOutstandingBalance(credit - debit);
  };

  useEffect(() => {
    setLedger(db.getLedger());
  }, []);

  useEffect(() => {
    calculate();
  }, [ledger]);

  return (
    <div className="box">
      <div className="overview">
        <div className="row row-v-center">
          <h2>Overview</h2>
          <div
            className="collapser right"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <span>+</span> : <span>-</span>}
          </div>
        </div>
        <div className={collapsed ? 'gone' : 'content'}>
          <div className="row">
            <div className="col">
              <div className="row row-h-center label">Outstanding Balance</div>
              <div className="row row-h-center value">
                {formatCurrency(outstandingBalance)}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="row row-h-center label">Total Credit</div>
              <div className="row row-h-center value">
                {formatCurrency(totalCredit)}
              </div>
            </div>
            <div className="col">
              <div className="row row-h-center label">Total Debit</div>
              <div className="row row-h-center value">
                {formatCurrency(totalDebit)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
