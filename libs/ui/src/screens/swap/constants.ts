import { EvmChainId } from '../../constants/chain-ids';

export const gasConsumptionForSwap: Record<string, number> = {
  [EvmChainId.Ethereum]: 0.005,
  [EvmChainId.BinanceSmartChain]: 0.007,
  [EvmChainId.Polygon]: 0.1,
  [EvmChainId.Optimism]: 0.004,
  [EvmChainId.Klaytn]: 0.03
};
