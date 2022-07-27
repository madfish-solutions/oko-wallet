import { FeeData, TransactionRequest } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import { Erc20Abi__factory, Erc721abi__factory } from '../../../../../contract-types';
import { AssetTypeEnum } from '../../../../../enums/asset-type.enum';
import { Asset } from '../../../../../interfaces/asset.interface';
import { NetworkInterface } from '../../../../../interfaces/network.interface';
import { getDefaultEvmProvider } from '../../../../../utils/get-default-evm-provider.utils';
import { modifyGasLimit } from '../utils/modify-gas-limit.util';

interface UseEvmEstimationsArgs {
  network: NetworkInterface;
  asset: Asset;
  receiverPublicKeyHash: string;
  value: string;
  publicKeyHash: string;
  assetType: AssetTypeEnum;
}

type Estimations = Pick<FeeData, 'gasPrice'> & Pick<TransactionRequest, 'gasLimit'>;

export const useEvmEstimations = ({
  network: { rpcUrl },
  asset: { tokenAddress, decimals, tokenId },
  receiverPublicKeyHash,
  value,
  publicKeyHash,
  assetType
}: UseEvmEstimationsArgs) => {
  const [estimations, setEstimations] = useState<Estimations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const getEstimations = async () => {
      const provider = getDefaultEvmProvider(rpcUrl);
      const amount = ethers.utils.parseUnits(value, decimals);
      let gasLimit;

      if (assetType === AssetTypeEnum.GasToken) {
        gasLimit = await provider.estimateGas({ to: receiverPublicKeyHash, value: amount }).catch(console.log);
      } else if (assetType === AssetTypeEnum.Collectible) {
        const contract = Erc721abi__factory.connect(tokenAddress, provider);

        gasLimit = await contract.estimateGas
          .transferFrom(publicKeyHash, receiverPublicKeyHash, tokenId)
          .catch(console.log);
      } else {
        const contract = Erc20Abi__factory.connect(tokenAddress, provider);

        gasLimit = await contract.estimateGas.transfer(receiverPublicKeyHash, amount).catch(console.log);
      }

      const fee = await provider.getFeeData();

      setEstimations({ gasLimit: modifyGasLimit(gasLimit), gasPrice: fee.gasPrice });
      setIsLoading(false);
    };

    getEstimations();
  }, [rpcUrl, tokenAddress]);

  return useMemo(() => ({ estimations, isLoading }), [estimations, isLoading]);
};
