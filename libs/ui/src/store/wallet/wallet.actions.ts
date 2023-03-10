import { createAction } from '@reduxjs/toolkit';
import { NftListResponse, TokenResponse } from 'backend-types';
import { AccountInterface } from 'shared';

import { DappConnectionInfo } from '../../interfaces/dapp-connection.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';
import { TokenExtendedMetadata } from '../../interfaces/token-extended-metadata.interface';
import { Token, TokenFormType } from '../../interfaces/token.interface';
import { PendingTransaction } from '../../interfaces/transaction.interfaces';
import { createActions } from '../utils/action.utils';

export const createHdAccountAction = createAction<AccountInterface>('wallet/CREATE_HD_ACCOUNT');
export const createHdAccountForNewNetworkTypeAction = createAction<{
  account: AccountInterface;
  switchToNewAccount: boolean;
}>('wallet/CREATE_HD_ACCOUNT_WITH_OTHER_NETWORK_TYPE');
export const changeAccountAction = createAction<AccountInterface>('wallet/CHANGE_ACCOUNT');
export const setSelectedAccountAction = createAction<string>('wallet/SET_SELECTED_ACCOUNT');
export const editAccountNameAction = createAction<{ accountId: AccountInterface['accountId']; name: string }>(
  'wallet/EDIT_ACCOUNT_NAME'
);
export const changeAccountVisibilityAction = createAction<AccountInterface['accountId']>(
  'wallet/CHANGE_ACCOUNT_VISIBILITY'
);

export const loadGasTokenBalanceAction = createActions<void, string, string>('wallet/LOAD_GAS_TOKEN_BALANCE');
export const loadAccountTokenBalanceAction = createActions<
  { token: Token; deleteZeroBalance?: boolean },
  { token: Token },
  { token: Token; error: string }
>('wallet/LOAD_ACCOUNT_TOKEN_BALANCE');

export const addNewNetworkAction = createAction<NetworkInterface>('wallet/ADD_NEW_NETWORK');
export const changeNetworkAction = createAction<string>('wallet/CHANGE_NETWORK');
export const editNetworkAction = createAction<{
  network: NetworkInterface;
  isNetworkSelected: boolean;
  prevRpcUrl?: string;
}>('wallet/EDIT_NETWORK');
export const removeNetworkAction = createAction<{ network: NetworkInterface; isNetworkSelected: boolean }>(
  'wallet/REMOVE_NETWORK'
);

export const addNewTokenAction = createAction<Token>('wallet/ADD_NEW_TOKEN');
export const getAllUserTokensAction = createActions<
  { debankId: string; publicKeyHash: string },
  { tokenList: TokenResponse[]; debankGasTokenName: string }
>('wallet/GET_ALL_USER_TOKENS');
export const addNewTokensMetadataAction = createActions<Token['tokenAddress'][], TokenFormType[]>(
  'wallet/ADD_NEW_TOKENS_METADATA'
);
export const editTokenAction = createAction<TokenFormType>('wallet/EDIT_TOKEN');
export const changeTokenVisibilityAction = createAction<Token>('wallet/CHANGE_TOKEN_VISIBILITY');
export const sortAccountTokensByVisibility = createAction('wallet/SORT_ACCOUNT_TOKENS_BY_VISIBILITY');

export const getAllUserNftAction = createActions<
  { debankId: string; publicKeyHash: string; is_all?: boolean },
  { nftList: NftListResponse[] }
>('wallet/GET_ALL_USER_NFT');
export const addNewCollectibleAction = createAction<{ token: TokenExtendedMetadata; balance: string }>(
  'wallet/ADD_NEW_COLLECTIBLE'
);
export const deleteCollectibleAction = createAction<Token>('wallet/DELETE_COLLECTIBLE');

export const sendAssetAction = createActions<SendAssetPayload>('wallet/SEND_ASSET');

export const addTransactionAction = createAction<PendingTransaction>('wallet/ADD_TRANSACTION');
export const deleteTransactionAction = createAction<string>('wallet/DELETE_TRANSACTION');

export const setConfirmedDappAction = createAction<DappConnectionInfo>('wallet/SET_CONFIRMED_DAPP');
export const deleteConfirmedDappAction = createAction<string>('wallet/DELETE_CONFIRMED_DAPP');
