export const saveToLocalStorage = (key, value) => {
  try {
    console.log('save', value);
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    throw new Error();
  }
};
export const getLocalStorage = key => {
  try {
    const items = localStorage.getItem(key);
    console.log('get', items);
    return items ? JSON.parse(items) : null;
  } catch (err) {
    throw new Error();
  }
};
