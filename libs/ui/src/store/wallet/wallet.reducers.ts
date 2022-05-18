import { createReducer } from '@reduxjs/toolkit';

import { initialAccount } from '../../mocks/account.interface.mock';
import { checkIsNetworkTypeKeyExist } from '../../utils/check-is-account-exist.utils';
import { createEntity } from '../utils/entity.utils';

import {
  addNewNetworkAction,
  generateHdAccountByNetworkTypeAction,
  changeNetworkAction,
  generateHDAccountAction,
  loadGasTokenBalanceAction,
  changeAccountAction
} from './wallet.actions';
import { walletInitialState, WalletState } from './wallet.state';
import { updateSelectedNetworkState } from './wallet.utils';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder.addCase(generateHDAccountAction.success, (state, { payload: account }) => ({
    ...state,
    accounts: [...state.accounts, account].sort((a, b) => a.accountIndex - b.accountIndex),
    selectedAccountPublicKeyHash: account.networksKeys[state.selectedNetworkType].publicKeyHash,
    selectedAccountIndex: account.accountIndex
  }));
  builder.addCase(changeAccountAction, (state, { payload: account }) => ({
    ...state,
    selectedAccountPublicKeyHash: account.networksKeys[state.selectedNetworkType].publicKeyHash,
    selectedAccountIndex: account.accountIndex
  }));

  builder.addCase(loadGasTokenBalanceAction.submit, state =>
    updateSelectedNetworkState(state, selectedNetwork => ({
      gasTokenBalance: createEntity(selectedNetwork.gasTokenBalance.data, true)
    }))
  );
  builder.addCase(loadGasTokenBalanceAction.success, (state, { payload }) =>
    updateSelectedNetworkState(state, () => ({
      gasTokenBalance: createEntity(payload, false)
    }))
  );
  builder.addCase(loadGasTokenBalanceAction.fail, (state, { payload: error }) =>
    updateSelectedNetworkState(state, selectedNetwork => ({
      gasTokenBalance: createEntity(selectedNetwork.gasTokenBalance.data, false, error)
    }))
  );

  builder.addCase(changeNetworkAction, (state, { payload: newSelectedNetwork }) => {
    const currentAccount =
      state.accounts.find(account => account.accountIndex === newSelectedNetwork.accountIndex) ?? initialAccount;

    return {
      ...state,
      selectedNetworkRpcUrl: newSelectedNetwork.rpcUrl,
      selectedNetworkType: newSelectedNetwork.networkType,
      selectedAccountPublicKeyHash: checkIsNetworkTypeKeyExist(currentAccount, newSelectedNetwork.networkType)
        ? currentAccount.networksKeys[newSelectedNetwork.networkType].publicKeyHash
        : ''
    };
  });

  builder.addCase(generateHdAccountByNetworkTypeAction.success, (state, { payload: newAccount }) => {
    const filteredAccounts = state.accounts.filter(account => account.accountIndex !== newAccount.accountIndex);

    return {
      ...state,
      accounts: [...filteredAccounts, newAccount].sort((a, b) => a.accountIndex - b.accountIndex),
      selectedAccountPublicKeyHash: newAccount.networksKeys[state.selectedNetworkType].publicKeyHash,
      selectedAccountIndex: newAccount.accountIndex
    };
  });

  builder.addCase(addNewNetworkAction, (state, { payload: network }) => ({
    ...state,
    networks: [...state.networks, network],
    selectedNetworkRpcUrl: network.rpcUrl
  }));
});
