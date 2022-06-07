import { isDefined } from '@rnw-community/shared';
import { generateMnemonic } from 'bip39';
import { forkJoin, of, switchMap, Observable, from, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AccountTypeEnum } from '../enums/account-type.enum';
import { NetworkTypeEnum } from '../enums/network-type.enum';
import { AccountInterface } from '../interfaces/account.interface';
import { decrypt } from '../themis/decrypt';
import { encrypt } from '../themis/encrypt';
import { getEtherDerivationPath } from '../utils/derivation-path.utils';
import { derivationPathByNetworkType, generateHdAccount } from '../utils/generate-hd-account.util';
import { generateHash$ } from '../utils/hash.utils';
import { setStoredValue } from '../utils/store.util';

const PASSWORD_CHECK_KEY = 'app-password';
const INITIAL_PASSWORD_HASH = '';

export class Shelter {
  private static _passwordHash$ = new BehaviorSubject(INITIAL_PASSWORD_HASH);

  private static saveSensitiveData$ = (sensitiveData: Record<string, string>) =>
    forkJoin(
      Object.entries(sensitiveData).map(entry =>
        of(entry).pipe(
          switchMap(([key, value]) =>
            from(encrypt(value, Shelter._passwordHash$.getValue())).pipe(
              switchMap(encryptedValue => setStoredValue(key, JSON.stringify(encryptedValue)))
            )
          )
        )
      )
    );

  private static decryptSensitiveData$ = (key: string, passwordHash: string) => from(decrypt(key, passwordHash));

  static isLocked$ = Shelter._passwordHash$.pipe(map(password => password === INITIAL_PASSWORD_HASH));

  static getIsLocked = () => Shelter._passwordHash$.getValue() === INITIAL_PASSWORD_HASH;

  static lockApp = () => Shelter._passwordHash$.next(INITIAL_PASSWORD_HASH);

  static unlockApp$ = (password: string) =>
    generateHash$(password).pipe(
      switchMap(passwordHash =>
        Shelter.decryptSensitiveData$(PASSWORD_CHECK_KEY, passwordHash).pipe(
          map(decrypted => {
            if (isDefined(decrypted)) {
              Shelter._passwordHash$.next(passwordHash);

              return true;
            }

            return false;
          }),
          catchError(() => of(false))
        )
      )
    );

  static revealSeedPhrase$ = () => Shelter.decryptSensitiveData$('seedPhrase', Shelter._passwordHash$.getValue());

  private static savePrivateKey$ = (publicKeyHash: string, privateKey: string) =>
    Shelter.saveSensitiveData$({ [publicKeyHash]: privateKey });

  static importAccount$ = (
    seedPhrase: string,
    password: string,
    hdAccountsLength = 1
  ): Observable<AccountInterface[]> =>
    generateHash$(password).pipe(
      switchMap(passwordHash => {
        Shelter._passwordHash$.next(passwordHash);

        return forkJoin(
          [...Array(hdAccountsLength).keys()].map(hdAccountIndex =>
            from(generateHdAccount(seedPhrase, getEtherDerivationPath(hdAccountIndex))).pipe(
              map(({ privateKey, publicKey, address }) => {
                const name = `Account ${hdAccountIndex + 1}`;

                return {
                  privateData: {
                    [publicKey]: privateKey
                  },
                  publicData: {
                    name,
                    type: AccountTypeEnum.HD_ACCOUNT,
                    accountIndex: hdAccountIndex,
                    networksKeys: {
                      [NetworkTypeEnum.EVM]: {
                        publicKey,
                        publicKeyHash: address
                      }
                    }
                  }
                };
              })
            )
          )
        ).pipe(
          switchMap(accountsData => {
            const privateData = accountsData.reduce((prev, curr) => ({ ...prev, ...curr.privateData }), {});
            const publicData = accountsData.map(({ publicData }) => publicData);

            return Shelter.saveSensitiveData$({
              seedPhrase,
              [PASSWORD_CHECK_KEY]: generateMnemonic(),
              ...privateData
            }).pipe(map(() => publicData));
          })
        );
      })
    );

  static createHdAccount$ = (
    networkType: NetworkTypeEnum,
    accountIndex: number
  ): Observable<AccountInterface | undefined> => {
    const derivationPath = derivationPathByNetworkType[networkType](accountIndex);

    return Shelter.revealSeedPhrase$().pipe(
      switchMap(seedPhrase =>
        from(generateHdAccount(seedPhrase, derivationPath)).pipe(
          switchMap(({ publicKey, address: publicKeyHash, privateKey }) =>
            Shelter.savePrivateKey$(publicKeyHash, privateKey).pipe(
              map(() => ({
                name: `Account ${accountIndex}`,
                accountIndex,
                networksKeys: {
                  [networkType]: {
                    publicKey,
                    publicKeyHash
                  }
                },
                type: AccountTypeEnum.HD_ACCOUNT,
                isVisible: true
              }))
            )
          )
        )
      )
    );
  };
}
