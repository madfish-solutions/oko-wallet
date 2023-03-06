// TODO:
//  1. update RN version
//  2. fix tsc for extension/mobile apps3
//  3. get rid of ui/background-script imports
//  4. extract this packages into separate libs

export type { DAppInfo, DAppTransactionInfo } from './interfaces/dapp-info.interface';
export type { RootState } from './store/store';

export { createDAppResponse, POPUP_CLOSED, POPUP_OPEN } from './utils/dapp.utils';
export { initialRootState } from './store/root-state.initial-state';
