import { createActions } from '../utils/action.utils';

export const generateRandomBalanceValueAction = createActions<number, number, string>('app-info/GENERATE_NEW_BUILD');
