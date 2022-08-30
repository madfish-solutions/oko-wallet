import { requiredFieldError } from '../../../constants/form-errors';
import { NetworkTypeEnum } from '../../../enums/network-type.enum';
import { isAddressValid } from '../../../utils/is-address-valid.utils';

export const useValidateSendFields = (networkType: NetworkTypeEnum) => {
  const checkIfPublicKeyHashValid = (publicKeyHash: string) =>
    isAddressValid(publicKeyHash, networkType) || 'Address is not valid';
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
