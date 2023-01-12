import { isDefined } from '@rnw-community/shared';

import { getDebankId } from '../api/utils/get-debank-id.util';
import { NetworkTypeEnum } from '../enums/network-type.enum';

interface TokenDetails {
  address: string;
  id?: string;
  explorerUrl: string;
  networkType: NetworkTypeEnum;
  chainId?: string;
}

export const getTokenDetailsUrl = ({
  address,
  id,
  explorerUrl,
  networkType = NetworkTypeEnum.EVM,
  chainId
}: TokenDetails) => {
  const isKlaytn = isDefined(chainId) && getDebankId(chainId) === 'klay';
  const searchParam = isDefined(id) && isKlaytn ? '/nft/' : '/token/';
  const explorerUrlPrefix = networkType === NetworkTypeEnum.EVM ? searchParam : '';
  const collectibleParam = isDefined(chainId) && isKlaytn ? '/' + id : `?a=${id}`;

  return `${explorerUrl}${explorerUrlPrefix}${address}${isDefined(id) ? collectibleParam : ''}`;
};
