import { debankNativeId } from '../constants/debank-native-id';

export const getDebankId = (chainId: string) => debankNativeId[chainId as keyof typeof debankNativeId];
