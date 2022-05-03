import { createAction } from '@reduxjs/toolkit';

import { NetworksValueEnum } from '../../enums/network.enum';
import { createActions } from '../utils/action.utils';

import { TokenType } from './wallet.state';

type BalanceSubmitType = {
  network: NetworksValueEnum;
  pkh: string;
};

export const generateHDAccount = createAction('wallet/GENERATE_HD_ACCOUNT');
export const getBalanceAction = createActions<BalanceSubmitType, TokenType, string>('wallet/GET_BALANCE');
