import { isString } from '@rnw-community/shared';

import { AssetTypeEnum } from '../enums/asset-type.enum';
import { Asset } from '../interfaces/asset.interface';
import { Token } from '../interfaces/token.interface';

export const getAssetType = ({ tokenId, tokenAddress }: Asset | Token) => {
  if (tokenAddress.length === 0) {
    return AssetTypeEnum.GasToken;
  }

  if (isString(tokenId) && tokenId.length > 0) {
    return AssetTypeEnum.Collectible;
  }

  return AssetTypeEnum.Token;
};
