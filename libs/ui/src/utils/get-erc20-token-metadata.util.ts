import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { getDefaultEvmProvider } from 'shelter';

import { Erc20Abi__factory } from '../contract-types';

export const getErc20TokenMetadata$ = (tokenAddress: string, rpcUrl: string) => {
  const provider = getDefaultEvmProvider(rpcUrl);

  const contract = Erc20Abi__factory.connect(tokenAddress, provider);

  return forkJoin([
    contract.name().catch(() => ''),
    contract.symbol().catch(() => ''),
    contract.decimals().catch(() => 0)
  ]).pipe(
    map(([name, symbol, decimals]) => ({
      tokenAddress,
      name,
      symbol,
      decimals: decimals.toString()
    }))
  );
};
