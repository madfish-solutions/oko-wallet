import { Dispatch } from '@reduxjs/toolkit';
import { Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { showLoaderAction, hideLoaderAction } from '../../store/settings/settings.actions';
import { createHdAccountAction, setSelectedAccountAction } from '../../store/wallet/wallet.actions';
import { getString } from '../../utils/get-string.utils';
import { ImportWalletParams } from '../interfaces/import-wallet-params.interface';
import { Shelter } from '../shelter';

export const importWalletSubscription = (importWallet$: Subject<ImportWalletParams>, dispatch: Dispatch) =>
  importWallet$
    .pipe(
      tap(() => dispatch(showLoaderAction())),
      switchMap(({ seedPhrase, password, hdAccountsLength, accountName }) =>
        Shelter.importAccount$(seedPhrase, password, hdAccountsLength, accountName)
      ),
      tap(() => dispatch(hideLoaderAction()))
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
