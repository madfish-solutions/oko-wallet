import { parseUnits } from 'ethers/lib/utils';

import { Erc1155Abi__factory, Erc20Abi__factory, Erc721Abi__factory } from '../../../../../contract-types';
import { AssetTypeEnum } from '../../../../../enums/asset-type.enum';
import { Token } from '../../../../../interfaces/token.interface';
import { checkIsErc721Collectible } from '../../../../../utils/check-is-erc721-collectible.util';
import { getAssetType } from '../../../../../utils/get-asset-type.util';

export const getTransactionParams = (
  token: Token,
  receiverPublicKeyHash: string,
  publicKeyHash: string,
  amount: string
) => {
  const { tokenId = '', tokenAddress, decimals } = token;
  const assetType = getAssetType(token);
  const value =
    assetType === AssetTypeEnum.GasToken || assetType === AssetTypeEnum.Token
      ? parseUnits(amount, decimals).toString()
      : amount;

  switch (assetType) {
    case AssetTypeEnum.GasToken:
      return { to: receiverPublicKeyHash, value };

    case AssetTypeEnum.Collectible:
      const isErc721 = checkIsErc721Collectible(token);

      return isErc721
        ? getCollectible721TransactionParams(publicKeyHash, receiverPublicKeyHash, tokenAddress, tokenId)
        : getCollectible1155TransactionParams(publicKeyHash, receiverPublicKeyHash, tokenAddress, tokenId, value);

    default:
      return getToken20TransactionParams(receiverPublicKeyHash, tokenAddress, value);
  }
};

const getCollectible721TransactionParams = (
  publicKeyHash: string,
  receiverPublicKeyHash: string,
  tokenAddress: string,
  tokenId: string
) => {
  const erc721Interface = Erc721Abi__factory.createInterface();
  const data = erc721Interface.encodeFunctionData('transferFrom', [publicKeyHash, receiverPublicKeyHash, tokenId]);

  return { data, to: tokenAddress };
};

const getCollectible1155TransactionParams = (
  publicKeyHash: string,
  receiverPublicKeyHash: string,
  tokenAddress: string,
  tokenId: string,
  value: string
) => {
  const erc1155Interface = Erc1155Abi__factory.createInterface();
  const data = erc1155Interface.encodeFunctionData('safeTransferFrom', [
    publicKeyHash,
    receiverPublicKeyHash,
    tokenId,
    value,
    []
  ]);

  return { data, to: tokenAddress };
};

const getToken20TransactionParams = (receiverPublicKeyHash: string, tokenAddress: string, value: string) => {
  const erc20Interface = Erc20Abi__factory.createInterface();
  const data = erc20Interface.encodeFunctionData('transfer', [receiverPublicKeyHash, value]);

  return { data, to: tokenAddress };
};
