import { UPLOAD_MODE } from './configs';
import { generateSHA256Hash, generateSHA3Hash } from './utils';

const db = window.localStorage;

const PASS_KEY = 'chaabi';
const SCHEMA = {
  ledger: [],
};

const getData = () => {
  const data = db.getItem('data');

  if (!data) {
    db.setItem('data', JSON.stringify(SCHEMA));
    return SCHEMA;
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

export const exportData = () => {
  const data = JSON.stringify(getData());
  return new Blob([data], { type: 'application/json' });
};

export const importData = (data, mode = UPLOAD_MODE.REPLACE) => {
  if (typeof data !== 'object' || Array.isArray(data)) {
    throw Error('Invalid format, data should be an object');
  }

  if (!data.ledger || !Array.isArray(data.ledger)) {
    throw Error('Invalid format, ledger missing or not array');
  }

  for (let i = 0; i < data.ledger; i++) {
    const o = data.ledger[i];

    if (
      !o.item ||
      !o.value ||
      !o.type ||
      typeof o.item !== 'string' ||
      typeof o.value !== 'number' ||
      typeof o.type !== 'number' ||
      (o.tags && !Array.isArray(o.tags))
    ) {
      throw Error(`Invalid ledger entry at ${i}`);
    }

    if (o.tags) {
      for (let j = 0; j < o.tags.length; j++) {
        if (typeof o.tags[j] !== 'string') {
          throw Error(`Invalid ledger entry at ${i}`);
        }
      }
    }
  }

  if (mode === UPLOAD_MODE.REPLACE) {
    saveData(data);
  } else if (mode === UPLOAD_MODE.UPDATE) {
    updateLedger([...data.ledger, ...getLedger()]);
  }
};

export const getPassword = () => {
  return db.getItem(PASS_KEY);
};

export const setPassword = async (password) => {
  const hash = await generateSHA256Hash(password);
  db.setItem(PASS_KEY, hash);

  return hash;
};

let instance;

export const getLocalDBInstance = () => {
  if (!instance) {
    instance = {
      getLedger,
      addToLedger,
      exportData,
      importData,
      getPassword,
      setPassword,
    };
  }
  return instance;
};
