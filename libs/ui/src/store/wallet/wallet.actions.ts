import { createAction } from '@reduxjs/toolkit';

import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { AccountInterface, AccountByNetworkType } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { createActions } from '../utils/action.utils';

export const generateHDAccountAction = createActions<void, AccountInterface, string>('wallet/GENERATE_HD_ACCOUNT');
export const switchAccountAction = createAction<AccountInterface>('wallet/SWITCH_ACCOUNT');

export const loadGasTokenBalanceAction = createActions<void, string, string>('wallet/LOAD_GAS_TOKEN_BALANCE');

export const changeSelectedNetworkAction = createActions<
  { rpcUrl: string; networkType: NetworkTypeEnum; publicKeyHash: string },
  AccountByNetworkType,
  string
>('wallet/CHANGE_SELECTED_NETWORK');
export const changeSelectedNetworkAndCreateNetworkTypeByAccountAction = createActions<
  { rpcUrl: string; networkType: NetworkTypeEnum },
  AccountInterface,
  string
>('wallet/CHANGE_SELECTED_NETWORK_AND_CREATE_NETWORK_TYPE_BY_ACCOUNT');
export const changeAccountAndCreateNewNetworkTypeAction = createActions<AccountInterface, AccountInterface, string>(
  'wallet/CHANGE_ACCOUNT_AND_CREATE_NEW_NETWORK_TYPE'
);
export const addNewNetworkAction = createAction<NetworkInterface>('wallet/ADD_NEW_NETWORK');
