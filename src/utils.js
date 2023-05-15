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

export const encryptData = async (text, password) => {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const passwordData = encoder.encode(password);
  const key = await crypto.subtle.importKey(
    'raw',
    passwordData,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('salt'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    key,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const data = encoder.encode(text);
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    derivedKey,
    data
  );

  const encryptedText = arrayBufferToBase64(encryptedData);
  const ivText = arrayBufferToBase64(iv);

  return { encryptedText, ivText };
};

export const decryptData = async (encryptedText, ivText, password) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const encryptedData = base64ToArrayBuffer(encryptedText);
  const iv = base64ToArrayBuffer(ivText);

  const passwordData = encoder.encode(password);
  const key = await crypto.subtle.importKey(
    'raw',
    passwordData,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('salt'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    key,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decryptedData = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    derivedKey,
    encryptedData
  );

  const decryptedText = decoder.decode(decryptedData);
  return decryptedText;
};

const arrayBufferToBase64 = (arrayBuffer) => {
  const binaryString = String.fromCharCode.apply(
    null,
    new Uint8Array(arrayBuffer)
  );
  return window.btoa(binaryString);
};

const base64ToArrayBuffer = (base64) => {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};
