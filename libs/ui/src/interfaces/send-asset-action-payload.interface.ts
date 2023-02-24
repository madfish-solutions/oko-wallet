import { Token } from './token.interface';

export interface SendAssetPayload {
  receiverPublicKeyHash: string;
  amount: string;
  token: Token;
}
