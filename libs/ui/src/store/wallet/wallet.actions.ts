import { createAction } from '@reduxjs/toolkit';

import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { AccountInterface, AccountByNetworkType } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { createActions } from '../utils/action.utils';

export const generateHDAccountAction = createActions<void, AccountInterface, string>('wallet/GENERATE_HD_ACCOUNT');
export const changeAccountAction = createAction<AccountInterface>('wallet/CHANGE_ACCOUNT');

export const loadGasTokenBalanceAction = createActions<void, string, string>('wallet/LOAD_GAS_TOKEN_BALANCE');

export const addNewNetworkAction = createAction<NetworkInterface>('wallet/ADD_NEW_NETWORK');
export const changeNetworkAction = createActions<
  { rpcUrl: string; networkType: NetworkTypeEnum; publicKeyHash: string },
  AccountByNetworkType,
  string
>('wallet/CHANGE_SELECTED_NETWORK');

export const changeNetworkAndGenerateHdAccountByNetworkTypeAction = createActions<
  { rpcUrl: string; networkType: NetworkTypeEnum },
  AccountInterface,
  string
>('wallet/CHANGE_NETWORK_AND_GENERATE_HD_ACCOUNT_BY_NETWORK_TYPE');
export const changeAccountAndGenerateHdAccountByNetworkTypeAction = createActions<
  AccountInterface,
  AccountInterface,
  string
>('wallet/CHANGE_ACCOUNT_AND_GENERATE_HD_ACCOUNT_BY_NETWORK_TYPE');
