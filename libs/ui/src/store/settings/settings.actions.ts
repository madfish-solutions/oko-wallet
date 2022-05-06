import { NetworkType } from '../../types/networks.type';
import { Action } from '../utils/action.utils';

const { generateAction } = new Action('settings');

export const changeNetworkAction = generateAction<string>('CHANGE_NETWORK');
export const addNewNetworkAction = generateAction<NetworkType>('ADD_NEW_NETWORK');
