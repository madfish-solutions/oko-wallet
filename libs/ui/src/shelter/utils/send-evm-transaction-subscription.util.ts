import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { of, Subject } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { tabs } from 'webextension-polyfill';

import { Erc20Abi__factory, Erc721abi__factory } from '../../contract-types';
import { AssetTypeEnum } from '../../enums/asset-type.enum';
import { createDAppResponse } from '../../utils/dapp.utils';
import { getDefaultEvmProvider } from '../../utils/get-default-evm-provider.utils';
import { GetEvmSignerParams } from '../interfaces/get-evm-signer-params.interface';
import { Shelter } from '../shelter';

export const sendEvmTransactionSubscription = (sendEvmTransaction$: Subject<GetEvmSignerParams>) =>
  sendEvmTransaction$
    .pipe(
      switchMap(
        ({ publicKeyHash, rpcUrl, successCallback, transactionParams, errorCallback, assetType, messageID }) => {
          const provider = getDefaultEvmProvider(rpcUrl);

          return Shelter.getEvmSigner$(publicKeyHash, provider).pipe(
            switchMap(signer => {
              const {
                receiverPublicKeyHash,
                value,
                gasLimit,
                gasPrice,
                tokenAddress,
                tokenId,
                data = '0x'
              } = transactionParams;

              if (assetType === AssetTypeEnum.GasToken) {
                return signer.sendTransaction({ to: receiverPublicKeyHash, value, gasLimit, gasPrice, data });
              } else if (assetType === AssetTypeEnum.Collectible) {
                const contract = Erc721abi__factory.connect(tokenAddress, signer);

                return contract.transferFrom(publicKeyHash, receiverPublicKeyHash, tokenId as string, {
                  gasLimit,
                  gasPrice
                });
              }

              const contract = Erc20Abi__factory.connect(tokenAddress, signer);

              return contract.transfer(receiverPublicKeyHash, value as string, {
                gasLimit,
                gasPrice
              });
            }),
            map(
              (
                transactionResponse
              ): [TransactionResponse, GetEvmSignerParams['successCallback'], GetEvmSignerParams['messageID']] => [
                transactionResponse,
                successCallback,
                messageID
              ]
            ),
            catchError(error => {
              console.log(error);
              errorCallback();

              return of([]);
            })
          );
        }
      )
    )
    .subscribe(([transactionResponse, successCallback, messageID]) => {
      if (isNotEmptyString(transactionResponse?.hash)) {
        successCallback(transactionResponse);
        if (isDefined(messageID)) {
          tabs.query({ active: true }).then(queryTabs => {
            if (queryTabs[0].id !== undefined) {
              tabs.sendMessage(queryTabs[0].id, createDAppResponse(messageID, transactionResponse.hash));
            }
          });
        }
      }
    });
