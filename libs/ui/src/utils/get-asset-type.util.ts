import { AssetTypeEnum } from '../enums/asset-type.enum';
import { Asset } from '../interfaces/asset.interface';

export const getAssetType = ({ tokenId, tokenAddress }: Asset) => {
  if (tokenAddress.length === 0) {
    return AssetTypeEnum.GasToken;
  }

  if (tokenId.length > 0) {
    return AssetTypeEnum.Collectible;
  }

  return AssetTypeEnum.Token;
};
