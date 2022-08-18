import { validateAddress, ValidationResult } from '@taquito/utils';
import { isAddress as isEvmAddressValid } from 'ethers/lib/utils';

import { NetworkTypeEnum } from '../enums/network-type.enum';

export const isTezosAddressValid = (address: string) => validateAddress(address) === ValidationResult.VALID;

export const isAddressValid = (address: string | undefined, networkType: NetworkTypeEnum) => {
  if (address === undefined) {
    return false;
  }

  return networkType === NetworkTypeEnum.Tezos ? isTezosAddressValid(address) : isEvmAddressValid(address);
};
