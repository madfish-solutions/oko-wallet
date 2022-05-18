import { generateMnemonic } from 'bip39';
import { forkJoin, of, switchMap, Observable, from, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AccountTypeEnum } from '../enums/account-type.enum';
import { hashPassword } from '../sha256/generate-hash';
import { AccountInterface } from '../store/interfaces/account.interface';
import { decrypt } from '../themis/decrypt';
import { encrypt } from '../themis/encrypt';
import { getEtherDerivationPath } from '../utils/derivation-path.utils';
import { generateHdAccount } from '../utils/generate-hd-account.util';
import { setStoredValue } from '../utils/store.util';

const PASSWORD_CHECK = 'app-password';
const INITIAL_PASSWORD = 'password';

export class Shelter {
  private static _hashPassword$ = new BehaviorSubject(INITIAL_PASSWORD);

  static hashPasswordObservable$ = (input: string) => from(hashPassword(input));

  static saveSensitiveData = async (sensetiveData: Record<string, string>, password: string) => {
    return Promise.all(
      Object.entries(sensetiveData).map(async ([key, value]) => {
        const dataToSave = await encrypt(value, password);
        setStoredValue(key, JSON.stringify(dataToSave));

        return dataToSave;
      })
    );
  };

  static importAccount$ = (
    seedPhrase: string,
    password: string,
    hdAccountsLength = 1
  ): Observable<AccountInterface[]> => {
    return Shelter.hashPasswordObservable$(password).pipe(
      switchMap(passwordHash => {
        Shelter._hashPassword$.next(passwordHash);

        return forkJoin(
          [...Array(hdAccountsLength).keys()].map(hdAccIndex => {
            const account = generateHdAccount(seedPhrase, getEtherDerivationPath(hdAccIndex));
            const name = `Account ${hdAccIndex + 1}`;

            return from(account).pipe(
              switchMap(({ privateKey, publicKey, address }) =>
                of(
                  Shelter.saveSensitiveData(
                    {
                      [publicKey]: privateKey,
                      seedPhrase,
                      networksKey: 'Etherium',
                      [PASSWORD_CHECK]: generateMnemonic()
                    },
                    passwordHash
                  )
                ).pipe(
                  map(() => {
                    return {
                      name,
                      type: AccountTypeEnum.HD_ACCOUNT,
                      publicKey,
                      publicKeyHash: address
                    };
                  })
                )
              )
            );
          })
        );
      })
    );
  };

  static decryptSensitiveData = async (key: string, password: string) => {
    const decrypted = await decrypt(key, password);

    return decrypted;
  };

  static lockApp = () => Shelter._hashPassword$.next(INITIAL_PASSWORD);

  static unlockApp$ = (password: string) => {
    return Shelter.hashPasswordObservable$(password).pipe(
      switchMap(passwordHash => {
        return from(Shelter.decryptSensitiveData(PASSWORD_CHECK, passwordHash)).pipe(
          map(decrypted => {
            if (decrypted !== undefined) {
              Shelter._hashPassword$.next(passwordHash);

              return true;
            }

            return false;
          }),
          catchError(() => of(false))
        );
      })
    );
  };
}
