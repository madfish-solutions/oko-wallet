import { createAction } from '@reduxjs/toolkit';

import { AccountInterface } from '../interfaces/account.interface';
import { createActions } from '../utils/action.utils';

export const generateHDAccountAction = createActions<void, AccountInterface, string>('wallet/GENERATE_HD_ACCOUNT');
export const switchAccountAction = createAction<AccountInterface>('wallet/SWITCH_ACCOUNT');
