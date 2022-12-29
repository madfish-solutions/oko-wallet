import { useEffect, useMemo, useState } from 'react';

import { AssetTypeEnum } from '../../../../../enums/asset-type.enum';
import { Asset } from '../../../../../interfaces/asset.interface';
import { NetworkInterface } from '../../../../../interfaces/network.interface';
import { getDefaultEvmProvider } from '../../../../../utils/get-default-evm-provider.utils';
import { getGasLimit } from '../utils/get-gas-limit.util';
import { modifyGasLimit } from '../utils/modify-gas-limit.util';

interface UseEvmEstimationsArgs {
  network: NetworkInterface;
  asset: Asset;
  receiverPublicKeyHash: string;
  value: string;
  publicKeyHash: string;
  assetType: AssetTypeEnum;
}

export const useEvmEstimations = ({
  network: { rpcUrl },
  asset,
  receiverPublicKeyHash,
  value,
  publicKeyHash,
  assetType
}: UseEvmEstimationsArgs) => {
  const [estimations, setEstimations] = useState<{ gasLimit: number; gasPrice: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const getEstimations = async () => {
      const provider = getDefaultEvmProvider(rpcUrl);

      const [gasLimitPromiseResult, feePromiseResult] = await Promise.allSettled([
        getGasLimit(asset, assetType, receiverPublicKeyHash, publicKeyHash, value, rpcUrl),
        provider.getFeeData()
      ]);
      const gasLimit = gasLimitPromiseResult.status === 'fulfilled' ? gasLimitPromiseResult.value : undefined;
      const gasPrice = feePromiseResult.status === 'fulfilled' ? feePromiseResult.value.gasPrice?.toNumber() ?? 0 : 0;

      setEstimations({ gasLimit: modifyGasLimit(gasLimit), gasPrice });
      setIsLoading(false);
    };

    getEstimations();
  }, [rpcUrl, asset.tokenAddress]);

  return useMemo(() => ({ estimations, isLoading }), [estimations, isLoading]);
};
