import { of } from 'rxjs';
import { NetworkTypeEnum, AccountInterface } from 'shared';

import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';
import { getTransactionParams } from '../../screens/send-confirmation/components/evm-confirmation/utils/get-transaction-params.util';
import { getPublicKeyHash } from '../../store/wallet/wallet.utils';

export const getEvmTransferParams$ = (
  { receiverPublicKeyHash, amount, token }: SendAssetPayload,
  sender: AccountInterface
) => {
  const transactionParams = getTransactionParams(
    token,
    receiverPublicKeyHash,
    getPublicKeyHash(sender, NetworkTypeEnum.EVM),
    amount
  );

  return of({ value: amount, receiverPublicKeyHash, token, transactionParams });
};
