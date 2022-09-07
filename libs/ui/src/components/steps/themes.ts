import { styles } from './steps.styles';

export enum StepsThemeEnum {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary'
}

export const themesClasses = {
  [StepsThemeEnum.Primary]: styles.primary,
  [StepsThemeEnum.Secondary]: styles.secondary,
  [StepsThemeEnum.Tertiary]: styles.tertiary
};
