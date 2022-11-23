import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { ScreensEnum } from '../../../../enums/sreens.enum';

export interface TokenNavigationBarOption {
  id: number;
  iconName: IconNameEnum;
  routeName: ScreensEnum.SendToken | ScreensEnum.Receive;
  disabled?: boolean;
}

export const tokenNavigationBar: TokenNavigationBarOption[] = [
  {
    id: 1,
    iconName: IconNameEnum.Swap,
    routeName: ScreensEnum.SendToken
  },
  {
    id: 2,
    iconName: IconNameEnum.Receive,
    routeName: ScreensEnum.Receive
  },
  {
    id: 3,
    iconName: IconNameEnum.Send,
    routeName: ScreensEnum.SendToken
  },
  {
    id: 4,
    iconName: IconNameEnum.Topup,
    routeName: ScreensEnum.SendToken,
    disabled: true
  }
];
