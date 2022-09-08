import { ToastsEnum } from '../../../../../enums/toasts.enums';
import { IconNameEnum } from '../../../../icon/icon-name.enum';
import { styles } from '../toast.styles';

export const themes = {
  [ToastsEnum.success]: {
    root: styles.success,
    iconName: IconNameEnum.Success
  },
  [ToastsEnum.warning]: {
    root: styles.warning,
    iconName: IconNameEnum.WarningWhite
  },
  [ToastsEnum.error]: {
    root: styles.error,
    iconName: IconNameEnum.Error
  }
};
