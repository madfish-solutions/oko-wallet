import { createReducer } from '@reduxjs/toolkit';
import { isDefined } from '@rnw-community/shared';

import { TransactionStatusEnum } from '../../enums/transactions.enum';
import { AccountToken } from '../../interfaces/account-token.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { getAccountTokensSlug } from '../../utils/address.util';
import { getAllAccountsWithoutCurrent } from '../../utils/get-all-accounts-without-current.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { getTokenSlug } from '../../utils/token.utils';
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
  addNewTokenAction,
  changeTokenVisibilityAction,
  loadAccountTokenBalanceAction,
  updateTransactionAction,
  addTransactionAction,
  editNetworkAction,
  removeNetworkAction,
  editTokenAction,
  sortAccountTokensByVisibility,
  addNewTokensAction
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
    .addCase(
      createHdAccountForNewNetworkTypeAction,
      (state, { payload: { account: newAccount, switchToNewAccount } }) => {
        const accountsWithoutCurrent = getAllAccountsWithoutCurrent(state.accounts, newAccount);

        return {
          ...state,
          accounts: [...accountsWithoutCurrent, newAccount].sort((a, b) => a.accountIndex - b.accountIndex),
          accountsTokens: updateAccountsTokensState(state, newAccount),
          ...(switchToNewAccount && {
            selectedAccountPublicKeyHash: getPublicKeyHash(newAccount, getSelectedNetworkType(state))
          })
        };
      }
    )
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
        gasTokenBalance: {
          ...selectedNetwork.gasTokenBalance,
          [state.selectedAccountPublicKeyHash]: createEntity(
            selectedNetwork.gasTokenBalance[state.selectedAccountPublicKeyHash]?.data ?? '0',
            true
          )
        }
      }))
    )
    .addCase(loadGasTokenBalanceAction.success, (state, { payload }) =>
      updateSelectedNetworkState(state, selectedNetwork => ({
        gasTokenBalance: {
          ...selectedNetwork.gasTokenBalance,
          [state.selectedAccountPublicKeyHash]: createEntity(payload, false)
        }
      }))
    )
    .addCase(loadGasTokenBalanceAction.fail, (state, { payload: error }) =>
      updateSelectedNetworkState(state, selectedNetwork => ({
        gasTokenBalance: {
          ...selectedNetwork.gasTokenBalance,
          [state.selectedAccountPublicKeyHash]: createEntity(
            selectedNetwork.gasTokenBalance[state.selectedAccountPublicKeyHash]?.data ?? '0',
            false,
            error
          )
        }
      }))
    );
  builder
    .addCase(loadAccountTokenBalanceAction.success, (state, { payload: { token } }) => {
      const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkChainId, state.selectedAccountPublicKeyHash);
      const currentToken = state.accountsTokens[accountTokensSlug]?.find(
        accountToken =>
          getTokenSlug(accountToken.tokenAddress, accountToken.tokenId) ===
          getTokenSlug(token.tokenAddress, token.tokenId)
      );

      return updateAccountTokenState(state, token, () => ({ ...currentToken, balance: token.balance }));
    })
    .addCase(loadAccountTokenBalanceAction.fail, (state, { payload: { token, error } }) =>
      updateAccountTokenState(state, token, accountToken => ({
        balance: createEntity(accountToken.balance.data, false, error)
      }))
    )
    .addCase(addNewTokenAction, (state, { payload: newToken }) => {
      const { selectedAccountPublicKeyHash, selectedNetworkChainId } = state;
      const { tokenAddress, tokenId, ...tokenMetadata } = newToken;
      const tokenMetadataSlug = getTokenMetadataSlug(selectedNetworkChainId, tokenAddress, tokenId);
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkChainId, selectedAccountPublicKeyHash);

      const prevAccountTokens = isDefined(state.accountsTokens[accountTokensSlug])
        ? state.accountsTokens[accountTokensSlug]
        : [];

      return {
        ...state,
        tokensMetadata: {
          ...state.tokensMetadata,
          [tokenMetadataSlug]: tokenMetadata
        },
        accountsTokens: {
          ...state.accountsTokens,
          [accountTokensSlug]: [
            ...prevAccountTokens,
            {
              tokenId,
              tokenAddress,
              isVisible: true,
              balance: createEntity('0')
            }
          ]
        }
      };
    })
    .addCase(addNewTokensAction.success, (state, { payload: { tokenList, debankGasTokenName } }) => {
      if (!tokenList.length) {
        return state;
      }

      const { selectedAccountPublicKeyHash, selectedNetworkChainId } = state;
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkChainId, selectedAccountPublicKeyHash);
      const defaultAccountTokens = { [debankGasTokenName]: true };
      const prevAccountTokens: Record<string, boolean> =
        state.accountsTokens[accountTokensSlug]?.reduce(
          (acc, accountToken) => ({ ...acc, [accountToken.tokenAddress]: true }),
          defaultAccountTokens
        ) ?? defaultAccountTokens;

      const newTokens = tokenList.filter(token => !prevAccountTokens[token.id]);

      const accountTokens: AccountToken[] = newTokens.map(token => ({
        tokenAddress: token.id,
        name: token.name,
        symbol: token.symbol,
        isVisible: true,
        balance: createEntity(token.raw_amount.toString())
      }));
      const tokensMetadata = newTokens.reduce((acc, token) => {
        const tokenMetadataSlug = getTokenMetadataSlug(selectedNetworkChainId, token.id);

        if (isDefined(state.tokensMetadata[tokenMetadataSlug])) {
          return { ...acc };
        }

        return {
          ...acc,
          [tokenMetadataSlug]: {
            name: token.name,
            symbol: token.symbol,
            decimals: token.decimals,
            thumbnailUri: token.logo_url
          }
        };
      }, {});

      return {
        ...state,
        accountsTokens: {
          ...state.accountsTokens,
          [accountTokensSlug]: [...(state.accountsTokens[accountTokensSlug] ?? []), ...accountTokens]
        },
        tokensMetadata: {
          ...state.tokensMetadata,
          ...tokensMetadata
        }
      };
    })
    .addCase(editTokenAction, (state, { payload }) => {
      const { tokenAddress, tokenId, decimals, ...metadata } = payload;
      const tokenMetadataSlug = getTokenMetadataSlug(state.selectedNetworkChainId, tokenAddress, tokenId);

      return {
        ...state,
        tokensMetadata: {
          ...state.tokensMetadata,
          [tokenMetadataSlug]: {
            ...state.tokensMetadata[tokenMetadataSlug],
            ...metadata,
            decimals: Number(decimals)
          }
        }
      };
    })
    .addCase(changeTokenVisibilityAction, (state, { payload: token }) => {
      const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkChainId, state.selectedAccountPublicKeyHash);
      const updatedAccountTokens = state.accountsTokens[accountTokensSlug].map(accountToken =>
        getTokenSlug(accountToken.tokenAddress, accountToken.tokenId) ===
        getTokenSlug(token.tokenAddress, token.tokenId)
          ? { ...accountToken, isVisible: !accountToken.isVisible }
          : accountToken
      );

      return { ...state, accountsTokens: { ...state.accountsTokens, [accountTokensSlug]: updatedAccountTokens } };
    })
    .addCase(sortAccountTokensByVisibility, state => {
      const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkChainId, state.selectedAccountPublicKeyHash);
      const accountTokens = state.accountsTokens[accountTokensSlug];

      if (Array.isArray(accountTokens)) {
        const updatedAccountTokens = accountTokens.slice().sort((a, b) => Number(b.isVisible) - Number(a.isVisible));

        return { ...state, accountsTokens: { ...state.accountsTokens, [accountTokensSlug]: updatedAccountTokens } };
      }

      return state;
    });
  builder.addCase(changeAccountAction, (state, { payload: account }) => ({
    ...state,
    selectedAccountPublicKeyHash: getPublicKeyHash(account, getSelectedNetworkType(state))
  }));

  builder.addCase(addNewNetworkAction, (state, { payload: newNetwork }) => {
    const prevNetworkType = getSelectedNetworkType(state);
    const selectedAccount = getSelectedAccount(state, prevNetworkType);
    const networks = [...state.networks, newNetwork];
    const selectedNetworkRpcUrl = newNetwork.rpcUrl;
    const selectedNetworkChainId = newNetwork.chainId;

    return {
      ...state,
      networks,
      selectedNetworkRpcUrl,
      selectedNetworkChainId,
      selectedAccountPublicKeyHash: getPublicKeyHash(selectedAccount, newNetwork.networkType),
      accountsTokens: updateAccountsTokensState(
        { ...state, networks, selectedNetworkRpcUrl, selectedNetworkChainId },
        selectedAccount
      )
    };
  });
  builder.addCase(editNetworkAction, (state, { payload: { network: editedNetwork, isNetworkSelected } }) => {
    const prevNetworkType = getSelectedNetworkType(state);
    const selectedAccount = getSelectedAccount(state, prevNetworkType);
    const selectedNetworkRpcUrl = isNetworkSelected ? editedNetwork.rpcUrl : state.selectedNetworkRpcUrl;
    const selectedNetworkChainId = isNetworkSelected ? editedNetwork.chainId : state.selectedNetworkChainId;

    const networks: NetworkInterface[] = state.networks.map(network => {
      if (network.rpcUrl === editedNetwork.rpcUrl) {
        return editedNetwork;
      }

      return network;
    });

    return {
      ...state,
      networks,
      selectedNetworkRpcUrl,
      selectedNetworkChainId,
      selectedAccountPublicKeyHash: getPublicKeyHash(
        selectedAccount,
        isNetworkSelected ? editedNetwork.networkType : prevNetworkType
      ),
      accountsTokens: updateAccountsTokensState(
        {
          ...state,
          networks,
          selectedNetworkRpcUrl,
          selectedNetworkChainId
        },
        selectedAccount
      )
    };
  });
  builder.addCase(removeNetworkAction, (state, { payload: { network: editedNetwork, isNetworkSelected } }) => {
    const prevNetworkType = getSelectedNetworkType(state);
    const selectedAccount = getSelectedAccount(state, prevNetworkType);
    const networks = state.networks.filter(network => network.rpcUrl !== editedNetwork.rpcUrl);
    const selectedNetworkRpcUrl = isNetworkSelected ? networks[0].rpcUrl : state.selectedNetworkRpcUrl;
    const selectedNetworkChainId = isNetworkSelected ? networks[0].chainId : state.selectedNetworkChainId;

    return {
      ...state,
      networks,
      selectedNetworkRpcUrl,
      selectedNetworkChainId,
      selectedAccountPublicKeyHash: getPublicKeyHash(
        selectedAccount,
        isNetworkSelected ? networks[0].networkType : prevNetworkType
      ),
      accountsTokens: updateAccountsTokensState(
        {
          ...state,
          networks,
          selectedNetworkRpcUrl,
          selectedNetworkChainId
        },
        selectedAccount
      )
    };
  });
  builder.addCase(
    changeNetworkAction,
    (state, { payload: { rpcUrl: selectedNetworkRpcUrl, chainId: selectedNetworkChainId } }) => {
      const prevNetworkType = getSelectedNetworkType(state);
      const newNetworkType = getSelectedNetworkType({ ...state, selectedNetworkRpcUrl });
      const selectedAccount = getSelectedAccount(state, prevNetworkType);
      const selectedAccountPublicKeyHash = getPublicKeyHash(selectedAccount, newNetworkType);
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkChainId, selectedAccountPublicKeyHash);
      const isTokensForNetworkExist: boolean = isDefined(state.accountsTokens[accountTokensSlug]);

      return {
        ...state,
        selectedNetworkRpcUrl,
        selectedNetworkChainId,
        selectedAccountPublicKeyHash,
        ...(!isTokensForNetworkExist && {
          accountsTokens: updateAccountsTokensState({ ...state, selectedNetworkRpcUrl }, selectedAccount)
        })
      };
    }
  );
  builder.addCase(addTransactionAction, (state, { payload: transaction }) => {
    const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkChainId, state.selectedAccountPublicKeyHash);
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
    const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkChainId, state.selectedAccountPublicKeyHash);
    const updatedAccountTransactions = state.transactions[accountTokensSlug].map(tx =>
      tx.transactionHash === transaction.transactionHash ? transaction : tx
    );

    return { ...state, transactions: { ...state.transactions, [accountTokensSlug]: updatedAccountTransactions } };
  });
});
