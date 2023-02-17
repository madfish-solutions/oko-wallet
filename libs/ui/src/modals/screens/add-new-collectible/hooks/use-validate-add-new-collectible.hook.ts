import { isNotEmptyString } from '@rnw-community/shared';
import { NetworkTypeEnum } from 'shared';

import { onlySpacesError, requiredFieldError } from '../../../../constants/form-errors';
import { useSelectedNetworkTypeSelector } from '../../../../store/wallet/wallet.selectors';
import { isEvmAddressValid } from '../../../../utils/is-evm-address-valid.util';
import { isTezosAddressValid } from '../../../../utils/is-tezos-address-valid.util';

export const useValidateAddNewCollectibleFields = () => {
  const network = useSelectedNetworkTypeSelector();

  const checkAddressValidation = (currentValue: string) => {
    const checkEvmAddress = () => {
      if (!currentValue.startsWith('0x')) {
        return 'Only 0x... contract address allowed';
      }
      if (!isEvmAddressValid(currentValue)) {
        return 'Address is not valid for EVM network';
      }
    };
    const checkTezosAddress = () => {
      if (!currentValue.startsWith('KT')) {
        return 'Only KT... contract address allowed';
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

  const commonRules = {
    required: requiredFieldError,
    validate: { checkIfOnlySpaces }
  };

  const addressUrlRules = {
    required: commonRules.required,
    validate: { ...commonRules.validate, checkAddressValidation }
  };

  return {
    commonRules,
    addressUrlRules
  };
};
