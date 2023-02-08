import { EvmChainId } from '../../constants/chain-ids';

export const GAS_CONSUMPTION_FOR_SWAP: Record<string, number> = {
  [EvmChainId.Ethereum]: 0.005,
  [EvmChainId.BinanceSmartChain]: 0.007,
  [EvmChainId.Polygon]: 0.1,
  [EvmChainId.Optimism]: 0.004,
  [EvmChainId.Klaytn]: 0.03
};

export const GREATER_THAN_ZERO_SWAP_ERROR = 'Nothing-to-nothing exchanges are forbidden';
export const UNDER_AVAILABLE_BALANCE_SWAP_ERROR = 'Hold on, bro, top-up your account first';
