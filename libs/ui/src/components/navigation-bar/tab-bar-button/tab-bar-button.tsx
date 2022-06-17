import React, { FC } from 'react';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';

import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { Icon, IconProps } from '../../icon/icon';

import { styles } from './tab-bar-button.styles';

interface Props extends IconProps {
  routeName: ScreensEnum;
  focused: boolean;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
}

export const TabBarButton: FC<Props> = ({ routeName, disabled = false, style, ...iconProps }) => {
  const { navigate } = useNavigation();

  const navigateToScreen = () => navigate(routeName);

  return (
    <TouchableOpacity style={[styles.root, style]} disabled={disabled} onPress={navigateToScreen}>
      <Icon {...iconProps} />
    </TouchableOpacity>
  );
};
