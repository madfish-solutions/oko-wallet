import { createAction } from '@reduxjs/toolkit';

import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { createActions } from '../utils/action.utils';

export const generateHDAccountAction = createActions<void, AccountInterface, string>('wallet/GENERATE_HD_ACCOUNT');
export const switchAccountAction = createAction<AccountInterface>('wallet/SWITCH_ACCOUNT');

export const loadGasTokenBalanceAction = createActions<void, string, string>('wallet/LOAD_GAS_TOKEN_BALANCE');

export const changeSelectedNetworkAction = createAction<string>('wallet/CHANGE_SELECTED_NETWORK');
export const addNewNetworkAction = createAction<NetworkInterface>('wallet/ADD_NEW_NETWORK');
