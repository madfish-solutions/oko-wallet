import { isDefined } from '@rnw-community/shared';

export const getValueWithMaxSymbolsAfterDot = (value: string, maxSymbolsAfterDot: number) => {
  const [firstPart, secondPart] = value.split('.');

  return isDefined(secondPart) ? `${firstPart}.${secondPart.slice(0, maxSymbolsAfterDot)}` : value;
};
