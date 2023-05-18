import AddEntry from './AddEntry';
import Entries from './Entries';
import Overview from './Overview';

const Home = (props) => {
  return (
    <div className="home">
      <AddEntry onNewEntry={props.onAddEntry} tags={props.data.tags} />
      <Overview data={props.data} />
      <Entries edit={props.edit} ledger={props.data.ledger} />
    </div>
  );
};

export default Home;
