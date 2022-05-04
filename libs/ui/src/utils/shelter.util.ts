import { Buffer } from 'buffer';

import { generateSalt } from '../themis/encrypt';

export const getStoredValue = (key: string) => {
  try {
    const encryptedData = localStorage.getItem(key);

    if (encryptedData !== null) {
      return JSON.parse(encryptedData);
    }
  } catch (e) {
    console.log(e);
  }
};

export const setStoredValue = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const encrypt = async (seed: string, passwordHash: string) => {
  const salt = await generateSalt(passwordHash);

  const secureText = new Uint8Array([...Buffer.from(seed)]);
  const encrypted = salt.encrypt(secureText);
  console.log(encrypted.length);
  console.log(secureText.length);

  return encrypted;
};

export const decrypt = async (passwordHash: string, key: string) => {
  const seedPhrase: Uint8Array = await getStoredValue(key);
  const salt = await generateSalt(passwordHash);
  console.log(seedPhrase);
  console.log(typeof seedPhrase);
  console.log(Object.keys(seedPhrase));
  console.log(Object.values(seedPhrase));
  const seedArray = Uint8Array.from(Object.values(seedPhrase));
  console.log(seedArray);
  const decryptedArray = salt.decrypt(seedArray);
  const decrypted = Buffer.from(decryptedArray).toString();

  return decrypted;
};
