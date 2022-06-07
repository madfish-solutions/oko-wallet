import { createReducer } from '@reduxjs/toolkit';

import { TOKENS_DEFAULT_LIST } from '../../constants/tokens';
import { getAccountTokensSlug } from '../../utils/address.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { createEntity } from '../utils/entity.utils';

import {
  addNewNetworkAction,
  addHdAccountAction,
  setSelectedAccountAction,
  changeSelectedNetworkAction,
  loadGasTokenBalanceAction,
  loadAccountTokenBalanceAction,
  addTokenMetadataAction,
  changeTokenVisibilityAction,
  switchAccountAction
} from './wallet.actions';
import { WalletState, walletInitialState } from './wallet.state';
import { updateSelectedNetworkState, updateAccountTokenState } from './wallet.utils';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder
    .addCase(addHdAccountAction, (state, { payload: account }) => {
      const { networks, selectedAccountPublicKeyHash, selectedNetworkRpcUrl } = state;
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      const defaultAccountsTokens = TOKENS_DEFAULT_LIST[networks[0].chainId].map(({ tokenAddress }) => ({
        tokenAddress,
        isVisible: true,
        balance: createEntity('0')
      }));

      return {
        ...state,
        accounts: [...state.accounts, account],
        accountsTokens: { [accountTokensSlug]: defaultAccountsTokens }
      };
    })
    .addCase(switchAccountAction, (state, { payload: pkh }) => ({
      ...state,
      selectedAccountPublicKeyHash: pkh
    }))
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
    .addCase(loadAccountTokenBalanceAction.submit, (state, { payload: { token } }) =>
      updateAccountTokenState(state, token, accountToken => ({
        balance: createEntity(accountToken.balance.data, true)
      }))
    )
    .addCase(loadAccountTokenBalanceAction.success, (state, { payload: { token } }) =>
      updateAccountTokenState(state, token, () => token)
    )
    .addCase(loadAccountTokenBalanceAction.fail, (state, { payload: { token, error } }) =>
      updateAccountTokenState(state, token, accountToken => ({
        balance: createEntity(accountToken.balance.data, false, error)
      }))
    )
    .addCase(changeSelectedNetworkAction, (state, { payload: networkRpcUrl }) => ({
      ...state,
      selectedNetworkRpcUrl: networkRpcUrl
    }))
    .addCase(addNewNetworkAction, (state, { payload: network }) => ({
      ...state,
      networks: [...state.networks, network],
      selectedNetworkRpcUrl: network.rpcUrl
    }))
    .addCase(addTokenMetadataAction, (state, { payload: tokenInput }) => {
      const { selectedAccountPublicKeyHash, selectedNetworkRpcUrl } = state;
      const { tokenAddress, tokenId, ...tokenMetadata } = tokenInput;
      const tokenMetadataSlug = getTokenMetadataSlug(selectedNetworkRpcUrl, tokenAddress, tokenId);
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      const accountsTokens = {
        ...state.accountsTokens,
        [accountTokensSlug]: [...(state.accountsTokens[accountTokensSlug] ?? [])]
      };
      const existingTokenIndex = state.accountsTokens[accountTokensSlug]?.findIndex(
        ({ tokenId: existingTokenId, tokenAddress: existingTokenAddress }) =>
          tokenId === existingTokenId && tokenAddress === existingTokenAddress
      );

      if (existingTokenIndex > -1) {
        accountsTokens[accountTokensSlug][existingTokenIndex] = {
          ...accountsTokens[accountTokensSlug][existingTokenIndex],
          isVisible: true
        };
      } else {
        accountsTokens[accountTokensSlug] = [
          ...accountsTokens[accountTokensSlug],
          {
            tokenId,
            tokenAddress,
            isVisible: true,
            balance: createEntity('0')
          }
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
    .addCase(changeTokenVisibilityAction, (state, { payload: token }) =>
      updateAccountTokenState(state, token, accountToken => ({
        isVisible: !accountToken.isVisible
      }))
    );
});
