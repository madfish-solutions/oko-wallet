import { TransactionResponse } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { getDefaultEvmProvider } from '../../utils/get-default-evm-provider.utils';
import { ERC_20_ABI } from '../../utils/transfer-params/constants/evm-erc-20-abi';
import { ERC_721_ABI } from '../../utils/transfer-params/constants/evm-erc-721-abi';
import { GetEvmSignerParams } from '../interfaces/get-evm-signer-params.interface';
import { Shelter } from '../shelter';

export const sendEvmTransactionSubscription = (sendEvmTransaction$: Subject<GetEvmSignerParams>) =>
  sendEvmTransaction$
    .pipe(
      switchMap(({ publicKeyHash, rpcUrl, successCallback, transactionParams, isNft, isGasToken }) => {
        const provider = getDefaultEvmProvider(rpcUrl);

        return Shelter.getEvmSigner$(publicKeyHash, provider).pipe(
          switchMap(signer => {
            const { to, value, gasLimit, gasPrice, tokenAddress, tokenId } = transactionParams;

            if (isGasToken) {
              return signer.sendTransaction({ to, value, gasLimit, gasPrice });
            } else if (isNft) {
              const contract = new ethers.Contract(tokenAddress, ERC_721_ABI, signer);

              return contract.transferFrom(publicKeyHash, to, tokenId, {
                gasLimit,
                gasPrice
              }) as Promise<TransactionResponse>;
            }

            const contract = new ethers.Contract(tokenAddress, ERC_20_ABI, signer);

            return contract.transfer(to, value, {
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
