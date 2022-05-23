import { generateMnemonic } from 'bip39';
import { forkJoin, of, switchMap, Observable, from, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AccountTypeEnum } from '../enums/account-type.enum';
import { AccountInterface } from '../interfaces/account.interface';
import { hashPassword } from '../sha256/generate-hash';
import { decrypt } from '../themis/decrypt';
import { encrypt } from '../themis/encrypt';
import { getEtherDerivationPath } from '../utils/derivation-path.utils';
import { generateHdAccount } from '../utils/generate-hd-account.util';
import { setStoredValue } from '../utils/store.util';

const PASSWORD_CHECK = 'app-password';
const INITIAL_PASSWORD = '';

export class Shelter {
  private static _hashPassword$ = new BehaviorSubject(INITIAL_PASSWORD);

  static hashPasswordObservable$ = (input: string) => from(hashPassword(input));

  static saveSensitiveData$ = (sensitiveData: Record<string, string>) =>
    forkJoin(
      Object.entries(sensitiveData).map(entry =>
        of(entry).pipe(
          switchMap(([key, value]) =>
            from(encrypt(value, Shelter._hashPassword$.getValue())).pipe(
              switchMap(encrypted => from(setStoredValue(key, JSON.stringify(encrypted))))
            )
          )
        )
      )
    );

  static saveSensitiveData = async (sensetiveData: Record<string, string>, password: string) =>
    Promise.all(
      Object.entries(sensetiveData).map(async ([key, value]) => {
        const dataToSave = await encrypt(value, password);
        setStoredValue(key, JSON.stringify(dataToSave));

        return dataToSave;
      })
    );

  static importAccount$ = (
    seedPhrase: string,
    password: string,
    hdAccountsLength = 1
  ): Observable<AccountInterface[]> =>
    Shelter.hashPasswordObservable$(password).pipe(
      switchMap(passwordHash => {
        Shelter._hashPassword$.next(passwordHash);

        return forkJoin(
          [...Array(hdAccountsLength).keys()].map(hdAccIndex => {
            const account = generateHdAccount(seedPhrase, getEtherDerivationPath(hdAccIndex));
            const name = `Account ${hdAccIndex + 1}`;

            return from(account).pipe(
              switchMap(({ privateKey, publicKey, address }) =>
                Shelter.saveSensitiveData$({
                  [publicKey]: privateKey,
                  seedPhrase,
                  [PASSWORD_CHECK]: generateMnemonic()
                }).pipe(
                  map(() => ({
                    name,
                    type: AccountTypeEnum.HD_ACCOUNT,
                    publicKey,
                    publicKeyHash: address
                  }))
                )
              )
            );
          })
        );
      })
    );

  static decryptSensitiveData$ = (key: string, passwordHash: string) => from(decrypt(key, passwordHash));

  static lockApp = () => Shelter._hashPassword$.next(INITIAL_PASSWORD);

  static unlockApp$ = (password: string) =>
    Shelter.hashPasswordObservable$(password).pipe(
      switchMap(passwordHash =>
        Shelter.decryptSensitiveData$(PASSWORD_CHECK, passwordHash).pipe(
          map(decrypted => {
            if (decrypted !== undefined) {
              Shelter._hashPassword$.next(passwordHash);

              return true;
            }

            return false;
          }),
          catchError(() => of(false))
        )
      )
    );

  static isLocked$ = Shelter._hashPassword$.pipe(map(password => password === INITIAL_PASSWORD));

  static getIsLocked = () => Shelter._hashPassword$.getValue() === INITIAL_PASSWORD;
}
