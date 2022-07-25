import { of } from 'rxjs';

import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';

export const getEvmTransferParams$ = ({ receiverPublicKeyHash, amount, asset }: SendAssetPayload) => {
  const evmTransferParam = {
    value: amount,
    to: receiverPublicKeyHash
  };

  return of({ ...evmTransferParam, asset });
};
