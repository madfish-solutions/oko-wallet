import { isDefined } from '@rnw-community/shared';
import { NetworkTypeEnum } from 'shared';

import { getDebankId } from '../api/debank/utils/get-debank-id.util';

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
  const tokenSearchParam = isDefined(id) && isKlaytn ? '/nft/' : '/token/';
  const idSearchParam = isDefined(chainId) && isKlaytn ? `/${id}` : `?a=${id}`;
  const explorerUrlPrefix = networkType === NetworkTypeEnum.EVM ? tokenSearchParam : '';

  return `${explorerUrl}${explorerUrlPrefix}${address}${isDefined(id) ? idSearchParam : ''}`;
};
