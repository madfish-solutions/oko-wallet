import { isNotEmptyString } from '@rnw-community/shared';

import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { useSelectedNetworkTypeSelector } from '../../store/wallet/wallet.selectors';
import { isValidUrl } from '../../utils/is-valid-url.util';
import { isEvmAddressValid } from '../../utils/isEvmAddressValid.util';
import { isValidAddress } from '../../utils/isTezosAddressValid.util';

export const useTokenFieldsRules = () => {
  const network = useSelectedNetworkTypeSelector();

  const checkAddressValidation = (currentValue: string) => {
    if (network === NetworkTypeEnum.EVM) {
      if (!currentValue.startsWith('0x')) {
        return 'Only 0x... contract address allowed';
      } else if (!isEvmAddressValid(currentValue)) {
        return 'Address is not valid for EVM network';
      }
    } else if (network === NetworkTypeEnum.Tezos) {
      if (!currentValue.startsWith('KT')) {
        return 'Only KT... contract address allowed';
      } else if (!isValidAddress(currentValue)) {
        return 'Address is not valid for Tezos network';
      }
    }
  };

  const checkIfOnlySpaces = (currentValue?: string) => {
    if (isNotEmptyString(currentValue) && !currentValue.trim()) {
      return '1-21 characters, no special';
    }
  };

  const checkImageUrl = (currentValue?: string) => {
    if (isNotEmptyString(currentValue) && isValidUrl(currentValue)) {
      return 'Must be a valid URL';
    }
  };

  const checOnlyNymbers = (currentValue: string) => {
    if (!currentValue.match(/^\d*[.]?\d*$/)) {
      return 'Only numbers';
    }
  };

  const commonRules = {
    required: 'This field is required',
    validate: { checkIfOnlySpaces }
  };

  const addressUrlRules = {
    required: commonRules.required,
    validate: { ...commonRules.validate, checkAddressValidation }
  };

  const thumbnailUrlRules = {
    validate: { ...commonRules.validate, checkImageUrl }
  };

  const decimalsRules = {
    required: commonRules.required,
    validate: { ...commonRules.validate, checOnlyNymbers }
  };

  return {
    commonRules,
    addressUrlRules,
    thumbnailUrlRules,
    decimalsRules
  };
};
