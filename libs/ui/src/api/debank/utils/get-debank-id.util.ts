import { debankNativeId } from '../constants';

export const getDebankId = (chainId: string) => debankNativeId[chainId as keyof typeof debankNativeId];
