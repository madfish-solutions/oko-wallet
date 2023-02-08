// TODO:
//  1. update RN version
//  2. fix tsc for extension/mobile apps3
//  3. get rid of ui/background-script imports
//  4. extract this packages into separate libs

export type { BackgroundMessage } from './messagers/types/background-message.type';
export type { DAppInfo, DAppTransactionInfo } from './interfaces/dapp-info.interface';
export type { RootState } from './store/store';

export { BackgroundMessageType } from './messagers/enums/background-message-type.enum';
export { E2eMessageType } from './messagers/enums/e2e-message-type.enum';
export { INITIAL_PASSWORD_HASH } from './shelter/shelter';
export { createDAppResponse, POPUP_CLOSED, POPUP_OPEN } from './utils/dapp.utils';
export { LocalStorage } from './utils/local-storage.util';
export { initialRootState } from './store/root-state.initial-state';
