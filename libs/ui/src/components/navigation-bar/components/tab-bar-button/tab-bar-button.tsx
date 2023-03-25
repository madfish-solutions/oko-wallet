import { emptyFn, OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { ScreensEnum } from '../../../../enums/screens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { TestIDProps } from '../../../../interfaces/test-id.props';
import { colors } from '../../../../styles/colors';
import { Icon } from '../../../icon/icon';
import { IconProps } from '../../../icon/icon.interface';

import { styles } from './tab-bar-button.styles';

type TabBarScreens =
  | ScreensEnum.Wallet
  | ScreensEnum.Receive
  | ScreensEnum.Swap
  | ScreensEnum.SendToken
  | ScreensEnum.Settings;

interface Props extends IconProps, TestIDProps {
  routeName: TabBarScreens;
  focused: boolean;
  disabled?: boolean;
  onDisabledPress?: OnEventFn<void>;
}

export const TabBarButton: FC<Props> = ({
  routeName,
  disabled = false,
  name,
  testID,
  focused,
  onDisabledPress = emptyFn
}) => {
  const { navigate } = useNavigation();
  const color = disabled ? colors.bgGrey5 : focused ? colors.orange : colors.textGrey3;

  const navigateToScreen = () => {
    if (!disabled) {
      return navigate(routeName);
    }

    onDisabledPress();
  };

  return (
    <TouchableOpacity onPress={navigateToScreen} style={styles.root} testID={testID}>
      <Icon name={name} color={color} />
    </TouchableOpacity>
  );
};
