import { Token } from '../../../interfaces/token.interface';
import { AddHideButtonsEnum } from '../enums';

export const showAddHideButton = (
  { tokenAddress, isVisible }: Token,
  tokensAddresses: Token['tokenAddress'][],
  searchValue: string
) => {
  if (tokensAddresses.includes(tokenAddress) || searchValue.length === 0) {
    return null;
  }

  return isVisible ? AddHideButtonsEnum.Hide : AddHideButtonsEnum.Add;
};
