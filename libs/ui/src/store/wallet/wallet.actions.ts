import { createAction } from '@reduxjs/toolkit';

import { NetworkInterface } from '../../interfaces/network.interface';
import { createActions } from '../utils/action.utils';

export const generateHDAccount = createAction('wallet/GENERATE_HD_ACCOUNT');
export const loadGasTokenBalanceAction = createActions<void, string, string>('wallet/LOAD_GAS_TOKEN_BALANCE');

export const changeSelectedNetworkAction = createAction<string>('wallet/CHANGE_SELECTED_NETWORK');
export const addNewNetworkAction = createAction<NetworkInterface>('wallet/ADD_NEW_NETWORK');
