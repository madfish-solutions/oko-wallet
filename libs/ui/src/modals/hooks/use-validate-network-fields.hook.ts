import { isDefined, isNotEmptyString } from '@rnw-community/shared';

import { onlySpacesError, requiredFieldError } from '../../constants/form-errors';
import { httpsRegx } from '../../constants/regex-validation';
import { NetworkInterface } from '../../interfaces/network.interface';
import { removeTrailingSlash } from '../../utils/remove-trailing-slash.util';
import { FormTypes } from '../screens/network/types/form-types.interface';

interface NetworkFieldsRules {
  networks: NetworkInterface[];
  chainId?: string;
  defaultValues?: FormTypes;
}

export const useNetworkFieldsRules = ({ networks, chainId, defaultValues }: NetworkFieldsRules) => {
  const isNetworkRpcUrlAlreadyExist = (currentRpcUrl: string) => {
    const rpcUrl = removeTrailingSlash(currentRpcUrl.trim());

    if (
      networks.some(network => removeTrailingSlash(network.rpcUrl.trim()) === rpcUrl) &&
      isNotEmptyString(rpcUrl) &&
      isDefined(defaultValues) &&
      rpcUrl !== removeTrailingSlash(defaultValues.rpcUrl.trim())
    ) {
      return 'Network with this RPC URL already exist';
    }
  };

  const checkIsHttpsLink = (currentValue: string) => httpsRegx.test(currentValue) || 'Only HTTPS are allowed';

  const isChainIdDifferentOfRpcValue = (currentChainId: string) => {
    if (isNotEmptyString(chainId) && currentChainId !== chainId) {
      return `The RPC URL returned a different chain ID (${chainId})`;
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

  const rpcUrlRules = {
    required: commonRules.required,
    validate: { ...commonRules.validate, isNetworkRpcUrlAlreadyExist, checkIsHttpsLink }
  };
  const chainIdRules = {
    ...commonRules,
    validate: { ...commonRules.validate, isChainIdDifferentOfRpcValue }
  };

  return {
    commonRules,
    rpcUrlRules,
    chainIdRules
  };
};
