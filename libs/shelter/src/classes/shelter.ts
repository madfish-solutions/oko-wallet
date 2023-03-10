import { Provider } from '@ethersproject/abstract-provider';
import { isDefined } from '@rnw-community/shared';
import { InMemorySigner } from '@taquito/signer';
import { generateMnemonic } from 'bip39';
import { ethers } from 'ethers';
import { forkJoin, of, Observable, from, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AccountTypeEnum, NetworkTypeEnum, AccountInterface, HdAccount, isWeb, setStoredValue } from 'shared';

import { INITIAL_PASSWORD_HASH, PASSWORD_CHECK_KEY, SEED_PHRASE_KEY } from '../constants/defaults';
import { BackgroundMessager } from '../messagers/background-messager';
import { decrypt } from '../themis/decrypt';
import { encrypt } from '../themis/encrypt';
import { getEtherDerivationPath } from '../utils/derivation-path.utils';
import { derivationPathByNetworkType, generateHdAccount } from '../utils/generate-hd-account.util';
import { generateHash$ } from '../utils/hash.utils';
import { signMessageByMethod } from '../utils/sign-message-by-method.util';

export class Shelter {
  static _passwordHash$ = new BehaviorSubject(INITIAL_PASSWORD_HASH);

  static setPasswordHash = (passwordHash: string) => {
    if (isWeb) {
      BackgroundMessager.setPasswordHash(passwordHash);
    }
    Shelter._passwordHash$.next(passwordHash);
  };

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

  static lockApp = () => Shelter.setPasswordHash(INITIAL_PASSWORD_HASH);

  static unlockApp$ = (password: string) =>
    generateHash$(password).pipe(
      switchMap(passwordHash =>
        Shelter.decryptSensitiveData$(PASSWORD_CHECK_KEY, passwordHash).pipe(
          map(decrypted => {
            if (isDefined(decrypted)) {
              Shelter.setPasswordHash(passwordHash);

              return true;
            }

            return false;
          }),
          catchError(() => of(false))
        )
      )
    );

  static changePassword$ = (oldPassword: string, newPassword: string, sensitiveDataKeys: string[]) =>
    Shelter.unlockApp$(oldPassword).pipe(
      switchMap(result => {
        if (result) {
          // skip changing password, if new password is the same as old one
          if (oldPassword === newPassword) {
            return of(true);
          }

          return forkJoin([generateHash$(oldPassword), generateHash$(newPassword)]).pipe(
            switchMap(([oldPasswordHash, newPasswordHash]) => {
              Shelter.setPasswordHash(newPasswordHash);

              return forkJoin(sensitiveDataKeys.map(key => Shelter.decryptSensitiveData$(key, oldPasswordHash))).pipe(
                switchMap(rawDataArray => {
                  const sensitiveData = sensitiveDataKeys.reduce(
                    (obj, key, keyIndex) => ({ ...obj, [key]: rawDataArray[keyIndex] }),
                    {}
                  );

                  return Shelter.saveSensitiveData$(sensitiveData);
                }),
                map(() => true)
              );
            })
          );
        }

        return of(false);
      })
    );

  static revealSeedPhrase$ = () => Shelter.decryptSensitiveData$(SEED_PHRASE_KEY, Shelter._passwordHash$.getValue());

  private static savePrivateKey$ = (publicKeyHash: string, privateKey: string) =>
    Shelter.saveSensitiveData$({ [publicKeyHash]: privateKey });

  static importAccount$ = (
    seedPhrase: string,
    password: string,
    hdAccountsLength = 1,
    accountName?: string
  ): Observable<AccountInterface[]> =>
    generateHash$(password).pipe(
      switchMap(passwordHash => {
        Shelter.setPasswordHash(passwordHash);

        return forkJoin(
          [...Array(hdAccountsLength).keys()].map(hdAccountId =>
            from(generateHdAccount(seedPhrase, getEtherDerivationPath(hdAccountId))).pipe(
              map(({ privateKey, publicKey, address }) => {
                const name = accountName ?? `Account ${hdAccountId + 1}`;
                const publicKeyHash = address.toLowerCase();

                return {
                  privateData: {
                    [publicKeyHash]: privateKey
                  },
                  publicData: {
                    name,
                    type: AccountTypeEnum.HD_ACCOUNT,
                    accountId: hdAccountId + 1,
                    networksKeys: {
                      [NetworkTypeEnum.EVM]: {
                        publicKey,
                        publicKeyHash
                      }
                    },
                    isVisible: true
                  }
                };
              })
            )
          )
        ).pipe(
          switchMap(accountsData => {
            const privateData = accountsData.reduce((prev, curr) => ({ ...prev, ...curr.privateData }), {});
            const publicData = accountsData.map(data => data.publicData);

            return Shelter.saveSensitiveData$({
              [SEED_PHRASE_KEY]: seedPhrase,
              [PASSWORD_CHECK_KEY]: generateMnemonic(),
              ...privateData
            }).pipe(map(() => publicData));
          })
        );
      })
    );

  static createHdAccount$ = (
    networkType: NetworkTypeEnum,
    accountId: number,
    accountIndex: number,
    name: string
  ): Observable<AccountInterface | undefined> => {
    const derivationPath = derivationPathByNetworkType[networkType](accountIndex);

    return Shelter.revealSeedPhrase$().pipe(
      switchMap(seedPhrase =>
        from(generateHdAccount(seedPhrase, derivationPath)).pipe(
          switchMap(({ publicKey, address: publicKeyHash, privateKey }) =>
            Shelter.savePrivateKey$(publicKeyHash, privateKey).pipe(
              map(() => ({
                name,
                accountId,
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

  static createImportedAccount$ = (
    hdAccount: HdAccount,
    networkType: NetworkTypeEnum,
    accountId: number,
    name: string
  ) =>
    of(hdAccount).pipe(
      switchMap(({ privateKey, publicKey, address: publicKeyHash }) =>
        Shelter.savePrivateKey$(publicKeyHash, privateKey).pipe(
          map(() => ({
            name,
            type: AccountTypeEnum.IMPORTED_ACCOUNT,
            accountId,
            networksKeys: {
              [networkType]: {
                publicKey,
                publicKeyHash
              }
            },
            isVisible: true
          }))
        )
      )
    );

  static revealPrivateKey$ = (publicKeyHash: string) =>
    Shelter.decryptSensitiveData$(publicKeyHash, Shelter._passwordHash$.getValue());

  static getEvmSigner$ = (publicKeyHash: string, provider: Provider) =>
    Shelter.revealPrivateKey$(publicKeyHash).pipe(map(privateKey => new ethers.Wallet(privateKey, provider)));

  static getTezosSigner$ = (publicKeyHash: string) =>
    Shelter.revealPrivateKey$(publicKeyHash).pipe(map(privateKey => new InMemorySigner(privateKey)));

  static signMessage$ = (publicKeyHash: string, messageToSign: string, method: string) =>
    Shelter.revealPrivateKey$(publicKeyHash).pipe(
      switchMap(privateKey => from(signMessageByMethod(privateKey, messageToSign, method)))
    );
}
