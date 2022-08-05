import { TokenItemThemesEnum } from './enums';
import { styles } from './token-item.styles';

export const themeClasses = {
  [TokenItemThemesEnum.Primary]: {
    root: styles.rootPrimary,
    image: styles.imagePrimary
  },
  [TokenItemThemesEnum.Secondary]: {
    root: styles.rootSecondary,
    image: styles.imageSecondary
  }
};

export const MAXIMUM_NAME_LENGTH = 14;
