import { ViewStyleProps } from '../../interfaces/style.interface';

import { IconNameEnum } from './icon-name.enum';

export interface IconProps {
  name: IconNameEnum;
  size?: number | string;
  width?: number;
  height?: number;
  color?: string;
  iconStyle?: ViewStyleProps;
}
