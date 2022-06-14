import { isDefined } from '@rnw-community/shared';
import * as React from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [localStorageValue, setLocalStorageValue] = React.useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return isDefined(item) ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);

      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(localStorageValue) : value;
      setLocalStorageValue(valueToStore);

      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const clearStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    localStorageValue,
    setLocalStorageValue: setValue,
    clearStorage
  };
};
