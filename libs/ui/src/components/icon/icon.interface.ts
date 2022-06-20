import { StyleProp, ViewStyle } from 'react-native';

import { IconNameEnum } from './icon-name.enum';

export interface IconProps {
  name: IconNameEnum;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  iconStyle?: StyleProp<ViewStyle>;
}
