import { getStoredValue } from 'shared';
import { SymmetricKey, initialized, SecureCellSeal } from 'wasm-themis';

interface StoredSensitiveData {
  symmetricKey: SymmetricKey;
  encrypted: object;
}

export const decrypt = async (key: string, passwordHash: string) => {
  await initialized;
  const encryptedData = await getStoredValue<StoredSensitiveData>(key);
  const encryptedArray = Uint8Array.from(Object.values(encryptedData.encrypted));
  const context = new Uint8Array([...Buffer.from(passwordHash)]);
  const saltArray = Uint8Array.from(Object.values(encryptedData.symmetricKey));
  const cell = SecureCellSeal.withKey(saltArray);
  const decryptedArray = cell.decrypt(encryptedArray, context);

  return Buffer.from(decryptedArray).toString();
};
