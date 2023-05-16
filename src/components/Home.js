import { useState } from 'react';
import AddEntry from './AddEntry';
import Entries from './Entries';
import Overview from './Overview';

const Home = (props) => {
  const [r, setR] = useState(Math.random());

  const onAddEntry = () => {
    setR(Math.random());
  };

  return (
    <div className="home" key={r}>
      <AddEntry onNewEntry={onAddEntry} />
      <Overview />
      <Entries edit={props.edit} />
    </div>
  );
};

export default Home;
