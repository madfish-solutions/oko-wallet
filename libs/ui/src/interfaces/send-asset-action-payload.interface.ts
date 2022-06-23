import { AccountTokenInput } from './token-input.interface';

export interface SendAssetPayload {
  receiverPublicKeyHash: string;
  amount: string;
  asset: AccountTokenInput;
}
