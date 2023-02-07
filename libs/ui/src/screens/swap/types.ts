import { Token } from '../../interfaces/token.interface';

export interface FormTypes {
  fromToken?: Token;
  toToken?: Token;
  fromAmount: string;
  toAmount: string;
}
