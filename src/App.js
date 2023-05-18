import { useEffect, useState } from 'react';
import { PAGES } from './configs';
import { getLocalDBInstance } from './Database';

import Header from './components/Header';
import Home from './components/Home';
import Config from './components/Config';
import Password from './components/Password';
import EditEntry from './components/EditEntry';
import Reports from './components/Reports';

import './styles/app.css';

const db = getLocalDBInstance();

const App = () => {
  const [data, setData] = useState({ ledger: [] });
  const [pass, setPass] = useState(db.getPassword());
  const [page, setPage] = useState(PAGES.HOME);
  const [editIndex, setEditIndex] = useState(0);

  const initApp = async (password, beginningBalance = 0) => {
    try {
      db.updateBeginningBalance(beginningBalance);
      await db.setPassword(password);

      setPass(password);
      setPage(PAGES.HOME);
      load();
    } catch (error) {
      console.error(error);
      alert(
        'Something went wrong, please refresh the page or contact the developer'
      );
    }
  };

  const load = () => {
    setData(db.getData());
  };

  const onConfigUpdate = (reset = false) => {
    if (reset) {
      setPass(null);
    } else {
      load();
    }
  };

  const onEdit = (index) => {
    setPage(PAGES.EDIT);
    setEditIndex(index);
  };

  const onEditDone = () => {
    setEditIndex(0);
    setPage(PAGES.HOME);
    load();
  };

  const onAddEntry = () => {
    load();
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!pass) {
      setPage(PAGES.PASSWORD);
    }
  }, [pass]);

  return (
    <div className="app">
      <Header pageconf={{ page, setPage }} />
      {page === PAGES.HOME && (
        <Home data={data} onAddEntry={onAddEntry} edit={onEdit} />
      )}
      {page === PAGES.CONFIG && <Config onConfigUpdate={onConfigUpdate} />}
      {page === PAGES.PASSWORD && <Password initApp={initApp} />}
      {page === PAGES.EDIT && (
        <EditEntry tags={data.tags} index={editIndex} done={onEditDone} />
      )}
      {page === PAGES.REPORTS && <Reports data={data} />}
      <footer>
        <p>
          Made with <span>&hearts;</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
