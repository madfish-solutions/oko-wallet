import { isDefined } from '@rnw-community/shared';
import React, { FC, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';

import { styles } from './tab-bar-button.styles';

enum IconSide {
  Left = 'left',
  Right = 'right'
}

interface Props {
  label?: string;
  // TODO: Add enum
  iconName?: any;
  size?: number;
  side?: IconSide;
  routeName: ScreensEnum;
  focused: boolean;
  disabled?: boolean;
}

export const TabBarButton: FC<Props> = ({ label, side = IconSide.Left, routeName, disabled = false }) => {
  const { navigate } = useNavigation();

  const navigateToScreen = () => navigate(routeName);

  const iconSideStyles = useMemo(() => {
    if (isDefined(label)) {
      if (side === IconSide.Right) {
        return styles.iconRight;
      }

      return styles.iconLeft;
    }

    return null;
  }, [side]);

  return (
    <TouchableOpacity style={styles.root} disabled={disabled} onPress={navigateToScreen}>
      {/* Add icon */}
      {/* <Icon name={iconName} width={size} height={size} color={color} /> */}
      <View style={[styles.iconWrapper, iconSideStyles]}>
        <Text style={styles.icon}>8</Text>
      </View>
      {isDefined(label) && <Text style={styles.lable}>{label}</Text>}
    </TouchableOpacity>
  );
};
