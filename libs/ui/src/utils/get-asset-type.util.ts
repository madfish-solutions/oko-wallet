import { isNotEmptyString } from '@rnw-community/shared';

import { AssetTypeEnum } from '../enums/asset-type.enum';
import { Token } from '../interfaces/token.interface';

import { checkIsGasToken } from './check-is-gas-token.util';

export const getAssetType = ({ tokenId, tokenAddress }: Token) => {
  if (checkIsGasToken(tokenAddress)) {
    return AssetTypeEnum.GasToken;
  }

  if (isNotEmptyString(tokenId)) {
    return AssetTypeEnum.Collectible;
  }

  return AssetTypeEnum.Token;
};
