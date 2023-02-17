import { TokenStandardEnum } from 'shared';

export const checkIsErc721Collectible = <Token extends { standard?: TokenStandardEnum }>(token: Token) =>
  token.standard === TokenStandardEnum.ERC721;
