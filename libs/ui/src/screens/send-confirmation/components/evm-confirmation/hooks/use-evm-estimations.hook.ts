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
      const gasLimit = await getGasLimit(asset, assetType, receiverPublicKeyHash, publicKeyHash, value, rpcUrl);
      const fee = await provider.getFeeData();

      setEstimations({ gasLimit: modifyGasLimit(gasLimit), gasPrice: fee.gasPrice?.toNumber() ?? 0 });
      setIsLoading(false);
    };

    getEstimations();
  }, [rpcUrl, asset.tokenAddress]);

  return useMemo(() => ({ estimations, isLoading }), [estimations, isLoading]);
};
