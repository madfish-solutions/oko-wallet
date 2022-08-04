import { isDefined, isNotEmptyString } from '@rnw-community/shared';

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

  const isNetworkChainIdAlreadyExist = (currentChainId: string) => {
    const chainId = currentChainId.trim();

    if (
      networks.some(network => network.chainId === chainId) &&
      isDefined(defaultValues) &&
      chainId !== defaultValues.chainId
    ) {
      return 'Network with this chain ID already exist';
    }
  };

  const isChainIdDifferentOfRpcValue = (currentChainId: string) => {
    if (isNotEmptyString(chainId) && currentChainId !== chainId) {
      return `The RPC URL returned a different chain ID (${chainId})`;
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
    validate: { ...commonRules.validate, isNetworkRpcUrlAlreadyExist }
  };
  const chainIdRules = {
    ...commonRules,
    validate: { ...commonRules.validate, isNetworkChainIdAlreadyExist, isChainIdDifferentOfRpcValue }
  };

  return {
    commonRules,
    rpcUrlRules,
    chainIdRules
  };
};
