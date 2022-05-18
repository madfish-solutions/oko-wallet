import { createAction } from '@reduxjs/toolkit';

import { AccountInterface } from '../../store/interfaces/account.interface';

export const generateHDAccount = createAction('wallet/GENERATE_HD_ACCOUNT');

export const setSelectedAccountAction = createAction<string | undefined>('wallet/SET_SELECTED_ACCOUNT');
export const addHdAccountAction = createAction<AccountInterface>('wallet/ADD_HD_ACCOUNT');
