import { isDefined, isString } from '@rnw-community/shared';

import { AssetTypeEnum } from '../enums/asset-type.enum';
import { NetworkTypeEnum } from '../enums/network-type.enum';
import { TokenStandardEnum } from '../enums/token-standard.enum';
import { Asset } from '../interfaces/asset.interface';
import { Token } from '../interfaces/token.interface';

export const getAssetType = ({ tokenId, tokenAddress, standard }: Asset | Token, networkType = NetworkTypeEnum.EVM) => {
  if (tokenAddress?.length === 0 || !isDefined(tokenAddress)) {
    return AssetTypeEnum.GasToken;
  }

  if (isString(tokenId) && tokenId.length > 0) {
    if (networkType === NetworkTypeEnum.Tezos) {
      return AssetTypeEnum.CollectibleFA2;
    }

    return standard === TokenStandardEnum.ERC1155 ? AssetTypeEnum.Collectible1155 : AssetTypeEnum.Collectible721;
  }

  return AssetTypeEnum.Token;
};
