import { hashPassword } from '../sha256/generateHash';
import { decrypt } from '../themis/decrypt';
import { encrypt } from '../themis/encrypt';
import { setStoredValue } from '../utils/store.util';

export class Shelter {
  static saveSensitiveData = async (sensetiveData: Record<string, string>, password: string) => {
    const passwordHash = await hashPassword(password);
    Object.entries(sensetiveData).map(async ([key, value]) => {
      const dataToSave = await encrypt(value, passwordHash);
      setStoredValue(key, JSON.stringify(dataToSave));
    });
  };

  static decryptSensitiveData = async (key: string, password: string) => {
    const passwordHash = await hashPassword(password);
    const decrypted = await decrypt(key, passwordHash);

    return decrypted;
  };
}
