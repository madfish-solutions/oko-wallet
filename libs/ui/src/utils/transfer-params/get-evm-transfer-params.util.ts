import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { map, Observable, switchMap } from 'rxjs';

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
  const { tokenAddress } = asset;
  const { rpcUrl, networkType } = selectedNetwork;
  const senderPublicKeyHash = getString(sender.networksKeys[networkType]?.publicKeyHash);
  const amountBN = ethers.utils.parseUnits(amount, 18);

  const provider = getDefaultEvmProvider(rpcUrl);
  const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, provider);

  return Shelter.getEvmSigner$(senderPublicKeyHash, provider).pipe(
    map(signer => tokenContract.connect(signer)),
    switchMap(tokenSigner => tokenSigner.transfer(receiverPublicKeyHash, amountBN) as Observable<EvmTransferParams>),
    map(params => ({
      ...params,
      gasLimit: params.gasLimit?.toString(),
      gasPrice: params.gasPrice?.toString(),
      value: params.value?.toString()
    }))
  );
};
