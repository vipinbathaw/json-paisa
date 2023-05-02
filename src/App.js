import Home from './components/Home';
import './styles/app.css';

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Fin</h1>
      </header>
      <Home />
      <footer>
        <p>
          Made with <span>&hearts;</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
