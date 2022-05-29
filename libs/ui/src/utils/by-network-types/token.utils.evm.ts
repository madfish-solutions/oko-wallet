import { Contract, getDefaultProvider, BigNumber } from 'ethers';
import { map, from, Observable } from 'rxjs';

import genericErc20Abi from '../../constants/erc20Abi.json';
import { NetworkInterface } from '../../interfaces/network.interface';
import { TokenMetadata } from '../../interfaces/token-metadata.interface';

export const loadEvmGasTokenBalance$ = (network: NetworkInterface, publicKeyHash: string): Observable<string> => {
  const { rpcUrl } = network;

  const provider = getDefaultProvider(rpcUrl);

  return from(provider.getBalance(publicKeyHash)).pipe(map(balance => balance.toString()));
};

export const loadEvmTokenBalance$ = (
  network: NetworkInterface,
  publicKeyHash: string,
  token: TokenMetadata
): Observable<string> => {
  const { rpcUrl } = network;
  const { tokenAddress } = token;
  const provider = getDefaultProvider(rpcUrl);
  const contract = new Contract(tokenAddress, genericErc20Abi, provider);

  return (from(contract.balanceOf(publicKeyHash)) as Observable<BigNumber>).pipe(map(balance => balance.toString()));
};
