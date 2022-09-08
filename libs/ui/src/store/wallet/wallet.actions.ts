import { createAction } from '@reduxjs/toolkit';

import { TokenListResponse } from '../../api/types';
import { AccountInterface, PendingTransaction, Transaction } from '../../interfaces/account.interface';
import { DappConnectionInfo } from '../../interfaces/dapp-connection.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';
import { AccountTokenInput } from '../../interfaces/token-input.interface';
import { Token } from '../../interfaces/token.interface';
import { TokenFormTypes } from '../../modals/screens/token/types/form-types.interface';
import { createActions } from '../utils/action.utils';

export const createHdAccountAction = createAction<AccountInterface>('wallet/CREATE_HD_ACCOUNT');
export const createHdAccountForNewNetworkTypeAction = createAction<{
  account: AccountInterface;
  switchToNewAccount: boolean;
}>('wallet/CREATE_HD_ACCOUNT_WITH_OTHER_NETWORK_TYPE');
export const changeAccountAction = createAction<AccountInterface>('wallet/CHANGE_ACCOUNT');
export const setSelectedAccountAction = createAction<string>('wallet/SET_SELECTED_ACCOUNT');
export const editAccountNameAction = createAction<{ accountIndex: AccountInterface['accountIndex']; name: string }>(
  'wallet/EDIT_ACCOUNT_NAME'
);

export const loadGasTokenBalanceAction = createActions<void, string, string>('wallet/LOAD_GAS_TOKEN_BALANCE');
export const loadAccountTokenBalanceAction = createActions<
  { token: Token },
  { token: Token },
  { token: Token; error: string }
>('wallet/LOAD_TOKEN_BALANCE');

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

export const addNewTokenAction = createAction<AccountTokenInput>('wallet/ADD_NEW_TOKEN');
export const addNewTokensAction = createActions<
  { debankId: string; publicKeyHash: string },
  { tokenList: TokenListResponse; debankGasTokenName: string }
>('wallet/ADD_NEW_TOKENS');
export const editTokenAction = createAction<TokenFormTypes>('wallet/EDIT_TOKEN');
export const changeTokenVisibilityAction = createAction<Token>('wallet/CHANGE_TOKEN_VISIBILITY');
export const sortAccountTokensByVisibility = createAction('wallet/SORT_ACCOUNT_TOKENS_BY_VISIBILITY');

export const sendAssetAction = createActions<SendAssetPayload>('wallet/SEND_ASSET');

export const addTransactionAction = createAction<PendingTransaction>('wallet/ADD_TRANSACTION');
export const updateTransactionAction = createAction<Transaction>('wallet/CHANGE_TRANSACTION_STATUS');

export const setConfirmedDapp = createAction<DappConnectionInfo>('wallet/SET_CONFIRMED_DAPP');
