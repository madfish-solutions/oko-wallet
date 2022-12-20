import {
  Erc1155Abi__factory,
  Erc165Abi__factory,
  Erc20Abi__factory,
  Erc721Abi__factory
} from '../../../contract-types';

export const parseTransactionData = (data: string) => {
  try {
    const parsed = Erc20Abi__factory.createInterface().parseTransaction({ data });

    return parsed;
  } catch {
    console.log('can not parse with erc20 abi');
  }

  try {
    const parsed = Erc1155Abi__factory.createInterface().parseTransaction({ data });

    return parsed;
  } catch {
    console.log('can not parse with erc1155 abi');
  }

  try {
    const parsed = Erc721Abi__factory.createInterface().parseTransaction({ data });

    return parsed;
  } catch {
    console.log('can not parse with erc721 abi');
  }

  try {
    const parsed = Erc165Abi__factory.createInterface().parseTransaction({ data });

    return parsed;
  } catch {
    console.log('can not parse with erc165 abi');
  }

  return undefined;
};
