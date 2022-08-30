import { wrongEvmAddressError, wrongTezosAddressError, requiredFieldError } from '../../../constants/form-errors';
import { NetworkTypeEnum } from '../../../enums/network-type.enum';
import { isAddressValid } from '../../../utils/is-address-valid.utils';

export const useValidateSendFields = (networkType: NetworkTypeEnum) => {
  const checkIfPublicKeyHashValid = (publicKeyHash: string) => {
    if (isAddressValid(publicKeyHash, networkType)) {
      return true;
    }

    return networkType === NetworkTypeEnum.EVM ? wrongEvmAddressError : wrongTezosAddressError;
  };
  const isGreaterThanZero = (value: string) => Number(value) > 0 || 'Should be greater than 0';

  return {
    amountRules: {
      required: requiredFieldError,
      validate: { isGreaterThanZero }
    },
    receiverPublicKeyHashRules: {
      required: requiredFieldError,
      validate: { checkIfPublicKeyHashValid }
    }
  };
};
