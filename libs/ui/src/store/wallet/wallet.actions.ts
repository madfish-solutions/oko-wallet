import { createAction } from '@reduxjs/toolkit';

import { NetworkInrerface } from '../../types/networks.type';
import { TokenWithBalanceType } from '../../types/token.type';
import { createActions } from '../utils/action.utils';

export const generateHDAccount = createAction('wallet/GENERATE_HD_ACCOUNT');
export const getGasTokenBalanceAction = createActions<void, TokenWithBalanceType, string>(
  'wallet/GET_GAS_TOKEN_BALANCE'
);

export const changeNetworkAction = createAction<string>('wallet/CHANGE_NETWORK');
export const addNewNetworkAction = createAction<NetworkInrerface>('wallet/ADD_NEW_NETWORK');
