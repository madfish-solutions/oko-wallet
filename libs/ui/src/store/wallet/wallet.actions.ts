import { createAction } from '@reduxjs/toolkit';

import { TokenWithBalanceType } from '../../types/token.type';
import { createActions } from '../utils/action.utils';

export const generateHDAccount = createAction('wallet/GENERATE_HD_ACCOUNT');
export const getGasTokenBalanceAction = createActions<string, TokenWithBalanceType, string>('wallet/GET_BALANCE');
