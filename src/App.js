import { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import './styles/app.css';
import { PAGES } from './configs';
import Config from './components/Config';
import { getLocalDBInstance } from './Database';
import Password from './components/Password';
import EditEntry from './components/EditEntry';

const db = getLocalDBInstance();

const App = () => {
  const [pass, setPass] = useState(db.getPassword());
  const [page, setPage] = useState(PAGES.HOME);
  const [editIndex, setEditIndex] = useState(0);

  const initApp = async (password, beginningBalance = 0) => {
    try {
      db.updateBeginningBalance(beginningBalance);
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

  const onReset = () => {
    setPass(null);
  };

  const onEdit = (index) => {
    setPage(PAGES.EDIT);
    setEditIndex(index);
  };

  const onEditDone = () => {
    setEditIndex(0);
    setPage(PAGES.HOME);
  };

  useEffect(() => {
    if (!pass) {
      setPage(PAGES.PASSWORD);
    }
  }, [pass]);

  return (
    <div className="app">
      <Header pageconf={{ page, setPage }} />
      {page === PAGES.HOME && <Home edit={onEdit} />}
      {page === PAGES.CONFIG && <Config reset={onReset} />}
      {page === PAGES.PASSWORD && <Password initApp={initApp} />}
      {page === PAGES.EDIT && <EditEntry index={editIndex} done={onEditDone} />}
      <footer>
        <p>
          Made with <span>&hearts;</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
