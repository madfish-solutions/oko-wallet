import AsyncStorage from '@react-native-async-storage/async-storage';
import { isDefined } from '@rnw-community/shared';
import { useEffect, useState } from 'react';

// TODO: reuse in other places (eg. saving.ts & popup-mode/index.ts)
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [localStorageValue, setLocalStorageValue] = useState<T>(initialValue);

  const getStoredValue = async (newKey: string) => {
    const value = await AsyncStorage.getItem(newKey);

    if (isDefined(value)) {
      try {
        return setLocalStorageValue(JSON.parse(value));
      } catch {}
    }

    return initialValue;
  };

  useEffect(() => {
    getStoredValue(key);
  }, [key]);

  const setValue = async (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(localStorageValue) : value;
      setLocalStorageValue(valueToStore);

      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const clearStorage = async (key: string) => {
    await AsyncStorage.removeItem(key);
    // AsyncStorage.clear();
  };

  return {
    localStorageValue,
    setLocalStorageValue: setValue,
    clearStorage
  };
};
