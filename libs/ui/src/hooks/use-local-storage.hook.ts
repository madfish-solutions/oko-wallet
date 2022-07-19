import AsyncStorage from '@react-native-async-storage/async-storage';
import { isDefined } from '@rnw-community/shared';
import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // TODO: Add logic with AsyncStorage
  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);

      return initialValue;
    }
  });

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
    setLocalStorageValue(initialValue);
  };

  return {
    localStorageValue,
    setLocalStorageValue: setValue,
    clearStorage
  };
};
