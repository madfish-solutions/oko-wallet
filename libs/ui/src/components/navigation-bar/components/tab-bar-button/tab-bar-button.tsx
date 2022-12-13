import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { TestIDProps } from 'src/interfaces/test-id.props';

import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { colors } from '../../../../styles/colors';
import { Icon } from '../../../icon/icon';
import { IconProps } from '../../../icon/icon.interface';

import { styles } from './tab-bar-button.styles';

type TabBarScreens = ScreensEnum.Wallet | ScreensEnum.Receive | ScreensEnum.SendToken | ScreensEnum.Settings;

interface Props extends IconProps, TestIDProps {
  routeName?: TabBarScreens;
  focused: boolean;
  disabled?: boolean;
}

export const TabBarButton: FC<Props> = ({ routeName, disabled = false, name, testID, focused }) => {
  const { navigate } = useNavigation();

  const navigateToScreen = () => {
    if (isDefined(routeName)) {
      navigate(routeName);
    }
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={navigateToScreen} style={styles.root} testID={testID}>
      <Icon name={name} color={focused ? colors.orange : colors.textGrey3} />
    </TouchableOpacity>
  );
};
