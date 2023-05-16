import { useEffect, useState } from 'react';
import Entries from './Entries';
import Overview from './Overview';
import { getLocalDBInstance } from '../Database';

const db = getLocalDBInstance();

const Reports = (props) => {
  const [data, setData] = useState({ ledger: [] });

  useEffect(() => {
    setData(db.getData());
  }, []);

  return (
    <div className="home">
      <Overview data={data} />
      <Entries edit={props.edit} ledger={data.ledger} />
    </div>
  );
};

export default Reports;
