import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { ViewStyleProps } from '../../../interfaces/style.interface';
import { createEntity } from '../../../store/utils/entity.utils';
import { Icon } from '../../icon/icon';
import { IconProps } from '../../icon/icon.interface';

import { styles } from './tab-bar-button.styles';

interface Props extends IconProps {
  routeName: ScreensEnum;
  focused: boolean;
  disabled?: boolean;
  style?: ViewStyleProps;
}

export const TabBarButton: FC<Props> = ({ routeName, disabled = false, name, color, style, size }) => {
  const { navigate } = useNavigation();

  const navigateToScreen = () => navigate(routeName);

  return (
    <TouchableOpacity
      style={[styles.root, { width: size, height: size }, style]}
      disabled={disabled}
      onPress={navigateToScreen}
    >
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};
