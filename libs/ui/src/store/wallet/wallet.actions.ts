import { createAction } from '@reduxjs/toolkit';

import { AccountInterface, PendingTransaction, Transaction } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';
import { AccountTokenInput } from '../../interfaces/token-input.interface';
import { Token } from '../../interfaces/token.interface';
import { createActions } from '../utils/action.utils';

export const createHdAccountAction = createAction<AccountInterface>('wallet/CREATE_HD_ACCOUNT');
export const createHdAccountForNewNetworkTypeAction = createAction<AccountInterface>(
  'wallet/CREATE_HD_ACCOUNT_WITH_OTHER_NETWORK_TYPE'
);
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

export const addTokenMetadataAction = createAction<AccountTokenInput>('wallet/ADD_TOKEN_METADATA');
export const changeTokenVisibilityAction = createAction<Token>('wallet/CHANGE_TOKEN_VISIBILITY');

export const sendAssetAction = createActions<SendAssetPayload>('wallet/SEND_ASSET');

export const addTransactionAction = createAction<PendingTransaction>('wallet/ADD_TRANSACTION');
export const updateTransactionAction = createAction<Transaction>('wallet/CHANGE_TRANSACTION_STATUS');
