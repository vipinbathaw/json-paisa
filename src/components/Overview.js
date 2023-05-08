import { useEffect, useState } from 'react';
import { getLocalDBInstance } from '../Database';
import { TX_TYPE } from '../configs';

const db = getLocalDBInstance();

const Overview = () => {
  const [ledger, setLedger] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

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
        <div className="row">
          <h2>Overview</h2>
        </div>
        <div className="row">
          <div className="col">
            <div className="row row-h-center">Total Credit</div>
            <div className="row row-h-center">{totalCredit}</div>
          </div>
          <div className="col">
            <div className="row row-h-center">Total Debit</div>
            <div className="row row-h-center">{totalDebit}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
