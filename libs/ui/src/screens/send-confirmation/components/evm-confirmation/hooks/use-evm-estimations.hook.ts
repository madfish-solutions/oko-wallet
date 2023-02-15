import { useEffect, useMemo, useState } from 'react';
import { getDefaultEvmProvider } from 'shelter/utils/get-default-evm-provider.utils';

import { Asset } from '../../../../../interfaces/asset.interface';
import { NetworkInterface } from '../../../../../interfaces/network.interface';
import { EMPTY_GAS } from '../../../constants';
import { getGasLimit } from '../utils/get-gas-limit.util';
import { modifyGasLimit } from '../utils/modify-gas-limit.util';

interface UseEvmEstimationsArgs {
  network: NetworkInterface;
  asset: Asset;
  receiverPublicKeyHash: string;
  value: string;
  publicKeyHash: string;
  gas: number;
}

export const useEvmEstimations = ({
  network: { rpcUrl },
  asset,
  receiverPublicKeyHash,
  value,
  publicKeyHash,
  gas
}: UseEvmEstimationsArgs) => {
  const [estimations, setEstimations] = useState<{ gasLimit: number; gasPrice: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const getEstimations = async () => {
      const provider = getDefaultEvmProvider(rpcUrl);

      const [gasLimitPromiseResult, feePromiseResult] = await Promise.allSettled([
        gas === EMPTY_GAS
          ? getGasLimit(asset, receiverPublicKeyHash, publicKeyHash, value, rpcUrl)
          : Promise.resolve(gas),
        provider.getFeeData()
      ]);
      const gasLimit = gasLimitPromiseResult.status === 'fulfilled' ? gasLimitPromiseResult.value : undefined;
      const gasPrice = feePromiseResult.status === 'fulfilled' ? feePromiseResult.value.gasPrice?.toNumber() ?? 0 : 0;

      setEstimations({ gasLimit: modifyGasLimit(gasLimit, gas), gasPrice });
      setIsLoading(false);
    };

    getEstimations();
  }, [rpcUrl, asset.tokenAddress]);

  return useMemo(() => ({ estimations, isLoading }), [estimations, isLoading]);
};
