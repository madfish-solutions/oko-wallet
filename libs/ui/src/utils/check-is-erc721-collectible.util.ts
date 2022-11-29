import { TokenStandardEnum } from '../enums/token-standard.enum';

export const checkIsErc721Collectible = <Token extends { standard?: TokenStandardEnum }>(token: Token) =>
  token.standard === TokenStandardEnum.ERC721;
