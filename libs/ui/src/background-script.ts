// TODO:
//  1. update RN version
//  2. fix tsc for extension/mobile apps3
//  3. get rid of ui/background-script imports
//  4. extract this packages into separate libs

export type { BackgroundMessage } from './messagers/types/background-message.types';
export type { DAppInfo } from './interfaces/dapp-info.interface';
export type { RootState } from './store/store';

export { BackgroundMessageType } from './messagers/enums/background-message-types.enum';
export { createDAppResponse } from './utils/dapp.utils';
export { LocalStorage } from './utils/local-storage.util';
