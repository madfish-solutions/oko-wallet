import { Contract, getDefaultProvider, BigNumber } from 'ethers';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import ERC_20_ABI from '../../constants/abi/erc-20-Abi.json';
import { NetworkInterface } from '../../interfaces/network.interface';
import { Token } from '../../interfaces/token.interface';

export const loadEvmGasTokenBalance$ = ({ rpcUrl }: NetworkInterface, publicKeyHash: string): Observable<string> => {
  const provider = getDefaultProvider(rpcUrl);

  return from(provider.getBalance(publicKeyHash)).pipe(map(balance => balance.toString()));
};

export const loadEvmTokenBalance$ = (
  { rpcUrl }: NetworkInterface,
  publicKeyHash: string,
  { tokenAddress }: Token
): Observable<string> => {
  const provider = getDefaultProvider(rpcUrl);
  const contract = new Contract(tokenAddress, ERC_20_ABI, provider);

  return (from(contract.balanceOf(publicKeyHash)) as Observable<BigNumber>).pipe(map(balance => balance.toString()));
};
