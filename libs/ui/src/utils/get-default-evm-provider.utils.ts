import { getDefaultProvider } from 'ethers';

export const getDefaultEvmProvider = (rpcUrl: string) => {
  try {
    const provider = getDefaultProvider(rpcUrl);

    return provider;
  } catch (e) {
    console.log(e);
  }
};
