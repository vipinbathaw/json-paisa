export const formatDate = (date) => {
  if (!date) {
    date = new Date();
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-IN', options);
};

export const formatDateForInput = (date) => {
  if (!date) {
    date = new Date();
  }
  return new Date(date).toISOString().substring(0, 10);
};

export const formatDateFull = (date) => {
  if (!date) {
    date = new Date();
  }
  return new Date(date).toISOString().split('T').join('_').split('.')[0];
};

export const formatCurrency = (number) => {
  return '₹' + Number(number).toFixed(2);
};

export const removeItemByIndex = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];

// Crypto
export const generateSHA256Hash = async (text) => {
  const msgBuffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => ('00' + b.toString(16)).slice(-2))
    .join('');

  return hashHex;
};
