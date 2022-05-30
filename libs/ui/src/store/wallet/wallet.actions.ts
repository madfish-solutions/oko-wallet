import { createAction } from '@reduxjs/toolkit';

import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { AccountToken } from '../../interfaces/account-token.interface';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { TokenMetadata } from '../../interfaces/token-metadata.interface';
import { createActions } from '../utils/action.utils';

export const generateHDAccountAction = createActions<void, AccountInterface, string>('wallet/GENERATE_HD_ACCOUNT');
export const changeAccountAction = createAction<AccountInterface>('wallet/CHANGE_ACCOUNT');
export const setSelectedAccountAction = createAction<string>('wallet/SET_SELECTED_ACCOUNT');
export const addHdAccountAction = createAction<AccountInterface>('wallet/ADD_HD_ACCOUNT');

export const loadGasTokenBalanceAction = createActions<void, string, string>('wallet/LOAD_GAS_TOKEN_BALANCE');

export const addNewNetworkAction = createAction<NetworkInterface>('wallet/ADD_NEW_NETWORK');
export const changeNetworkAction = createAction<{
  rpcUrl: string;
  networkType: NetworkTypeEnum;
  accountIndex: number;
}>('wallet/CHANGE_NETWORK');

export const generateHdAccountByNetworkTypeAction = createActions<AccountInterface, AccountInterface, string>(
  'wallet/GENERATE_HD_ACCOUNT_BY_NETWORK_TYPE'
);

export const addTokenMetadataAction = createAction<TokenMetadata>('wallet/ADD_TOKEN_METADATA');
export const changeTokenVisibilityAction = createAction<AccountToken['tokenAddress']>('wallet/CHANGE_TOKEN_VISIBILITY');
