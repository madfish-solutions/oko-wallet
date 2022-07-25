import { TransferParams } from '@taquito/taquito/dist/types/operations/types';
import { from, of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';
import { getString } from '../get-string.utils';
import { createReadOnlyTezosToolkit } from '../tezos-toolkit.utils';
import { tezosFormatUnits } from '../units.utils';

export const getTezosTransferParams$ = (
  { receiverPublicKeyHash, amount, asset }: SendAssetPayload,
  selectedNetwork: NetworkInterface,
  sender: AccountInterface
): Observable<TransferParams> => {
  const { tokenId, tokenAddress, decimals } = asset;
  const { rpcUrl, networkType } = selectedNetwork;
  const senderPublicKeyHash = getString(sender.networksKeys[networkType]?.publicKeyHash);
  const amountBN = tezosFormatUnits(amount, decimals);
  const isFA2Token = tokenId !== '';
  const isTezosToken = tokenAddress === '';

  return !isTezosToken
    ? from(createReadOnlyTezosToolkit(rpcUrl, sender).contract.at(tokenAddress)).pipe(
        map(contract =>
          isFA2Token
            ? contract.methods.transfer([
                {
                  from_: senderPublicKeyHash,
                  txs: [
                    {
                      to_: receiverPublicKeyHash,
                      token_id: Number(tokenId),
                      amount: amountBN
                    }
                  ]
                }
              ])
            : contract.methods.transfer(senderPublicKeyHash, receiverPublicKeyHash, amountBN)
        ),
        map(contractMethod => contractMethod.toTransferParams())
      )
    : of({
        to: receiverPublicKeyHash,
        amount: Number(amount)
      });
};
