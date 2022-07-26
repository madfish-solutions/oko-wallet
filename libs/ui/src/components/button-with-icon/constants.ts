import { styles } from './button-with-icon.styles';
import { ButtonWithIconSizeEnum, ButtonWithIconThemesEnum } from './enums';

export const themeClasses = {
  [ButtonWithIconThemesEnum.Primary]: styles.primary,
  [ButtonWithIconThemesEnum.Secondary]: styles.secondary,
  [ButtonWithIconThemesEnum.Tertiary]: styles.tertiary
};

export const sizeClasses = {
  [ButtonWithIconSizeEnum.Large]: styles.large,
  [ButtonWithIconSizeEnum.Medium]: styles.medium,
  [ButtonWithIconSizeEnum.Small]: styles.small
};
