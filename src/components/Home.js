import { useEffect, useState } from 'react';
import AddEntry from './AddEntry';
import Entries from './Entries';
import Overview from './Overview';
import { getLocalDBInstance } from '../Database';

const db = getLocalDBInstance();

const Home = (props) => {
  const [r, setR] = useState(Math.random());
  const [data, setData] = useState({ ledger: [] });

  const onAddEntry = () => {
    setR(Math.random());
  };

  useEffect(() => {
    setData(db.getData());
  }, []);

  return (
    <div className="home" key={r}>
      <AddEntry onNewEntry={onAddEntry} />
      <Overview data={data} />
      <Entries edit={props.edit} ledger={data.ledger} />
    </div>
  );
};

export default Home;
