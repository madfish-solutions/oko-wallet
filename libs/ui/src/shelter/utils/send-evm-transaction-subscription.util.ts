import { TransactionResponse } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AssetTypeEnum } from '../../enums/asset-type.enum';
import { getDefaultEvmProvider } from '../../utils/get-default-evm-provider.utils';
import { ERC_20_ABI } from '../../utils/transfer-params/constants/evm-erc-20-abi';
import { ERC_721_ABI } from '../../utils/transfer-params/constants/evm-erc-721-abi';
import { GetEvmSignerParams } from '../interfaces/get-evm-signer-params.interface';
import { Shelter } from '../shelter';

export const sendEvmTransactionSubscription = (sendEvmTransaction$: Subject<GetEvmSignerParams>) =>
  sendEvmTransaction$
    .pipe(
      switchMap(({ publicKeyHash, rpcUrl, successCallback, transactionParams, assetType }) => {
        const provider = getDefaultEvmProvider(rpcUrl);

        return Shelter.getEvmSigner$(publicKeyHash, provider).pipe(
          switchMap(signer => {
            const { receiverPublicKeyHash, value, gasLimit, gasPrice, tokenAddress, tokenId } = transactionParams;

            if (assetType === AssetTypeEnum.GasToken) {
              return signer.sendTransaction({ to: receiverPublicKeyHash, value, gasLimit, gasPrice });
            } else if (assetType === AssetTypeEnum.Collectible) {
              const contract = new ethers.Contract(tokenAddress, ERC_721_ABI, signer);

              return contract.transferFrom(publicKeyHash, receiverPublicKeyHash, tokenId, {
                gasLimit,
                gasPrice
              }) as Promise<TransactionResponse>;
            }

            const contract = new ethers.Contract(tokenAddress, ERC_20_ABI, signer);

            return contract.transfer(receiverPublicKeyHash, value, {
              gasLimit,
              gasPrice
            }) as Promise<TransactionResponse>;
          }),
          map((transactionResponse): [TransactionResponse, GetEvmSignerParams['successCallback']] => [
            transactionResponse,
            successCallback
          ])
        );
      })
    )
    .subscribe(([transactionResponse, successCallback]) => successCallback(transactionResponse));
