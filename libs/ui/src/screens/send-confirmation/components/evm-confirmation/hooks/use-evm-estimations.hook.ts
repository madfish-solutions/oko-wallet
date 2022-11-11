import { useEffect, useMemo, useState } from 'react';

import { Erc20Abi__factory, Erc721abi__factory } from '../../../../../contract-types';
import { AssetTypeEnum } from '../../../../../enums/asset-type.enum';
import { Asset } from '../../../../../interfaces/asset.interface';
import { NetworkInterface } from '../../../../../interfaces/network.interface';
import { getDefaultEvmProvider } from '../../../../../utils/get-default-evm-provider.utils';
import { getAmount } from '../utils/get-amount.util';
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
  asset: { tokenAddress, decimals, tokenId },
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

      let gasLimit;

      if (assetType === AssetTypeEnum.GasToken) {
        gasLimit = await provider
          .estimateGas({ to: receiverPublicKeyHash, value: getAmount(value, decimals) })
          .catch(console.log);
      } else if (assetType === AssetTypeEnum.Collectible) {
        const contract = Erc721abi__factory.connect(tokenAddress, provider);

        gasLimit = await contract.estimateGas
          .transferFrom(publicKeyHash, receiverPublicKeyHash, tokenId)
          .catch(console.log);
      } else {
        const contract = Erc20Abi__factory.connect(tokenAddress, provider);

        gasLimit = await contract.estimateGas
          .transfer(receiverPublicKeyHash, getAmount(value, decimals))
          .catch(console.log);
      }

      const fee = await provider.getFeeData();

      setEstimations({ gasLimit: modifyGasLimit(gasLimit), gasPrice: fee.gasPrice?.toNumber() ?? 0 });
      setIsLoading(false);
    };

    getEstimations();
  }, [rpcUrl, tokenAddress]);

  return useMemo(() => ({ estimations, isLoading }), [estimations, isLoading]);
};
