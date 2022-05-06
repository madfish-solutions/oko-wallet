import { initialized, SecureCellSeal } from 'wasm-themis';

import { getStoredValue, StoredSensetiveData } from '../utils/store.util';

export const decrypt = async (passwordHash: string, key: string) => {
  await initialized;

  const encryptedData = await getStoredValue<StoredSensetiveData>(key);
  if (encryptedData !== undefined) {
    const encryptedArray = Uint8Array.from(Object.values(encryptedData.encrypted));
    const context = new Uint8Array([...Buffer.from(passwordHash)]);
    const saltArray = Uint8Array.from(Object.values(encryptedData.symmetricKey));
    const cell = SecureCellSeal.withKey(saltArray);
    const decryptedArray = cell.decrypt(encryptedArray, context);
    const decrypted = Buffer.from(decryptedArray).toString();

    return decrypted;
  } else {
    throw Error('failed to decrypt message');
  }
};
