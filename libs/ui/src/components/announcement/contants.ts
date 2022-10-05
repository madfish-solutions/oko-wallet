import { IconNameEnum } from '../icon/icon-name.enum';

import { styles } from './announcement.styles';
import { MessageType } from './enum';

export const messageTypes = {
  [MessageType.Success]: {
    icon: IconNameEnum.Success,
    style: styles.success
  },
  [MessageType.Warning]: {
    icon: IconNameEnum.WarningYellow,
    style: styles.warning
  },
  [MessageType.Error]: {
    icon: IconNameEnum.Error,
    style: styles.error
  }
};
