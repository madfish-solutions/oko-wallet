import { createAction } from '@reduxjs/toolkit';

import { AccountInterface } from '../../interfaces/account.interface';
import { ActivityItem } from '../../interfaces/activity-item.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { AccountTokenInput } from '../../interfaces/token-input.interface';
import { Token } from '../../interfaces/token.interface';
import { createActions } from '../utils/action.utils';

export const setSelectedAccountAction = createAction<string>('wallet/SET_SELECTED_ACCOUNT');
export const addHdAccountAction = createAction<AccountInterface>('wallet/ADD_HD_ACCOUNT');

export const generateHDAccountAction = createAction('wallet/GENERATE_HD_ACCOUNT');
export const loadGasTokenBalanceAction = createActions<void, string, string>('wallet/LOAD_GAS_TOKEN_BALANCE');
export const loadAccountTokenBalanceAction = createActions<
  { token: Token },
  { token: Token },
  { token: Token; error: string }
>('wallet/LOAD_TOKEN_BALANCE');

export const changeSelectedNetworkAction = createAction<string>('wallet/CHANGE_SELECTED_NETWORK');
export const addNewNetworkAction = createAction<NetworkInterface>('wallet/ADD_NEW_NETWORK');

export const addTokenMetadataAction = createAction<AccountTokenInput>('wallet/ADD_TOKEN_METADATA');
export const changeTokenVisibilityAction = createAction<Token>('wallet/CHANGE_TOKEN_VISIBILITY');

export const loadActivityAction = createActions<void, ActivityItem[], string>('wallet/LOAD_ACTIVITY');
