import { createAction } from '@reduxjs/toolkit';

import { NetworksValueEnum } from '../../enums/network.enum';
import { TokenWithBalanceType } from '../../types/token.type';
import { createActions } from '../utils/action.utils';

export const generateHDAccount = createAction('wallet/GENERATE_HD_ACCOUNT');
export const getBalanceAction = createActions<NetworksValueEnum, TokenWithBalanceType, string>('wallet/GET_BALANCE');
