import { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import './styles/app.css';
import { PAGES } from './configs';
import Config from './components/Config';

const App = () => {
  const [page, setPage] = useState(PAGES.HOME);

  return (
    <div className="app">
      <Header pageconf={{ page, setPage }} />
      {page === PAGES.HOME && <Home />}
      {page === PAGES.CONFIG && <Config />}
      <footer>
        <p>
          Made with <span>&hearts;</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
