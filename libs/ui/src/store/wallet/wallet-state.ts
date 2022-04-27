import { MAINNET_TOKENS_METADATA } from '../../constants/token/tokens-metadata';
import { TokenMetadataInterface } from '../../interfaces/token';
import { getTokenSlug } from '../../utils/get-token-slug.util';

export interface WalletState {
  tokensMetadata: Record<string, TokenMetadataInterface>;
}

export const walletInitialState: WalletState = {
  tokensMetadata: MAINNET_TOKENS_METADATA.reduce(
    (obj, tokenMetadata) => ({
      ...obj,
      [getTokenSlug(tokenMetadata)]: tokenMetadata
    }),
    {}
  )
};

export interface WalletRootState {
  wallet: WalletState;
}
