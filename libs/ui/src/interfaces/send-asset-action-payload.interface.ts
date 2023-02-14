import { Asset } from '../interfaces/asset.interface';

export interface SendAssetPayload {
  receiverPublicKeyHash: string;
  amount: string;
  asset: Asset;
}
