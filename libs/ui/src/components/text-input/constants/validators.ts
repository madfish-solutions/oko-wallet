import { TextInputTypesEnum } from '../enums';

export const validators: { [K in TextInputTypesEnum]: RegExp } = {
  [TextInputTypesEnum.Float]: /[^\d.]+/g
};
