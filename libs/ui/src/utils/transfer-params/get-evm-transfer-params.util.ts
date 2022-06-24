import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { BigNumber } from 'bignumber.js';
import { ethers } from 'ethers';
import { map, Observable, of } from 'rxjs';

import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';
import { getDefaultEvmProvider } from '../get-default-evm-provider.utils';
import { getString } from '../get-string.utils';

import { ERC20ABI } from './abi';

export const getEvmTransferParams$ = (
  { receiverPublicKeyHash, amount, asset }: SendAssetPayload,
  selectedNetwork: NetworkInterface,
  sender: AccountInterface
): Observable<EvmTransferParams> => {
  const { tokenAddress } = asset;
  const { rpcUrl, networkType } = selectedNetwork;
  const senderPublicKeyHash = getString(sender.networksKeys[networkType]?.publicKeyHash);
  const amountBN = new BigNumber(amount);

  const provider = getDefaultEvmProvider(rpcUrl);
  const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, provider);

  return of(tokenContract).pipe(
    map(contract => contract.connect(senderPublicKeyHash).transfer(receiverPublicKeyHash, amountBN))
  );
};
