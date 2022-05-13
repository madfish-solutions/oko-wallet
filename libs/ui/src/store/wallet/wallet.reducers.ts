import { createReducer } from '@reduxjs/toolkit';

import { mockHdAccount } from '../../mocks/account.interface.mock';

import { WalletState } from './types';
import { generateHDAccount, addTokenMetadataAction, changeTokenVisibilityAction } from './wallet.actions';
import { walletInitialState } from './wallet.state';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder
    .addCase(generateHDAccount, state => ({
      ...state,
      accounts: [mockHdAccount],
      selectedAccountPublicKeyHash: mockHdAccount.publicKeyHash
    }))
    .addCase(addTokenMetadataAction, (state, { payload }) => {
      const currentAccount = state.selectedAccountPublicKeyHash;
      const currentNetwork = state.selectedNetwork;
      const tokenAddress = payload.tokenAddress;

      state.tokensMetadata = {
        ...state.tokensMetadata,
        [currentNetwork]: {
          ...state.tokensMetadata[currentNetwork],
          [payload.tokenAddress]: payload
        }
      };

      state.settings = {
        ...state.settings,
        [currentNetwork]: {
          ...state.settings[currentNetwork],
          [currentAccount]: [
            ...(state.settings[currentNetwork]?.[currentAccount] ?? []),
            { tokenAddress, isVisible: true }
          ]
        }
      };
    })
    .addCase(changeTokenVisibilityAction, (state, { payload: { tokenAddress, isVisible } }) => {
      const currentAccount = state.selectedAccountPublicKeyHash;
      const currentToken = state.settings[state.selectedNetwork][currentAccount].find(
        token => token.tokenAddress === tokenAddress
      );

      if (currentToken) {
        currentToken.isVisible = isVisible;
      }
    });
});
