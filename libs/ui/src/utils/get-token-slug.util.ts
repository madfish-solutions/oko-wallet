import { isString } from "./is-string.util";

import { TEZ_TOKEN_SLUG } from "../constants/token/tokens-metadata";

export const getTokenSlug = <T extends { address: string; tokenId?: number }>({ address, tokenId }: T) =>
  isString(address) ? `${address}_${tokenId ?? 0}` : TEZ_TOKEN_SLUG;
