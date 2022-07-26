import { Asset } from './asset.interface';

export interface SendAssetPayload {
  receiverPublicKeyHash: string;
  amount: string;
  asset: Asset;
}
