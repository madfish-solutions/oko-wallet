import { styles } from './modal-account-balance.styles';

export enum AccountBalanceEnum {
  Small = 'small',
  medium = 'medium'
}

export const themeClasses = {
  [AccountBalanceEnum.Small]: styles.small,
  [AccountBalanceEnum.medium]: styles.medium
};
