import { of } from 'rxjs';

import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';

export const getEvmTransferParams$ = ({ receiverPublicKeyHash, amount, asset }: SendAssetPayload) =>
  of({ value: amount, receiverPublicKeyHash, asset });