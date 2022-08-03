import { ToastsEnum } from '../../../../../enums/toasts.enums';
import { IconNameEnum } from '../../../../icon/icon-name.enum';
import { styles } from '../toast.styles';

export const themeClasses = {
  [ToastsEnum.success]: {
    root: styles.rootSuccess,
    iconName: IconNameEnum.Success
  },
  [ToastsEnum.warning]: {
    root: styles.rootWarning,
    iconName: IconNameEnum.Warning
  },
  [ToastsEnum.error]: {
    root: styles.rootError,
    iconName: IconNameEnum.Error
  }
};
