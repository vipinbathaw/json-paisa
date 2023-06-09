import { TX_TYPE, UPLOAD_MODE } from './configs';
import { decryptData, encryptData, generateSHA256Hash } from './utils';

const db = window.localStorage;

const PASS_KEY = 'chaabi';
const SCHEMA = {
  ledger: [],
  tags: [],
  beginningBalance: 0,
  totalCredit: 0,
  totalDebit: 0,
  outstandingBalance: 0,
};

const saveData = (data) => {
  db.setItem('data', JSON.stringify(data));
};

const getLedger = () => {
  const data = getData();
  return data.ledger;
};

const getData = () => {
  let data = db.getItem('data');

  if (!data) {
    db.setItem('data', JSON.stringify(SCHEMA));
    return SCHEMA;
  } else {
    data = JSON.parse(data);
  }

  if (!data.tags) {
    data.tags = [];
    db.setItem('data', JSON.stringify(data));
  }

  return data;
};

const updateLedger = (ledger) => {
  let data = getData();
  let credit = 0;
  let debit = 0;
  let tags = [];

  for (let i = 0; i < ledger.length; i++) {
    let entry = ledger[i];
    if (entry.type === TX_TYPE.CREDIT) {
      credit += parseFloat(entry.value);
    } else if (entry.type === TX_TYPE.DEBIT) {
      debit += parseFloat(entry.value);
    }
    tags.push(...entry.tags);
  }

  data.ledger = ledger;
  data.totalCredit = credit;
  data.totalDebit = debit;
  data.outstandingBalance = data.beginningBalance + (credit - debit);
  data.tags = [...new Set(tags)];

  saveData(data);
};

const addToLedger = (item, value, type, date, tags) => {
  let ledger = getLedger();

  ledger.unshift({ item, value, type, date, tags });
  updateLedger(ledger);
};

const editLedger = (data, index) => {
  let ledger = getLedger();
  ledger[index] = data;

  updateLedger(ledger);
};

const exportData = async () => {
  const key = getPassword();
  const data = JSON.stringify(getData());

  const encryptedData = await encryptData(data, key);
  return new Blob([JSON.stringify(encryptedData)], {
    type: 'application/json',
  });
};

const importData = async (importedData, mode = UPLOAD_MODE.REPLACE) => {
  if (
    typeof importedData !== 'object' ||
    !importedData.encryptedText ||
    !importedData.ivText
  ) {
    throw Error('Invalid format, not the encrypted data');
  }

  const key = getPassword();
  const decryptedText = await decryptData(
    importedData.encryptedText,
    importedData.ivText,
    key
  );
  const data = JSON.parse(decryptedText);

  if (typeof data !== 'object' || Array.isArray(data)) {
    throw Error('Invalid format, data should be an object');
  }

  if (!data.ledger || !Array.isArray(data.ledger)) {
    throw Error('Invalid format, ledger missing or not array');
  }

  for (let i = 0; i < data.ledger.length; i++) {
    if (typeof data.ledger[i].value !== 'number') {
      let v = parseFloat(data.ledger[i].value);
      if (v) {
        data.ledger[i].value = v;
      }
    }

    if (
      !data.ledger[i].item ||
      !data.ledger[i].value ||
      !data.ledger[i].type ||
      typeof data.ledger[i].item !== 'string' ||
      typeof data.ledger[i].value !== 'number' ||
      typeof data.ledger[i].type !== 'number' ||
      (data.ledger[i].tags && !Array.isArray(data.ledger[i].tags))
    ) {
      throw Error(`Invalid ledger entry at ${i}`);
    }

    if (data.ledger[i].tags) {
      for (let j = 0; j < data.ledger[i].tags.length; j++) {
        if (typeof data.ledger[i].tags[j] !== 'string') {
          throw Error(`Invalid ledger entry at ${i}`);
        }
      }
    }
  }

  if (mode === UPLOAD_MODE.REPLACE) {
    saveData(data);
  } else if (mode === UPLOAD_MODE.APPEND) {
    updateLedger([...data.ledger, ...getLedger()]);
  }
};

const getPassword = () => {
  return db.getItem(PASS_KEY);
};

const setPassword = async (password) => {
  const hash = await generateSHA256Hash(password);
  db.setItem(PASS_KEY, hash);

  return hash;
};

const updateBeginningBalance = (balance) => {
  const data = getData();

  data.beginningBalance = parseFloat(balance);
  data.outstandingBalance =
    data.beginningBalance + (data.totalCredit - data.totalDebit);

  saveData(data);
};

const reset = () => {
  db.setItem('data', JSON.stringify(SCHEMA));
  db.removeItem(PASS_KEY);
};

let instance;

export const getLocalDBInstance = () => {
  if (!instance) {
    instance = {
      getData,
      addToLedger,
      editLedger,
      exportData,
      importData,
      getPassword,
      setPassword,
      updateBeginningBalance,
      reset,
    };
  }
  return instance;
};
