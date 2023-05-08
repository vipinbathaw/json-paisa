import { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import './styles/app.css';
import { PAGES } from './configs';
import Config from './components/Config';
import { getLocalDBInstance } from './Database';
import Password from './components/Password';

const db = getLocalDBInstance();

const App = () => {
  const [pass, setPass] = useState(db.getPassword());
  const [page, setPage] = useState(PAGES.HOME);

  const setPassword = async (password) => {
    try {
      await db.setPassword(password);
      setPass(password);
      setPage(PAGES.HOME);
    } catch (error) {
      console.error(error);
      alert(
        'Something went wrong, please refresh the page or contact the developer'
      );
    }
  };

  useEffect(() => {
    if (!pass) {
      setPage(PAGES.PASSWORD);
    }
  }, []);

  return (
    <div className="app">
      <Header pageconf={{ page, setPage }} />
      {page === PAGES.HOME && <Home />}
      {page === PAGES.CONFIG && <Config />}
      {page === PAGES.PASSWORD && <Password setPassword={setPassword} />}
      <footer>
        <p>
          Made with <span>&hearts;</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
