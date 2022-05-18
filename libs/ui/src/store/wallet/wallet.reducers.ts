import { createReducer } from '@reduxjs/toolkit';

import { initialAccount } from '../../mocks/account.interface.mock';
import { createEntity } from '../utils/entity.utils';

import {
  addNewNetworkAction,
  changeAccountAndGenerateHdAccountByNetworkTypeAction,
  changeNetworkAction,
  changeNetworkAndGenerateHdAccountByNetworkTypeAction,
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
    selectedAccountPublicKeyHash: account.networks[state.selectedNetworkType].publicKeyHash,
    selectedAccountIndex: account.accountIndex
  }));
  builder.addCase(changeAccountAction, (state, { payload: account }) => ({
    ...state,
    selectedAccountPublicKeyHash: account.networks[state.selectedNetworkType].publicKeyHash,
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

  builder.addCase(changeNetworkAction.submit, (state, { payload: newSelectedNetwork }) => ({
    ...state,
    selectedNetworkRpcUrl: newSelectedNetwork.rpcUrl,
    selectedNetworkType: newSelectedNetwork.networkType,
    selectedAccountPublicKeyHash: newSelectedNetwork.publicKeyHash
  }));
  builder.addCase(
    changeNetworkAndGenerateHdAccountByNetworkTypeAction.submit,
    (state, { payload: newSelectedNetwork }) => ({
      ...state,
      selectedNetworkRpcUrl: newSelectedNetwork.rpcUrl,
      selectedNetworkType: newSelectedNetwork.networkType
    })
  );
  builder.addCase(changeNetworkAndGenerateHdAccountByNetworkTypeAction.success, (state, { payload: account }) => {
    const selectedAccount =
      state.accounts.find(account => account.accountIndex === state.selectedAccountIndex) ?? initialAccount;
    const filteredAccounts = state.accounts.filter(account => account.accountIndex !== selectedAccount.accountIndex);

    return {
      ...state,
      accounts: [
        ...filteredAccounts,
        {
          ...selectedAccount,
          networks: {
            ...selectedAccount.networks,
            [state.selectedNetworkType]: {
              ...account.networks[state.selectedNetworkType]
            }
          }
        }
      ].sort((a, b) => a.accountIndex - b.accountIndex),
      selectedAccountPublicKeyHash: account.networks[state.selectedNetworkType].publicKeyHash,
      selectedAccountIndex: account.accountIndex
    };
  });

  builder.addCase(changeAccountAndGenerateHdAccountByNetworkTypeAction.success, (state, { payload: newAccount }) => {
    const filteredAccounts = state.accounts.filter(account => account.accountIndex !== newAccount.accountIndex);

    return {
      ...state,
      accounts: [...filteredAccounts, newAccount].sort((a, b) => a.accountIndex - b.accountIndex),
      selectedAccountPublicKeyHash: newAccount.networks[state.selectedNetworkType].publicKeyHash,
      selectedAccountIndex: newAccount.accountIndex
    };
  });

  builder.addCase(addNewNetworkAction, (state, { payload: network }) => ({
    ...state,
    networks: [...state.networks, network],
    selectedNetworkRpcUrl: network.rpcUrl
  }));
});
