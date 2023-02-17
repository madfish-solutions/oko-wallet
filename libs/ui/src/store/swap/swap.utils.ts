import { from } from 'rxjs';
import { getDefaultEvmProvider } from 'shelter';

import { ONE_INCH_ROUTER_ADDRESS } from '../../api/1inch/constants';
import { Erc20Abi__factory } from '../../contract-types';

export const loadTokenAllowance$ = (rpcUrl: string, publicKeyHash: string, tokenAddress: string) => {
  const provider = getDefaultEvmProvider(rpcUrl);
  const contract20 = Erc20Abi__factory.connect(tokenAddress, provider);

  return from(contract20.allowance(publicKeyHash, ONE_INCH_ROUTER_ADDRESS));
};
