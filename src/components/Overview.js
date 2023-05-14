import { useEffect, useState } from 'react';
import { getLocalDBInstance } from '../Database';
import { formatCurrency } from '../utils';

const db = getLocalDBInstance();

const Overview = () => {
  const [data, setData] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  const showVal = (val) => {
    if (val) {
      return formatCurrency(val);
    }

    return formatCurrency(0);
  };

  useEffect(() => {
    setData(db.getData());
  }, []);

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
                {showVal(data.outstandingBalance)}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="row row-h-center label">Total Credit</div>
              <div className="row row-h-center value">
                {showVal(data.totalCredit)}
              </div>
            </div>
            <div className="col">
              <div className="row row-h-center label">Total Debit</div>
              <div className="row row-h-center value">
                {showVal(data.totalDebit)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
