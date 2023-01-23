import { EvmChainId } from '../../constants/chain-ids';

export const supportedSwapChainIds: string[] = [
  EvmChainId.Klaytn,
  EvmChainId.Ethereum,
  EvmChainId.BinanceSmartChain,
  EvmChainId.Polygon,
  EvmChainId.Optimism,
  EvmChainId.Arbitrum,
  EvmChainId.Gnosis,
  EvmChainId.Avalanche,
  EvmChainId.Fantom,
  EvmChainId.Aurora
];

export const REFERRER_FEE = 0.5;
export const REFERRER_ADDRESS = '0xF0e72ECf2eD61Fa678Ef17C16ced9537B4BD9C4D';

export const ONE_INCH_GAS_TOKEN_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
export const ONE_INCH_ROUTER_ADDRESS = '0x1111111254eeb25477b68fb85ed929f73a960582';

export const ONE_INCH_SITE = 'https://1inch.io';
export const ONE_INCH_ICON = 'https://cdn.1inch.io/liquidity-sources-logo/1inch.png';
