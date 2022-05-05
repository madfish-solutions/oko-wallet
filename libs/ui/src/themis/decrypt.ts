import { initialized, SecureCellSeal } from 'wasm-themis';

import { getStoredValue, StoredSensetiveData } from '../utils/shelter.util';

export const decrypt = async (passwordHash: string, key: string) => {
  await initialized;

  const encryptedData = await getStoredValue<StoredSensetiveData>(key);
  if (encryptedData !== undefined) {
    const seedArray = Uint8Array.from(Object.values(encryptedData.encrypted));
    const context = new Uint8Array([...Buffer.from(passwordHash)]);
    const saltArray = Uint8Array.from(Object.values(encryptedData.symmetricKey));
    const cell = SecureCellSeal.withKey(saltArray);
    const decryptedArray = cell.decrypt(seedArray, context);
    const decrypted = Buffer.from(decryptedArray).toString();

    return decrypted;
  }
};
