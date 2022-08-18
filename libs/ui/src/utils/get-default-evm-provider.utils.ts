import { Provider } from '@ethersproject/abstract-provider';
import { getDefaultProvider } from 'ethers';

let emptyProvider: Provider;

export const getDefaultEvmProvider = (rpcUrl: string) => {
  try {
    const provider = getDefaultProvider(rpcUrl);

    return provider;
  } catch (e) {
    console.log(e);

    return emptyProvider;
  }
};
