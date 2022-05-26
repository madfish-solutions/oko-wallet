import { Contract, getDefaultProvider } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { from, map, Observable } from 'rxjs';

import genericErc20Abi from '../../constants/erc20Abi.json';
import { NetworkInterface } from '../../interfaces/network.interface';
import { TokenMetadata } from '../../interfaces/token-metadata.interface';

export const loadEvmGasTokenBalance$ = (network: NetworkInterface, pkh: string): Observable<string> => {
  const {
    rpcUrl,
    gasTokenMetadata: { decimals }
  } = network;

  const provider = getDefaultProvider(rpcUrl);

  return from(provider.getBalance(pkh)).pipe(map(balance => formatUnits(balance, decimals)));
};

export const loadEvmTokenBalance$ = (
  network: NetworkInterface,
  pkh: string,
  token: TokenMetadata
): Observable<string> => {
  const { rpcUrl } = network;
  const { tokenAddress, decimals } = token;
  const provider = getDefaultProvider(rpcUrl);
  const contract = new Contract(tokenAddress, genericErc20Abi, provider);

  return (from(contract.balanceOf(pkh)) as Observable<string>).pipe(map(balance => formatUnits(balance, decimals)));
};
