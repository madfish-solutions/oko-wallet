import { createReducer } from '@reduxjs/toolkit';

import { initialAccount } from '../../mocks/account.interface.mock';
import { getAccountTokensSlug } from '../../utils/address.util';
import { checkIsNetworkTypeKeyExist } from '../../utils/check-is-network-type-key-exist';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { createEntity } from '../utils/entity.utils';

import {
  addNewNetworkAction,
  createHdAccountWithOtherNetworkTypeAction,
  changeNetworkAction,
  createHdAccountAction,
  setSelectedAccountAction,
  loadGasTokenBalanceAction,
  changeAccountAction,
  addTokenMetadataAction,
  changeTokenVisibilityAction
} from './wallet.actions';
import { walletInitialState, WalletState } from './wallet.state';
import { getDefaultAccountTokens, updateSelectedNetworkState } from './wallet.utils';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder
    .addCase(createHdAccountAction, (state, { payload: account }) => {
      const { accountTokensSlug, defaultAccountTokens } = getDefaultAccountTokens(state, account);

      return {
        ...state,
        accounts: [...state.accounts, account].sort((a, b) => a.accountIndex - b.accountIndex),
        selectedAccountPublicKeyHash: account.networksKeys[state.selectedNetworkType].publicKeyHash,
        selectedAccountIndex: account.accountIndex,
        accountsTokens: { ...state.accountsTokens, [accountTokensSlug]: defaultAccountTokens }
      };
    })
    .addCase(createHdAccountWithOtherNetworkTypeAction, (state, { payload: newAccount }) => {
      const { accountTokensSlug, defaultAccountTokens } = getDefaultAccountTokens(state, newAccount);
      const accountsWithoutCurrent = state.accounts.filter(account => account.accountIndex !== newAccount.accountIndex);

      return {
        ...state,
        accounts: [...accountsWithoutCurrent, newAccount].sort((a, b) => a.accountIndex - b.accountIndex),
        selectedAccountPublicKeyHash: newAccount.networksKeys[state.selectedNetworkType].publicKeyHash,
        selectedAccountIndex: newAccount.accountIndex,
        accountsTokens: { ...state.accountsTokens, [accountTokensSlug]: defaultAccountTokens }
      };
    });
  builder
    .addCase(setSelectedAccountAction, (state, { payload: selectedAccount }) => ({
      ...state,
      selectedAccountPublicKeyHash: selectedAccount ?? ''
    }))
    .addCase(loadGasTokenBalanceAction.submit, state =>
      updateSelectedNetworkState(state, selectedNetwork => ({
        gasTokenBalance: createEntity(selectedNetwork.gasTokenBalance.data, true)
      }))
    )
    .addCase(loadGasTokenBalanceAction.success, (state, { payload }) =>
      updateSelectedNetworkState(state, () => ({
        gasTokenBalance: createEntity(payload, false)
      }))
    )
    .addCase(loadGasTokenBalanceAction.fail, (state, { payload: error }) =>
      updateSelectedNetworkState(state, selectedNetwork => ({
        gasTokenBalance: createEntity(selectedNetwork.gasTokenBalance.data, false, error)
      }))
    )
    .addCase(addTokenMetadataAction, (state, { payload: tokenMetadata }) => {
      const { selectedAccountPublicKeyHash, selectedNetworkRpcUrl } = state;
      const { tokenAddress } = tokenMetadata;

      const tokenMetadataSlug = getTokenMetadataSlug(selectedNetworkRpcUrl, tokenAddress);
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      const accountsTokens = {
        ...state.accountsTokens,
        [accountTokensSlug]: [...(state.accountsTokens[accountTokensSlug] ?? [])]
      };
      const existingTokenIndex = state.accountsTokens[accountTokensSlug]?.findIndex(
        ({ tokenAddress: existingTokenAddress }) => existingTokenAddress === tokenAddress
      );

      if (existingTokenIndex > -1) {
        accountsTokens[accountTokensSlug][existingTokenIndex] = {
          ...accountsTokens[accountTokensSlug][existingTokenIndex],
          isVisible: true
        };
      } else {
        accountsTokens[accountTokensSlug] = [
          ...accountsTokens[accountTokensSlug],
          { tokenAddress, isVisible: true, balance: '0' }
        ];
      }

      return {
        ...state,
        accountsTokens,
        tokensMetadata: {
          ...state.tokensMetadata,
          [tokenMetadataSlug]: tokenMetadata
        }
      };
    })
    .addCase(changeTokenVisibilityAction, (state, { payload: tokenAddress }) => {
      const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkRpcUrl, state.selectedAccountPublicKeyHash);
      const updatedAccountTokens = state.accountsTokens[accountTokensSlug].map(accountToken =>
        accountToken.tokenAddress === tokenAddress
          ? { ...accountToken, isVisible: !accountToken.isVisible }
          : accountToken
      );

      return { ...state, accountsTokens: { ...state.accountsTokens, [accountTokensSlug]: updatedAccountTokens } };
    });

  builder.addCase(changeAccountAction, (state, { payload: account }) => ({
    ...state,
    selectedAccountPublicKeyHash: account.networksKeys[state.selectedNetworkType].publicKeyHash,
    selectedAccountIndex: account.accountIndex
  }));

  builder.addCase(addNewNetworkAction, (state, { payload: network }) => ({
    ...state,
    networks: [...state.networks, network],
    selectedNetworkRpcUrl: network.rpcUrl
  }));
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
});
