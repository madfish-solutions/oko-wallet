import { createReducer } from '@reduxjs/toolkit';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';

import { TokenStandardEnum } from '../../enums/token-standard.enum';
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
  addNewCollectibleAction,
  addNewNetworkAction,
  addNewTokenAction,
  addTransactionAction,
  changeAccountAction,
  changeAccountVisibilityAction,
  changeNetworkAction,
  changeTokenVisibilityAction,
  createHdAccountAction,
  createHdAccountForNewNetworkTypeAction,
  deleteConfirmedDappAction,
  editAccountNameAction,
  editNetworkAction,
  editTokenAction,
  getAllUserNftAction,
  loadAccountTokenBalanceAction,
  loadGasTokenBalanceAction,
  removeNetworkAction,
  setConfirmedDappAction,
  setSelectedAccountAction,
  sortAccountTokensByVisibility,
  deleteTransactionAction,
  deleteCollectibleAction,
  getAllUserTokensAction
} from './wallet.actions';
import { walletInitialState, WalletState } from './wallet.state';
import {
  getPublicKeyHash,
  getSelectedAccount,
  getSelectedNetworkChainId,
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
      const chainId = getSelectedNetworkChainId(state);
      const accountTokensSlug = getAccountTokensSlug(chainId, state.selectedAccountPublicKeyHash);
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
      const { selectedAccountPublicKeyHash } = state;
      const { tokenAddress, tokenId, ...tokenMetadata } = newToken;
      const chainId = getSelectedNetworkChainId(state);
      const tokenMetadataSlug = getTokenMetadataSlug(chainId, tokenAddress, tokenId);
      const accountTokensSlug = getAccountTokensSlug(chainId, selectedAccountPublicKeyHash);

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
    .addCase(getAllUserTokensAction.success, (state, { payload: { tokenList, debankGasTokenName } }) => {
      if (!tokenList.length) {
        return state;
      }

      const { selectedAccountPublicKeyHash } = state;
      const chainId = getSelectedNetworkChainId(state);
      const accountTokensSlug = getAccountTokensSlug(chainId, selectedAccountPublicKeyHash);

      const stateAccountsTokens: AccountToken[] = [...state.accountsTokens[accountTokensSlug]];

      const tokensWithBalance: AccountToken[] = tokenList
        .map(token => ({
          tokenAddress: token.id,
          isVisible: true,
          balance: createEntity(token.raw_amount.toString())
        }))
        .filter(token => token.tokenAddress !== debankGasTokenName);

      const gasTokenBalance = tokenList.find(token => token.id === debankGasTokenName)?.raw_amount ?? 0;

      const prevAccountTokensWithoutBalance: AccountToken[] = stateAccountsTokens.filter(token => {
        const updatedToken = tokensWithBalance.find(
          tokenWithBalance =>
            getTokenSlug(tokenWithBalance.tokenAddress, tokenWithBalance.tokenId) ===
            getTokenSlug(token.tokenAddress, token.tokenId)
        );

        if (!isDefined(updatedToken) && token.tokenAddress !== debankGasTokenName) {
          return { ...token };
        }
      });

      const prevAccountAssets: Record<string, boolean> =
        stateAccountsTokens.reduce((acc, accountToken) => ({ ...acc, [accountToken.tokenAddress]: true }), {}) ?? {};

      const newTokens = tokenList.filter(token => !prevAccountAssets[token.id]);

      const tokensMetadata = newTokens.reduce((acc, token) => {
        const tokenMetadataSlug = getTokenMetadataSlug(chainId, token.id);

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
        ...updateAccountsGasTokensState(state, { balance: gasTokenBalance.toString() }),
        accountsTokens: {
          ...state.accountsTokens,
          [accountTokensSlug]: [...prevAccountTokensWithoutBalance, ...tokensWithBalance]
        },
        tokensMetadata: {
          ...state.tokensMetadata,
          ...tokensMetadata
        }
      };
    })
    .addCase(getAllUserNftAction.success, (state, { payload: { nftList } }) => {
      const { selectedAccountPublicKeyHash } = state;
      const chainId = getSelectedNetworkChainId(state);
      const accountTokensSlug = getAccountTokensSlug(chainId, selectedAccountPublicKeyHash);

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
        const tokenMetadataSlug = getTokenMetadataSlug(chainId, nft.contract_id, nft.inner_id);

        const currentAcc: Record<string, Omit<TokenMetadata, 'symbol'>> = { ...acc };

        if (!isDefined(state.tokensMetadata[tokenMetadataSlug])) {
          const standard = nft.is_erc721
            ? TokenStandardEnum.ERC721
            : nft.is_erc1155
            ? TokenStandardEnum.ERC1155
            : undefined;

          currentAcc[tokenMetadataSlug] = {
            name: isNotEmptyString(nft.name) ? nft.name : 'Unnamed NFT',
            collectionId: nft.collection_id,
            contractName: isNotEmptyString(nft.contract_name) ? nft.contract_name : 'Unnamed Collection',
            decimals: 0,
            artifactUri: nft.thumbnail_url,
            ...(isDefined(standard) && { standard })
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
    .addCase(addNewCollectibleAction, (state, { payload }) => {
      const { selectedAccountPublicKeyHash } = state;
      const { tokenAddress, tokenId, ...tokenMetadata } = payload.token;
      const chainId = getSelectedNetworkChainId(state);
      const tokenMetadataSlug = getTokenMetadataSlug(chainId, tokenAddress, tokenId);
      const accountTokensSlug = getAccountTokensSlug(chainId, selectedAccountPublicKeyHash);

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
              balance: createEntity(payload.balance)
            }
          ]
        }
      };
    })
    .addCase(deleteCollectibleAction, (state, { payload: collectible }) => {
      const { tokensMetadata, accountsTokens, selectedAccountPublicKeyHash } = state;
      const chainId = getSelectedNetworkChainId(state);

      const accountTokensSlug = getAccountTokensSlug(chainId, selectedAccountPublicKeyHash);
      const collectibleMetadataSlug = getTokenMetadataSlug(chainId, collectible.tokenAddress, collectible.tokenId);
      const filteredAccountTokens = accountsTokens[accountTokensSlug].filter(
        ({ tokenAddress, tokenId }) => getTokenMetadataSlug(chainId, tokenAddress, tokenId) !== collectibleMetadataSlug
      );

      const copiedMetadata = { ...tokensMetadata };
      delete copiedMetadata[collectibleMetadataSlug];

      return {
        ...state,
        accountsTokens: {
          ...state.accountsTokens,
          [accountTokensSlug]: filteredAccountTokens
        },
        tokensMetadata: copiedMetadata
      };
    })
    .addCase(editTokenAction, (state, { payload }) => {
      const { tokenAddress, tokenId, decimals, ...metadata } = payload;
      const chainId = getSelectedNetworkChainId(state);
      const tokenMetadataSlug = getTokenMetadataSlug(chainId, tokenAddress, tokenId);

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
      const chainId = getSelectedNetworkChainId(state);
      const accountTokensSlug = getAccountTokensSlug(chainId, state.selectedAccountPublicKeyHash);
      const updatedAccountTokens = state.accountsTokens[accountTokensSlug].map(accountToken =>
        getTokenSlug(accountToken.tokenAddress, accountToken.tokenId) ===
        getTokenSlug(token.tokenAddress, token.tokenId)
          ? { ...accountToken, isVisible: !accountToken.isVisible }
          : accountToken
      );

      return { ...state, accountsTokens: { ...state.accountsTokens, [accountTokensSlug]: updatedAccountTokens } };
    })
    .addCase(sortAccountTokensByVisibility, state => {
      const chainId = getSelectedNetworkChainId(state);
      const accountTokensSlug = getAccountTokensSlug(chainId, state.selectedAccountPublicKeyHash);
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
    const chainId = getSelectedNetworkChainId({ ...state, selectedNetworkRpcUrl });
    const accountTokensSlug = getAccountTokensSlug(chainId, selectedAccountPublicKeyHash);
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
    const chainId = getSelectedNetworkChainId(state);
    const accountTokensSlug = getAccountTokensSlug(chainId, state.selectedAccountPublicKeyHash);
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
  builder.addCase(deleteTransactionAction, (state, { payload: transactionHash }) => {
    const chainId = getSelectedNetworkChainId(state);
    const accountTokensSlug = getAccountTokensSlug(chainId, state.selectedAccountPublicKeyHash);
    const updatedAccountTransactions = state.transactions[accountTokensSlug].filter(
      currentTransaction => currentTransaction.transactionHash !== transactionHash
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
