const db = window.localStorage;

const schema = {
  ledger: [],
};

const getData = () => {
  const data = db.getItem('data');

  if (!data) {
    db.setItem('data', JSON.stringify(schema));
    return schema;
  }

  return JSON.parse(data);
};

const saveData = (data) => {
  db.setItem('data', JSON.stringify(data));
};

export const getLedger = () => {
  const data = getData();
  return data && data.ledger ? data.ledger : [];
};

export const updateLedger = (ledger) => {
  let data = getData();

  data.ledger = ledger;
  saveData(data);
};

export const addToLedger = (item, value, type, date, tags) => {
  let ledger = getLedger();

  ledger.unshift({ item, value, type, date, tags });
  updateLedger(ledger);
};

let instance;

export const getLocalDBInstance = () => {
  if (!instance) {
    instance = {
      getLedger,
      addToLedger,
    };
  }
  return instance;
};
