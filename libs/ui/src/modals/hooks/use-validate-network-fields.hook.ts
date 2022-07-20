import { isNotEmptyString } from '@rnw-community/shared';

import { NetworkInterface } from '../../interfaces/network.interface';

export const useNetworkFieldsRules = (networks: NetworkInterface[]) => {
  const isNetworkRpcUrlAlreadyExist = (currentRpcUrl: string) => {
    if (networks.some(network => network.rpcUrl === currentRpcUrl)) {
      return 'Network with this RPC URL already exist';
    }
  };
  const isNetworkChainIdAlreadyExist = (currentChainId: string) => {
    if (networks.some(network => network.chainId === currentChainId)) {
      return 'Network with this chain ID already exist';
    }
  };

  const checkIfOnlySpaces = (currentValue?: string) => {
    if (isNotEmptyString(currentValue) && !currentValue.trim()) {
      return '1-21 characters, no special';
    }
  };

  const commonRules = {
    maxLength: {
      value: 21,
      message: 'Maximum 21 symbol'
    },
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
