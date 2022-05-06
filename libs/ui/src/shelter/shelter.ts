import { hashPassword } from '../sha256/generateHash';
import { decrypt } from '../themis/decrypt';
import { encrypt } from '../themis/encrypt';
import { setStoredValue } from '../utils/store.util';

export class Shelter {
  static saveSensitiveData = async (sensetiveData: string, password: string) => {
    const passwordHash = await hashPassword(password);
    const dataToSave = await encrypt(sensetiveData, passwordHash);
    setStoredValue('sensetiveData', JSON.stringify(dataToSave));
  };

  static decryptSensitiveData = async (password: string, key: string) => {
    const passwordHash = await hashPassword(password);
    const decrypted = await decrypt(passwordHash, key);

    return decrypted;
  };
}
