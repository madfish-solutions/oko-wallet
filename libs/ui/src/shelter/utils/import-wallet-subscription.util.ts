import { Dispatch } from '@reduxjs/toolkit';
import { Subject, switchMap } from 'rxjs';

import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { addHdAccountAction, setSelectedAccountAction } from '../../store/wallet/wallet.actions';
import { ImportWalletParams } from '../import-wallet-params.interface';
import { Shelter } from '../shelter';

export const importWalletSubscription = (importWallet$: Subject<ImportWalletParams>, dispatch: Dispatch) =>
  importWallet$
    .pipe(
      switchMap(({ seedPhrase, password, hdAccountsLength }) =>
        Shelter.importAccount$(seedPhrase, password, hdAccountsLength)
      )
    )
    .subscribe(importedAccounts => {
      if (importedAccounts !== undefined) {
        const firstAccount = importedAccounts[0];
        dispatch(setSelectedAccountAction(firstAccount.networksKeys[NetworkTypeEnum.Ethereum].publicKeyHash));

        for (const account of importedAccounts) {
          dispatch(addHdAccountAction(account));
        }
      }
    });
