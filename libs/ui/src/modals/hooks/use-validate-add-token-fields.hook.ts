import { isNotEmptyString } from '@rnw-community/shared';

import {
  requiredFieldError,
  onlySpacesError,
  wrongEvmAddressError,
  wrongTezosAddressError
} from '../../constants/form-errors';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { useSelectedNetworkTypeSelector } from '../../store/wallet/wallet.selectors';
import { isEvmAddressValid } from '../../utils/is-evm-address-valid.util';
import { isTezosAddressValid } from '../../utils/is-tezos-address-valid.util';

export const useTokenFieldsRules = () => {
  const network = useSelectedNetworkTypeSelector();

  const checkAddressValidation = (currentValue: string) => {
    const checkEvmAddress = () => {
      if (!currentValue.startsWith('0x')) {
        return wrongEvmAddressError;
      }
      if (!isEvmAddressValid(currentValue)) {
        return 'Address is not valid for EVM network';
      }
    };
    const checkTezosAddress = () => {
      if (!currentValue.startsWith('KT')) {
        return wrongTezosAddressError;
      }
      if (!isTezosAddressValid(currentValue)) {
        return 'Address is not valid for Tezos network';
      }
    };

    switch (network) {
      case NetworkTypeEnum.Tezos:
        return checkTezosAddress();
      default:
        return checkEvmAddress();
    }
  };

  const checkIfOnlySpaces = (currentValue?: string) => {
    if (isNotEmptyString(currentValue) && !currentValue.trim()) {
      return onlySpacesError;
    }
  };

  const checkOnlyNumbers = (currentValue: string) => {
    if (!currentValue.match(/^\d*?\d*$/)) {
      return 'Only numbers';
    }
  };

  const commonRules = {
    required: requiredFieldError,
    validate: { checkIfOnlySpaces }
  };

  const addressUrlRules = {
    required: commonRules.required,
    validate: { ...commonRules.validate, checkAddressValidation }
  };

  const thumbnailUrlRules = {
    validate: { ...commonRules.validate }
  };

  const decimalsRules = {
    required: commonRules.required,
    validate: { ...commonRules.validate, checkOnlyNumbers }
  };

  return {
    commonRules,
    addressUrlRules,
    thumbnailUrlRules,
    decimalsRules
  };
};
