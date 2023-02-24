import { TransferParams } from '@taquito/taquito/dist/types/operations/types';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AssetTypeEnum } from '../../enums/asset-type.enum';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';
import { getAssetType } from '../get-asset-type.util';
import { getString } from '../get-string.utils';
import { createReadOnlyTezosToolkit } from '../tezos-toolkit.utils';
import { parseUnits } from '../units.utils';

export const getTezosTransferParams$ = (
  { receiverPublicKeyHash, amount, token }: SendAssetPayload,
  selectedNetwork: NetworkInterface,
  sender: AccountInterface
): Observable<TransferParams> => {
  const { tokenId, tokenAddress, decimals } = token;
  const { rpcUrl, networkType } = selectedNetwork;
  const senderPublicKeyHash = getString(sender.networksKeys[networkType]?.publicKeyHash);
  const amountBN = parseUnits(amount, decimals);
  const assetType = getAssetType(token);

  return assetType === AssetTypeEnum.GasToken
    ? of({
        to: receiverPublicKeyHash,
        amount: Number(amount)
      })
    : from(createReadOnlyTezosToolkit(rpcUrl, sender).contract.at(tokenAddress)).pipe(
        map(contract =>
          assetType === AssetTypeEnum.Collectible
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
      );
};
