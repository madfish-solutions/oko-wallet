import { createReducer } from '@reduxjs/toolkit';
import { isDefined } from '@rnw-community/shared';

import { TransactionStatusEnum } from '../../enums/transactions.enum';
import { NetworkInterface } from '../../interfaces/network.interface';
import { getAccountTokensSlug } from '../../utils/address.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { createEntity } from '../utils/entity.utils';

import {
  addNewNetworkAction,
  createHdAccountForNewNetworkTypeAction,
  changeNetworkAction,
  createHdAccountAction,
  setSelectedAccountAction,
  editAccountNameAction,
  loadGasTokenBalanceAction,
  changeAccountAction,
  addTokenMetadataAction,
  changeTokenVisibilityAction,
  loadAccountTokenBalanceAction,
  updateTransactionAction,
  addTransactionAction,
  editNetworkAction,
  removeNetworkAction
} from './wallet.actions';
import { walletInitialState, WalletState } from './wallet.state';
import {
  getPublicKeyHash,
  getSelectedAccount,
  getSelectedNetworkType,
  updateAccountsTokensState,
  updateAccountTokenState,
  updateSelectedNetworkState
} from './wallet.utils';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder
    .addCase(createHdAccountAction, (state, { payload: newAccount }) => ({
      ...state,
      accounts: [...state.accounts, newAccount].sort((a, b) => a.accountIndex - b.accountIndex),
      selectedAccountPublicKeyHash: getPublicKeyHash(newAccount, getSelectedNetworkType(state)),
      accountsTokens: updateAccountsTokensState(state, newAccount)
    }))
    .addCase(createHdAccountForNewNetworkTypeAction, (state, { payload: newAccount }) => {
      const accountsWithoutCurrent = state.accounts.filter(account => account.accountIndex !== newAccount.accountIndex);

      return {
        ...state,
        accounts: [...accountsWithoutCurrent, newAccount].sort((a, b) => a.accountIndex - b.accountIndex),
        selectedAccountPublicKeyHash: getPublicKeyHash(newAccount, getSelectedNetworkType(state)),
        accountsTokens: updateAccountsTokensState(state, newAccount)
      };
    })
    .addCase(setSelectedAccountAction, (state, { payload: selectedAccountPublicKeyHash }) => ({
      ...state,
      selectedAccountPublicKeyHash
    }))
    .addCase(editAccountNameAction, (state, { payload: account }) => ({
      ...state,
      accounts: state.accounts.map(currentAccount => {
        if (currentAccount.accountIndex === account.accountIndex) {
          return { ...currentAccount, name: account.name };
        }

        return currentAccount;
      })
    }));
  builder
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
    );
  builder
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
    .addCase(changeTokenVisibilityAction, (state, { payload: token }) => {
      const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkRpcUrl, state.selectedAccountPublicKeyHash);
      const updatedAccountTokens = state.accountsTokens[accountTokensSlug].map(accountToken =>
        accountToken.tokenAddress === token.tokenAddress
          ? { ...accountToken, isVisible: !accountToken.isVisible }
          : accountToken
      );

      return { ...state, accountsTokens: { ...state.accountsTokens, [accountTokensSlug]: updatedAccountTokens } };
    });

  builder.addCase(changeAccountAction, (state, { payload: account }) => ({
    ...state,
    selectedAccountPublicKeyHash: getPublicKeyHash(account, getSelectedNetworkType(state))
  }));

  builder.addCase(addNewNetworkAction, (state, { payload: newNetwork }) => {
    const prevNetworkType = getSelectedNetworkType(state);
    const selectedAccount = getSelectedAccount(state, prevNetworkType);
    const networks = [...state.networks, newNetwork];

    return {
      ...state,
      networks,
      selectedNetworkRpcUrl: newNetwork.rpcUrl,
      selectedAccountPublicKeyHash: getPublicKeyHash(selectedAccount, newNetwork.networkType),
      accountsTokens: updateAccountsTokensState(
        { ...state, networks, selectedNetworkRpcUrl: newNetwork.rpcUrl },
        selectedAccount
      )
    };
  });
  builder.addCase(editNetworkAction, (state, { payload: { network: newNetwork, isNetworkSelected, prevRpcUrl } }) => {
    const prevNetworkType = getSelectedNetworkType(state);
    const selectedAccount = getSelectedAccount(state, prevNetworkType);

    let networks: NetworkInterface[] = [];

    if (isNetworkSelected) {
      const currentNetwork = state.networks.find(network => network.rpcUrl === newNetwork.rpcUrl);

      if (currentNetwork) {
        networks = state.networks.map(network => {
          if (network.rpcUrl === currentNetwork.rpcUrl) {
            return currentNetwork;
          }

          return network;
        });
      }

      networks = state.networks.map(network => {
        if (network.rpcUrl === state.selectedNetworkRpcUrl) {
          return newNetwork;
        }

        return network;
      });
    } else if (isDefined(prevRpcUrl)) {
      networks = state.networks.map(network => {
        if (network.rpcUrl === prevRpcUrl) {
          return newNetwork;
        }

        return network;
      });
    }

    return {
      ...state,
      networks,
      selectedNetworkRpcUrl: isNetworkSelected ? newNetwork.rpcUrl : state.selectedNetworkRpcUrl,
      selectedAccountPublicKeyHash: getPublicKeyHash(selectedAccount, newNetwork.networkType),
      accountsTokens: updateAccountsTokensState(
        { ...state, networks, selectedNetworkRpcUrl: newNetwork.rpcUrl },
        selectedAccount
      )
    };
  });
  builder.addCase(removeNetworkAction, (state, { payload: rpcUrl }) => {
    const prevNetworkType = getSelectedNetworkType(state);
    const selectedAccount = getSelectedAccount(state, prevNetworkType);
    const networks = state.networks.filter(network => network.rpcUrl !== rpcUrl);
    const newNetwork = networks[0];

    return {
      ...state,
      networks,
      selectedNetworkRpcUrl: newNetwork.rpcUrl,
      selectedAccountPublicKeyHash: getPublicKeyHash(selectedAccount, newNetwork.networkType),
      accountsTokens: updateAccountsTokensState(
        { ...state, networks, selectedNetworkRpcUrl: newNetwork.rpcUrl },
        selectedAccount
      )
    };
  });
  builder.addCase(changeNetworkAction, (state, { payload: selectedNetworkRpcUrl }) => {
    const prevNetworkType = getSelectedNetworkType(state);
    const newNetworkType = getSelectedNetworkType({ ...state, selectedNetworkRpcUrl });
    const selectedAccount = getSelectedAccount(state, prevNetworkType);

    return {
      ...state,
      selectedNetworkRpcUrl,
      selectedAccountPublicKeyHash: getPublicKeyHash(selectedAccount, newNetworkType),
      accountsTokens: updateAccountsTokensState({ ...state, selectedNetworkRpcUrl }, selectedAccount)
    };
  });
  builder.addCase(addTransactionAction, (state, { payload: transaction }) => {
    const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkRpcUrl, state.selectedAccountPublicKeyHash);
    const updatedTransactions =
      state.transactions[accountTokensSlug] !== undefined
        ? [...state.transactions[accountTokensSlug], { ...transaction, status: TransactionStatusEnum.pending }]
        : [{ ...transaction, status: TransactionStatusEnum.pending }];

    return {
      ...state,
      transactions: {
        ...state.transactions,
        [accountTokensSlug]: updatedTransactions
      }
    };
  });
  builder.addCase(updateTransactionAction, (state, { payload: transaction }) => {
    const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkRpcUrl, state.selectedAccountPublicKeyHash);
    const updatedAccountTransactions = state.transactions[accountTokensSlug].map(tx =>
      tx.transactionHash === transaction.transactionHash ? transaction : tx
    );

    return { ...state, transactions: { ...state.transactions, [accountTokensSlug]: updatedAccountTransactions } };
  });
});
