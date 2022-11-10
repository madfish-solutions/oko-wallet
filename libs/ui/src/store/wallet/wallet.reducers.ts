import { createReducer } from '@reduxjs/toolkit';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';

import { TransactionStatusEnum } from '../../enums/transactions.enum';
import { AccountToken } from '../../interfaces/account-token.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { TokenMetadata } from '../../interfaces/token-metadata.interface';
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
  setConfirmedDappAction,
  editNetworkAction,
  removeNetworkAction,
  editTokenAction,
  sortAccountTokensByVisibility,
  addNewTokensAction,
  getAllUserNftAction,
  deleteConfirmedDappAction,
  addNewCollectibleAction,
  changeAccountVisibilityAction
} from './wallet.actions';
import { walletInitialState, WalletState } from './wallet.state';
import {
  getPublicKeyHash,
  getSelectedAccount,
  getSelectedNetworkType,
  updateAccountsGasTokensState,
  updateAccountsTokensState,
  updateAccountTokenState
} from './wallet.utils';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder
    .addCase(createHdAccountAction, (state, { payload: newAccount }) => ({
      ...state,
      accounts: [...state.accounts, newAccount].sort((a, b) => a.accountId - b.accountId),
      selectedAccountPublicKeyHash: getPublicKeyHash(newAccount, getSelectedNetworkType(state)),
      accountsTokens: updateAccountsTokensState(state, newAccount)
    }))
    .addCase(
      createHdAccountForNewNetworkTypeAction,
      (state, { payload: { account: newAccount, switchToNewAccount } }) => {
        const accountsWithoutCurrent = getAllAccountsWithoutCurrent(state.accounts, newAccount);

        return {
          ...state,
          accounts: [...accountsWithoutCurrent, newAccount].sort((a, b) => a.accountId - b.accountId),
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
        if (currentAccount.accountId === account.accountId) {
          return { ...currentAccount, name: account.name };
        }

        return currentAccount;
      })
    }))
    .addCase(changeAccountVisibilityAction, (state, { payload: accountId }) => ({
      ...state,
      accounts: state.accounts.map(currentAccount => {
        if (currentAccount.accountId === accountId) {
          return { ...currentAccount, isVisible: !currentAccount.isVisible };
        }

        return currentAccount;
      })
    }));
  builder
    .addCase(loadGasTokenBalanceAction.submit, state => updateAccountsGasTokensState(state, { isLoading: true }))
    .addCase(loadGasTokenBalanceAction.success, (state, { payload: balance }) =>
      updateAccountsGasTokensState(state, { balance })
    )
    .addCase(loadGasTokenBalanceAction.fail, (state, { payload: error }) =>
      updateAccountsGasTokensState(state, { error })
    );
  builder
    .addCase(loadAccountTokenBalanceAction.success, (state, { payload: { token } }) => {
      const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkRpcUrl, state.selectedAccountPublicKeyHash);
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
      const { selectedAccountPublicKeyHash, selectedNetworkRpcUrl } = state;
      const { tokenAddress, tokenId, ...tokenMetadata } = newToken;
      const tokenMetadataSlug = getTokenMetadataSlug(selectedNetworkRpcUrl, tokenAddress, tokenId);
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

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

      const { selectedAccountPublicKeyHash, selectedNetworkRpcUrl } = state;
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);
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
        const tokenMetadataSlug = getTokenMetadataSlug(selectedNetworkRpcUrl, token.id);

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
    .addCase(getAllUserNftAction.success, (state, { payload: { nftList } }) => {
      const { selectedAccountPublicKeyHash, selectedNetworkRpcUrl } = state;
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      const stateAccountTokens = state.accountsTokens[accountTokensSlug];

      const accountTokens = nftList.reduce((acc, nft) => {
        const currentTokenExist = stateAccountTokens.find(
          token => getTokenSlug(nft.contract_id, nft.inner_id) === getTokenSlug(token.tokenAddress, token.tokenId)
        );

        if (!isDefined(currentTokenExist)) {
          acc.push({
            tokenAddress: nft.contract_id,
            tokenId: nft.inner_id,
            isVisible: true,
            balance: createEntity(nft.amount.toString())
          });
        }

        return acc;
      }, [] as AccountToken[]);

      const tokensMetadata = nftList.reduce((acc, nft) => {
        const tokenMetadataSlug = getTokenMetadataSlug(selectedNetworkRpcUrl, nft.contract_id, nft.inner_id);

        const currentAcc: Record<string, Omit<TokenMetadata, 'symbol'>> = { ...acc };

        if (!isDefined(state.tokensMetadata[tokenMetadataSlug])) {
          currentAcc[tokenMetadataSlug] = {
            name: isNotEmptyString(nft.name) ? nft.name : 'Unnamed NFT',
            collectionId: nft.collection_id,
            contractName: isNotEmptyString(nft.contract_name) ? nft.contract_name : 'Unnamed Collection',
            decimals: 0,
            artifactUri: nft.thumbnail_url
          };
        }

        return currentAcc;
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
    .addCase(addNewCollectibleAction, (state, { payload: newCollectible }) => {
      const { selectedAccountPublicKeyHash, selectedNetworkRpcUrl } = state;
      const { tokenAddress, tokenId, ...tokenMetadata } = newCollectible;
      const tokenMetadataSlug = getTokenMetadataSlug(selectedNetworkRpcUrl, tokenAddress, tokenId);
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

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
    .addCase(editTokenAction, (state, { payload }) => {
      const { tokenAddress, tokenId, decimals, ...metadata } = payload;
      const tokenMetadataSlug = getTokenMetadataSlug(state.selectedNetworkRpcUrl, tokenAddress, tokenId);

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
      const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkRpcUrl, state.selectedAccountPublicKeyHash);
      const updatedAccountTokens = state.accountsTokens[accountTokensSlug].map(accountToken =>
        getTokenSlug(accountToken.tokenAddress, accountToken.tokenId) ===
        getTokenSlug(token.tokenAddress, token.tokenId)
          ? { ...accountToken, isVisible: !accountToken.isVisible }
          : accountToken
      );

      return { ...state, accountsTokens: { ...state.accountsTokens, [accountTokensSlug]: updatedAccountTokens } };
    })
    .addCase(sortAccountTokensByVisibility, state => {
      const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkRpcUrl, state.selectedAccountPublicKeyHash);
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

    return {
      ...state,
      networks,
      selectedNetworkRpcUrl,
      selectedAccountPublicKeyHash: getPublicKeyHash(selectedAccount, newNetwork.networkType),
      accountsTokens: updateAccountsTokensState({ ...state, networks, selectedNetworkRpcUrl }, selectedAccount)
    };
  });
  builder.addCase(editNetworkAction, (state, { payload: { network: editedNetwork, isNetworkSelected } }) => {
    const prevNetworkType = getSelectedNetworkType(state);
    const selectedAccount = getSelectedAccount(state, prevNetworkType);
    const selectedNetworkRpcUrl = isNetworkSelected ? editedNetwork.rpcUrl : state.selectedNetworkRpcUrl;

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
      selectedAccountPublicKeyHash: getPublicKeyHash(
        selectedAccount,
        isNetworkSelected ? editedNetwork.networkType : prevNetworkType
      ),
      accountsTokens: updateAccountsTokensState(
        {
          ...state,
          networks,
          selectedNetworkRpcUrl
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

    return {
      ...state,
      networks,
      selectedNetworkRpcUrl,
      selectedAccountPublicKeyHash: getPublicKeyHash(
        selectedAccount,
        isNetworkSelected ? networks[0].networkType : prevNetworkType
      ),
      accountsTokens: updateAccountsTokensState(
        {
          ...state,
          networks,
          selectedNetworkRpcUrl
        },
        selectedAccount
      )
    };
  });
  builder.addCase(changeNetworkAction, (state, { payload: selectedNetworkRpcUrl }) => {
    const prevNetworkType = getSelectedNetworkType(state);
    const newNetworkType = getSelectedNetworkType({ ...state, selectedNetworkRpcUrl });
    const selectedAccount = getSelectedAccount(state, prevNetworkType);
    const selectedAccountPublicKeyHash = getPublicKeyHash(selectedAccount, newNetworkType);
    const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);
    const isTokensForNetworkExist: boolean = isDefined(state.accountsTokens[accountTokensSlug]);

    return {
      ...state,
      selectedNetworkRpcUrl,
      selectedAccountPublicKeyHash,
      ...(!isTokensForNetworkExist &&
        isNotEmptyString(selectedAccountPublicKeyHash) && {
          accountsTokens: updateAccountsTokensState({ ...state, selectedNetworkRpcUrl }, selectedAccount)
        })
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
  builder.addCase(setConfirmedDappAction, (state, { payload: { dappName, id } }) => {
    const dappSlug = getAccountTokensSlug(dappName, state.selectedAccountPublicKeyHash);

    return {
      ...state,
      confirmedEVMDappConnection: {
        ...state.confirmedEVMDappConnection,
        [dappSlug]: { dappName, id }
      }
    };
  });
  builder.addCase(deleteConfirmedDappAction, (state, { payload: dappName }) => {
    const newConfirmedDapp = { ...state.confirmedEVMDappConnection };
    const dappSlug = getAccountTokensSlug(dappName, state.selectedAccountPublicKeyHash);
    delete newConfirmedDapp[dappSlug];

    return {
      ...state,
      confirmedEVMDappConnection: newConfirmedDapp
    };
  });
});
