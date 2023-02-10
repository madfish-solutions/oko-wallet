import { BigNumberish } from 'ethers';

import { Erc20Abi__factory } from '../../../../../contract-types';

export const getDecodedApproveTokenData = (data: string) => {
  const erc20Interface = Erc20Abi__factory.createInterface();
  const [spender, allowanceAmount] = erc20Interface.decodeFunctionData('approve', data);

  return { spender, allowanceAmount: allowanceAmount.toString() };
};

export const getEncodedApproveTokenData = (spender: string, amount: BigNumberish) => {
  const erc20Interface = Erc20Abi__factory.createInterface();

  return erc20Interface.encodeFunctionData('approve', [spender, amount]);
};
