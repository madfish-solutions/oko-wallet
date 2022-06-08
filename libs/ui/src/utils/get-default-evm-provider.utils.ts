import { getDefaultProvider } from 'ethers';

export const getDefaultEvmProvider = (rpcUrl: string) => getDefaultProvider(rpcUrl);
