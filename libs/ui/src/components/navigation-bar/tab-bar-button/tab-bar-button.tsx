import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { Icon, IconProps } from '../../icon/icon';

import { styles } from './tab-bar-button.styles';

interface Props extends IconProps {
  routeName: ScreensEnum;
  focused: boolean;
  disabled?: boolean;
}

export const TabBarButton: FC<Props> = ({ routeName, disabled = false, ...iconProps }) => {
  const { navigate } = useNavigation();

  const navigateToScreen = () => navigate(routeName);

  return (
    <TouchableOpacity style={styles.root} disabled={disabled} onPress={navigateToScreen}>
      <Icon {...iconProps} />
    </TouchableOpacity>
  );
};
