import { Dispatch } from '@reduxjs/toolkit';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { createHdAccountAction, setSelectedAccountAction } from '../../store/wallet/wallet.actions';
import { getString } from '../../utils/get-string.utils';
import { ImportWalletParams } from '../interfaces/import-wallet-params.interface';
import { Shelter } from '../shelter';

export const importWalletSubscription = (importWallet$: Subject<ImportWalletParams>, dispatch: Dispatch) =>
  importWallet$
    .pipe(
      switchMap(({ seedPhrase, password, hdAccountsLength, accountName }) =>
        Shelter.importAccount$(seedPhrase, password, hdAccountsLength, accountName)
      )
    )
    .subscribe(importedAccounts => {
      if (importedAccounts !== undefined) {
        const firstAccount = importedAccounts[0];
        dispatch(setSelectedAccountAction(getString(firstAccount.networksKeys[NetworkTypeEnum.EVM]?.publicKeyHash)));

        for (const account of importedAccounts) {
          dispatch(createHdAccountAction(account));
        }
      }
    });
