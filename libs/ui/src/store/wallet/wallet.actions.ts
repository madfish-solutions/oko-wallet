import { TokenWithBalanceType } from '../../types/token.type';
import { Action } from '../utils/action.utils';

const { generateAction, generateActions } = new Action('wallet');

export const generateHDAccount = generateAction('GENERATE_HD_ACCOUNT');
export const getGasTokenBalanceAction = generateActions<void, TokenWithBalanceType, string>('GET_GAS_TOKEN_BALANCE');
