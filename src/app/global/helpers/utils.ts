export const saveLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error in store the value in local storage');
  }
};

export const readLocalStorage = (clave: string) => {
  try {
    const data = localStorage.getItem(clave);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log(`Error cant no read the value ${error}`);
  }
};
