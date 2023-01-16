import { ToastsEnum } from '../../../enums/toasts.enums';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { styles } from '../toast.styles';

export const themes = {
  [ToastsEnum.success]: {
    root: styles.success,
    lineColor: styles.successLine,
    iconName: IconNameEnum.Success
  },
  [ToastsEnum.warning]: {
    root: styles.warning,
    lineColor: styles.warningLine,
    iconName: IconNameEnum.WarningWhite
  },
  [ToastsEnum.error]: {
    root: styles.error,
    lineColor: styles.errorLine,
    iconName: IconNameEnum.Error
  },
  [ToastsEnum.info]: {
    root: styles.info,
    lineColor: styles.infoLine,
    iconName: IconNameEnum.InfoToast
  }
};
