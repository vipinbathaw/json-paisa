export const formatDate = (date) => {
  if (!date) {
    date = new Date();
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-IN', options);
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
  return date.toISOString().split('T').join('_').split('.')[0];
};

export const removeItemByIndex = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];
