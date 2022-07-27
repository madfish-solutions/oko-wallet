import { isDefined, isNotEmptyString } from '@rnw-community/shared';

import { removeTrailingSlash } from '../../utils/remove-trailing-slash.util';
import { FormTypes } from '../screens/token/types/form-types.interface';

interface AddTokenFieldsRules {
  tokens: any[];
  defaultValues?: FormTypes;
}

export const useAddTokenFieldsRules = ({ tokens, defaultValues }: AddTokenFieldsRules) => {
  const isNetworkRpcUrlAlreadyExist = (currentAddress: string) => {
    const address = removeTrailingSlash(currentAddress.trim());

    if (
      tokens.some(token => removeTrailingSlash(token.address) === address) &&
      isNotEmptyString(address) &&
      isDefined(defaultValues) &&
      address !== defaultValues.address
    ) {
      return 'Token with this address URL already exist';
    }
  };

  const checkIfOnlySpaces = (currentValue?: string) => {
    if (isNotEmptyString(currentValue) && !currentValue.trim()) {
      return '1-21 characters, no special';
    }
  };

  const commonRules = {
    required: 'This field is required',
    validate: { checkIfOnlySpaces }
  };

  const addressUrlRules = {
    required: commonRules.required,
    validate: { ...commonRules.validate, isNetworkRpcUrlAlreadyExist }
  };

  return {
    commonRules,
    addressUrlRules
  };
};
