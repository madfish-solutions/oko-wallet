import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isNotEmptyString } from '@rnw-community/shared';
import { of, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Erc1155Abi__factory, Erc20Abi__factory, Erc721Abi__factory } from '../../contract-types';
import { AssetTypeEnum } from '../../enums/asset-type.enum';
import { getDefaultEvmProvider } from '../../utils/get-default-evm-provider.utils';
import { GetEvmSignerParams } from '../interfaces/get-evm-signer-params.interface';
import { Shelter } from '../shelter';

export const sendEvmTransactionSubscription = (sendEvmTransaction$: Subject<GetEvmSignerParams>) =>
  sendEvmTransaction$
    .pipe(
      switchMap(({ publicKeyHash, rpcUrl, successCallback, transactionParams, errorCallback, assetType }) => {
        const provider = getDefaultEvmProvider(rpcUrl);

        return Shelter.getEvmSigner$(publicKeyHash, provider).pipe(
          switchMap(signer => {
            const { receiverPublicKeyHash, value, gasLimit, gasPrice, tokenAddress, tokenId } = transactionParams;

            switch (assetType) {
              case AssetTypeEnum.GasToken:
                return signer.sendTransaction({ to: receiverPublicKeyHash, value, gasLimit, gasPrice });

              case AssetTypeEnum.Collectible721:
                const contract721 = Erc721Abi__factory.connect(tokenAddress, signer);

                return contract721.transferFrom(publicKeyHash, receiverPublicKeyHash, tokenId as string, {
                  gasLimit,
                  gasPrice
                });

              case AssetTypeEnum.Collectible1155:
                const contract1155 = Erc1155Abi__factory.connect(tokenAddress, signer);

                return contract1155.safeTransferFrom(
                  publicKeyHash,
                  receiverPublicKeyHash,
                  tokenId as string,
                  value,
                  [],
                  {
                    gasLimit,
                    gasPrice
                  }
                );

              default:
                const contract20 = Erc20Abi__factory.connect(tokenAddress, signer);

                return contract20.transfer(receiverPublicKeyHash, value, {
                  gasLimit,
                  gasPrice
                });
            }
          }),
          map((transactionResponse): [TransactionResponse, GetEvmSignerParams['successCallback']] => [
            transactionResponse,
            successCallback
          ]),
          catchError(error => {
            console.log(error);
            errorCallback();

            return of([]);
          })
        );
      })
    )
    .subscribe(([transactionResponse, successCallback]) => {
      if (isNotEmptyString(transactionResponse?.hash)) {
        successCallback(transactionResponse);
      }
    });
