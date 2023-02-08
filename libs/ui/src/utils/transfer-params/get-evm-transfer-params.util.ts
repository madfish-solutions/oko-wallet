import { of } from 'rxjs';

import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { AccountInterface } from '../../interfaces/account.interface';
import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';
import { getTransactionParams } from '../../screens/send-confirmation/components/evm-confirmation/utils/get-transaction-params.util';
import { getPublicKeyHash } from '../../store/wallet/wallet.utils';

export const getEvmTransferParams$ = (
  { receiverPublicKeyHash, amount, asset }: SendAssetPayload,
  sender: AccountInterface
) => {
  const transactionParams = getTransactionParams(
    asset,
    receiverPublicKeyHash,
    getPublicKeyHash(sender, NetworkTypeEnum.EVM),
    amount
  );

  return of({ value: amount, receiverPublicKeyHash, asset, transactionParams });
};
