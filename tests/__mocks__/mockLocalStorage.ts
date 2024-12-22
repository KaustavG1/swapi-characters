export const mockLocalStorage = (() => {
  const store = {} as Storage;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      console.log(key, value, store, "b");
      store[key] = value;
      console.log(store, "b 2");
    },
  };
})();

export const mockValue = ["value"];
