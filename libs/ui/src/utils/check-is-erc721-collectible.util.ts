import { TokenStandardEnum } from '../enums/token-standard.enum';
import { Token } from '../interfaces/token.interface';

export const checkIsErc721Collectible = (token: Token) => token.standard === TokenStandardEnum.ERC721;
