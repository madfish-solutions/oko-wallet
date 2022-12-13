import { requiredFieldError } from '../../../constants/form-errors';
import { NetworkTypeEnum } from '../../../enums/network-type.enum';
import { isAddressValid } from '../../../utils/is-address-valid.utils';

export const useValidateAddressField = (networkType: NetworkTypeEnum) => {
  const checkIfPublicKeyHashValid = (publicKeyHash: string) =>
    isAddressValid(publicKeyHash, networkType) || 'Address is not valid';

  return {
    required: requiredFieldError,
    validate: { checkIfPublicKeyHashValid }
  };
};
