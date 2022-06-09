import { Contract, getDefaultProvider, BigNumber } from 'ethers';
import { map, from, Observable } from 'rxjs';

import genericErc20Abi from '../../constants/erc20Abi.json';
import { NetworkInterface } from '../../interfaces/network.interface';
import { Token } from '../../interfaces/token.interface';
import { convertUnits } from '../convert-units';

export const loadEvmGasTokenBalance$ = (
  { rpcUrl, gasTokenMetadata: { decimals } }: NetworkInterface,
  publicKeyHash: string
): Observable<string> => {
  const provider = getDefaultProvider(rpcUrl);

  return from(provider.getBalance(publicKeyHash)).pipe(map(balance => convertUnits(+balance, decimals).toString()));
};

export const loadEvmTokenBalance$ = (
  { rpcUrl }: NetworkInterface,
  publicKeyHash: string,
  { tokenAddress }: Token
): Observable<string> => {
  const provider = getDefaultProvider(rpcUrl);
  const contract = new Contract(tokenAddress, genericErc20Abi, provider);

  return (from(contract.balanceOf(publicKeyHash)) as Observable<BigNumber>).pipe(map(balance => balance.toString()));
};
