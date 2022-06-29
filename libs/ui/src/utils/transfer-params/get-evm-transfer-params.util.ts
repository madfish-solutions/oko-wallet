import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';
import { Shelter } from '../../shelter/shelter';
import { getDefaultEvmProvider } from '../get-default-evm-provider.utils';
import { getString } from '../get-string.utils';

import { ERC20ABI } from './evm-erc20abi';

export const getEvmTransferParams$ = (
  { receiverPublicKeyHash, amount, asset }: SendAssetPayload,
  selectedNetwork: NetworkInterface,
  sender: AccountInterface
): Observable<EvmTransferParams> => {
  const { tokenAddress, decimals } = asset;
  const isGasToken = tokenAddress === '';

  if (isGasToken) {
    return of({
      value: amount,
      to: receiverPublicKeyHash
    });
  }

  const { rpcUrl, networkType } = selectedNetwork;
  const senderPublicKeyHash = getString(sender.networksKeys[networkType]?.publicKeyHash);
  const amountBN = ethers.utils.parseUnits(amount, decimals);
  const provider = getDefaultEvmProvider(rpcUrl);
  const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, provider);

  return Shelter.getEvmSigner$(senderPublicKeyHash, provider).pipe(
    map(signer => tokenContract.connect(signer)),
    switchMap(tokenSigner => tokenSigner.transfer(receiverPublicKeyHash, amountBN) as Observable<EvmTransferParams>),
    map(params => {
      console.log('INSIDER', JSON.stringify(params, null, 2));

      return {
        ...params,
        gasLimit: params.gasLimit?.toString(),
        gasPrice: params.gasPrice?.toString(),
        value: params.value?.toString()
      };
    }),
    catchError(err => {
      console.log('getEvmTransferParams', err);

      return of();
    })
  );
};
