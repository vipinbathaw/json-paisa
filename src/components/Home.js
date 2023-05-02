import { useState } from 'react';
import AddEntry from './AddEntry';
import Entries from './Entries';

const Home = () => {
  const [r, setR] = useState(Math.random());

  const onAddEntry = () => {
    setR(Math.random());
  };

  return (
    <div className="home" key={r}>
      <AddEntry onNewEntry={onAddEntry} />
      <Entries />
    </div>
  );
};

export default Home;
