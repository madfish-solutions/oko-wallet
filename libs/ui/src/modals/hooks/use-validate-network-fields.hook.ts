import { isDefined, isNotEmptyString } from '@rnw-community/shared';

import { NetworkInterface } from '../../interfaces/network.interface';
import { FormTypes } from '../screens/network/types/form-types.interface';

export const useNetworkFieldsRules = (networks: NetworkInterface[], defaultValues?: FormTypes) => {
  const isNetworkRpcUrlAlreadyExist = (currentRpcUrl: string) => {
    if (
      networks.some(network => network.rpcUrl === currentRpcUrl) &&
      isDefined(defaultValues) &&
      currentRpcUrl !== defaultValues.rpcUrl
    ) {
      return 'Network with this RPC URL already exist';
    }
  };

  const isNetworkChainIdAlreadyExist = (currentChainId: string) => {
    if (
      networks.some(network => network.chainId === currentChainId) &&
      isDefined(defaultValues) &&
      currentChainId !== defaultValues.chainId
    ) {
      return 'Network with this chain ID already exist';
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

  const rpcUrlRules = {
    required: commonRules.required,
    validate: { isNetworkRpcUrlAlreadyExist }
  };
  const chainIdRules = {
    ...commonRules,
    validate: { ...commonRules.validate, isNetworkChainIdAlreadyExist }
  };

  return {
    commonRules,
    rpcUrlRules,
    chainIdRules
  };
};