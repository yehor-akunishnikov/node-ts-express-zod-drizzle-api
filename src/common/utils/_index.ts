export const ebcOmit = <
  O extends Record<string, unknown>,
  K extends keyof O
>(obj: O, keys: K[]): Omit<O, K> => {
  keys.forEach(key => {
    delete obj[key];
  });

  return obj;
};
