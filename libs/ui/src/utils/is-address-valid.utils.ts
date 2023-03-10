import { isAddress as isEvmAddressValid } from 'ethers/lib/utils';
import { NetworkTypeEnum } from 'shared';

import { isTezosAddressValid } from './is-tezos-address-valid.util';

export const isAddressValid = (address: string | undefined, networkType: NetworkTypeEnum) => {
  if (address === undefined) {
    return false;
  }

  return networkType === NetworkTypeEnum.Tezos ? isTezosAddressValid(address) : isEvmAddressValid(address);
};
