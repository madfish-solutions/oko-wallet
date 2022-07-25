import { FeeData, TransactionRequest } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import { NetworkInterface } from '../../../../../interfaces/network.interface';
import { AccountTokenInput } from '../../../../../interfaces/token-input.interface';
import { getDefaultEvmProvider } from '../../../../../utils/get-default-evm-provider.utils';
import { ERC_20_ABI } from '../../../../../utils/transfer-params/constants/evm-erc-20-abi';
import { ERC_721_ABI } from '../../../../../utils/transfer-params/constants/evm-erc-721-abi';
import { modifyGasLimit } from '../utils/modify-gas-limit.util';

interface UseEvmEstimationsArgs {
  network: NetworkInterface;
  asset: AccountTokenInput;
  to: string;
  value: string;
  publicKeyHash: string;
  isGasToken: boolean;
  isNft: boolean;
}

type Estimations = Pick<FeeData, 'gasPrice'> & Pick<TransactionRequest, 'gasLimit'>;

export const useEvmEstimations = ({
  network: { rpcUrl },
  asset: { tokenAddress, decimals, tokenId },
  to,
  value,
  publicKeyHash,
  isGasToken,
  isNft
}: UseEvmEstimationsArgs) => {
  const [estimations, setEstimations] = useState<Estimations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const getEstimations = async () => {
      const provider = getDefaultEvmProvider(rpcUrl);
      const amount = ethers.utils.parseUnits(value, decimals);
      let gasLimit;

      if (isGasToken) {
        gasLimit = await provider.estimateGas({ to, value: amount }).catch(console.log);
      } else if (isNft) {
        const contract = new ethers.Contract(tokenAddress, ERC_721_ABI, provider);

        gasLimit = await contract.estimateGas.transferFrom(publicKeyHash, to, tokenId).catch(console.log);
      } else {
        const contract = new ethers.Contract(tokenAddress, ERC_20_ABI, provider);

        gasLimit = await contract.estimateGas.transfer(to, amount).catch(console.log);
      }

      const fee = await provider.getFeeData();

      setEstimations({ gasLimit: modifyGasLimit(gasLimit), gasPrice: fee.gasPrice });
      setIsLoading(false);
    };

    getEstimations();
  }, [rpcUrl, tokenAddress]);

  return useMemo(() => ({ estimations, isLoading }), [estimations, isLoading]);
};
