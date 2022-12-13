import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isNotEmptyString } from '@rnw-community/shared';
import { of, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Erc1155Abi__factory, Erc20Abi__factory, Erc721Abi__factory } from '../../contract-types';
import { AssetTypeEnum } from '../../enums/asset-type.enum';
import { checkIsErc721Collectible } from '../../utils/check-is-erc721-collectible.util';
import { getDefaultEvmProvider } from '../../utils/get-default-evm-provider.utils';
import { GetEvmSignerParams } from '../interfaces/get-evm-signer-params.interface';
import { Shelter } from '../shelter';

export const sendEvmTransactionSubscription = (sendEvmTransaction$: Subject<GetEvmSignerParams>) =>
  sendEvmTransaction$
    .pipe(
      switchMap(({ publicKeyHash, rpcUrl, successCallback, transactionParams, errorCallback, assetType, standard }) => {
        const provider = getDefaultEvmProvider(rpcUrl);

        return Shelter.getEvmSigner$(publicKeyHash, provider).pipe(
          switchMap(signer => {
            const {
              receiverPublicKeyHash,
              value,
              gasLimit,
              gasPrice,
              tokenAddress,
              tokenId = '0',
              data = '0x'
            } = transactionParams;

            switch (assetType) {
              case AssetTypeEnum.GasToken:
                if (value !== '0') {
                  return signer.sendTransaction({ to: receiverPublicKeyHash, value, gasLimit, gasPrice, data });
                }

                return signer.sendTransaction({ gasLimit, gasPrice, data });

              case AssetTypeEnum.Collectible:
                const isErc721 = checkIsErc721Collectible({ standard });

                if (isErc721) {
                  const contract721 = Erc721Abi__factory.connect(tokenAddress, signer);

                  return contract721.transferFrom(publicKeyHash, receiverPublicKeyHash, tokenId, {
                    gasLimit,
                    gasPrice
                  });
                }
                const contract1155 = Erc1155Abi__factory.connect(tokenAddress, signer);

                return contract1155.safeTransferFrom(publicKeyHash, receiverPublicKeyHash, tokenId, value, [], {
                  gasLimit,
                  gasPrice
                });

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
