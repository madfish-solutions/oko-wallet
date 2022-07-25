import { AccountTokenInput } from '../../interfaces/token-input.interface';

export interface EvmTransferParams {
  to: string;
  asset: AccountTokenInput;
  value: string;
}
