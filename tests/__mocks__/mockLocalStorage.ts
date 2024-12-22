export const mockLocalStorage = (() => {
  const store = {} as Storage;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },
  };
})();

export const mockValue = ["value"];
