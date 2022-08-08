import { Asset } from '../../interfaces/asset.interface';

export interface EvmTransferParams {
  receiverPublicKeyHash: string;
  asset: Asset;
  value: string;
}
