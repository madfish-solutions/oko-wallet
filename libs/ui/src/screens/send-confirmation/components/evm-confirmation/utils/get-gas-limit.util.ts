import { getDefaultEvmProvider } from 'shelter';

import { Erc1155Abi__factory, Erc20Abi__factory, Erc721Abi__factory } from '../../../../../contract-types';
import { AssetTypeEnum } from '../../../../../enums/asset-type.enum';
import { Asset } from '../../../../../interfaces/asset.interface';
import { checkIsErc721Collectible } from '../../../../../utils/check-is-erc721-collectible.util';
import { getAssetType } from '../../../../../utils/get-asset-type.util';

import { getAmount } from './get-amount.util';

export const getGasLimit = (
  asset: Asset,
  receiverPublicKeyHash: string,
  publicKeyHash: string,
  value: string,
  rpcUrl: string
) => {
  const { decimals, tokenId, tokenAddress } = asset;
  const assetType = getAssetType(asset);

  switch (assetType) {
    case AssetTypeEnum.GasToken:
      return getGasTokenGasLimit(publicKeyHash, value, decimals, receiverPublicKeyHash, rpcUrl);

    case AssetTypeEnum.Collectible:
      const isErc721 = checkIsErc721Collectible(asset);

      return isErc721
        ? getCollectible721GasLimit(publicKeyHash, receiverPublicKeyHash, tokenAddress, tokenId, rpcUrl)
        : getCollectible1155GasLimit(publicKeyHash, receiverPublicKeyHash, tokenAddress, tokenId, value, rpcUrl);

    default:
      return getToken20GasLimit(publicKeyHash, receiverPublicKeyHash, tokenAddress, value, decimals, rpcUrl);
  }
};

const getGasTokenGasLimit = (
  from: string,
  value: string,
  decimals: number,
  receiverPublicKeyHash: string,
  rpcUrl: string
) => {
  const provider = getDefaultEvmProvider(rpcUrl);

  return provider
    .estimateGas({
      from,
      to: receiverPublicKeyHash,
      value: getAmount(value, decimals)
    })
    .then(gasLimit => gasLimit)
    .catch(console.log);
};

const getCollectible721GasLimit = (
  from: string,
  receiverPublicKeyHash: string,
  tokenAddress: string,
  tokenId: string,
  rpcUrl: string
) => {
  const provider = getDefaultEvmProvider(rpcUrl);
  const contract721 = Erc721Abi__factory.connect(tokenAddress, provider);

  return contract721.estimateGas
    .transferFrom(from, receiverPublicKeyHash, tokenId, { from })
    .then(gasLimit => gasLimit)
    .catch(console.log);
};

const getCollectible1155GasLimit = (
  from: string,
  receiverPublicKeyHash: string,
  tokenAddress: string,
  tokenId: string,
  value: string,
  rpcUrl: string
) => {
  const provider = getDefaultEvmProvider(rpcUrl);
  const contract1155 = Erc1155Abi__factory.connect(tokenAddress, provider);

  return contract1155.estimateGas
    .safeTransferFrom(from, receiverPublicKeyHash, tokenId, value, [], { from })
    .then(gasLimit => gasLimit)
    .catch(console.log);
};

const getToken20GasLimit = (
  from: string,
  receiverPublicKeyHash: string,
  tokenAddress: string,
  value: string,
  decimals: number,
  rpcUrl: string
) => {
  const provider = getDefaultEvmProvider(rpcUrl);
  const contract20 = Erc20Abi__factory.connect(tokenAddress, provider);

  return contract20.estimateGas
    .transfer(receiverPublicKeyHash, getAmount(value, decimals), { from })
    .then(gasLimit => gasLimit)
    .catch(console.log);
};
