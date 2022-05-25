import { generateMnemonic } from 'bip39';
import { forkJoin, of, switchMap, Observable, from, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AccountTypeEnum } from '../enums/account-type.enum';
import { AccountInterface } from '../interfaces/account.interface';
import { decrypt } from '../themis/decrypt';
import { encrypt } from '../themis/encrypt';
import { getEtherDerivationPath } from '../utils/derivation-path.utils';
import { generateHdAccount } from '../utils/generate-hd-account.util';
import { generatePassword$ } from '../utils/hash.utils';
import { setStoredValue } from '../utils/store.util';

const PASSWORD_CHECK_KEY = 'app-password';
const INITIAL_PASSWORD_HASH = '';

export class Shelter {
  private static _passwordHash$ = new BehaviorSubject(INITIAL_PASSWORD_HASH);

  static saveSensitiveData$ = (sensitiveData: Record<string, string>) =>
    forkJoin(
      Object.entries(sensitiveData).map(entry =>
        of(entry).pipe(
          switchMap(([key, value]) =>
            from(encrypt(value, Shelter._passwordHash$.getValue())).pipe(
              switchMap(encrypted => from(setStoredValue(key, JSON.stringify(encrypted))))
            )
          )
        )
      )
    );

  static importAccount$ = (
    seedPhrase: string,
    password: string,
    hdAccountsLength = 1
  ): Observable<AccountInterface[]> =>
    generatePassword$(password).pipe(
      switchMap(passwordHash => {
        Shelter._passwordHash$.next(passwordHash);

        return forkJoin(
          [...Array(hdAccountsLength).keys()].map(hdAccIndex => {
            const account = generateHdAccount(seedPhrase, getEtherDerivationPath(hdAccIndex));
            const name = `Account ${hdAccIndex + 1}`;

            return from(account).pipe(
              switchMap(({ privateKey, publicKey, address }) =>
                Shelter.saveSensitiveData$({
                  [publicKey]: privateKey,
                  seedPhrase,
                  [PASSWORD_CHECK_KEY]: generateMnemonic()
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

  static lockApp = () => Shelter._passwordHash$.next(INITIAL_PASSWORD_HASH);

  static unlockApp$ = (password: string) =>
    generatePassword$(password).pipe(
      switchMap(passwordHash =>
        Shelter.decryptSensitiveData$(PASSWORD_CHECK_KEY, passwordHash).pipe(
          map(decrypted => {
            if (decrypted !== undefined) {
              Shelter._passwordHash$.next(passwordHash);

              return true;
            }

            return false;
          }),
          catchError(() => of(false))
        )
      )
    );

  static isLocked$ = Shelter._passwordHash$.pipe(map(password => password === INITIAL_PASSWORD_HASH));

  static getIsLocked = () => Shelter._passwordHash$.getValue() === INITIAL_PASSWORD_HASH;
}
