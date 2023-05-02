import './styles/app.css';
import AddEntry from './components/AddEntry';
import Entries from './components/Entries';

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Fin</h1>
      </header>
      <AddEntry />
      <Entries />
    </div>
  );
};

export default App;
