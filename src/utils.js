export const formatDate = (date) => {
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

export const removeItemByIndex = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];
