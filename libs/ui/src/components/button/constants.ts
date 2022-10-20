import { styles } from './button.styles';
import { ButtonSizeEnum, ButtonThemesEnum } from './enums';

export const themeClasses = {
  [ButtonThemesEnum.Primary]: {
    button: styles.buttonPrimary,
    text: styles.textPrimary
  },
  [ButtonThemesEnum.Secondary]: {
    button: styles.buttonSecondary,
    text: styles.textSecondary
  },
  [ButtonThemesEnum.Ternary]: {
    button: styles.buttonTernary,
    text: styles.textTernary
  }
};

export const sizeClasses = {
  [ButtonSizeEnum.Large]: styles.large,
  [ButtonSizeEnum.Medium]: styles.medium,
  [ButtonSizeEnum.Small]: styles.small,
  [ButtonSizeEnum.Fluid]: styles.fluid,
  [ButtonSizeEnum.Auto]: styles.auto
};
