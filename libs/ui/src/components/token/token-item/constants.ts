import { TokenItemThemesEnum } from './enums';
import { styles } from './token-item.styles';

export const themeClasses = {
  [TokenItemThemesEnum.Primary]: {
    root: styles.rootPrimary,
    image: styles.imagePrimary,
    text: styles.textPrimary
  },
  [TokenItemThemesEnum.Secondary]: {
    root: styles.rootSecondary,
    image: styles.imageSecondary,
    text: styles.textSecondary
  }
};
