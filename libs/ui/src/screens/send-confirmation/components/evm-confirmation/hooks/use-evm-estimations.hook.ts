import { useEffect, useMemo, useState } from 'react';

import { Erc20Abi__factory, Erc721Abi__factory, Erc1155Abi__factory } from '../../../../../contract-types';
import { AssetTypeEnum } from '../../../../../enums/asset-type.enum';
import { Asset } from '../../../../../interfaces/asset.interface';
import { NetworkInterface } from '../../../../../interfaces/network.interface';
import { checkIsErc721Collectible } from '../../../../../utils/check-is-erc721-collectible.util';
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
  asset: { tokenAddress, decimals, tokenId, standard },
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

      switch (assetType) {
        case AssetTypeEnum.GasToken:
          gasLimit = await provider
            .estimateGas({ to: receiverPublicKeyHash, value: getAmount(value, decimals) })
            .catch(console.log);
          break;

        case AssetTypeEnum.Collectible:
          const isErc721 = checkIsErc721Collectible({ standard });

          if (isErc721) {
            const contract721 = Erc721Abi__factory.connect(tokenAddress, provider);

            gasLimit = await contract721.estimateGas
              .transferFrom(publicKeyHash, receiverPublicKeyHash, tokenId)
              .catch(console.log);
            break;
          } else {
            const contract1155 = Erc1155Abi__factory.connect(tokenAddress, provider);

            gasLimit = await contract1155.estimateGas
              .safeTransferFrom(publicKeyHash, receiverPublicKeyHash, tokenId, value, [])
              .catch(console.log);
            break;
          }

        default:
          const contract20 = Erc20Abi__factory.connect(tokenAddress, provider);

          gasLimit = await contract20.estimateGas
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
