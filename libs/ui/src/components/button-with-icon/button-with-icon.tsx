import React, { FC } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { colors } from '../../styles/colors';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';

import { styles } from './button-with-icon.styles';
import { sizeClasses, themeClasses } from './constants';

interface Props extends PressableProps {
  title: string;
  theme?: keyof typeof themeClasses;
  size?: keyof typeof sizeClasses;
  rightIcon?: IconNameEnum;
  leftIcon?: IconNameEnum;
  iconSize?: number;
  style?: ViewStyleProps;
  disabled?: boolean;
}

export const ButtonWithIcon: FC<Props> = ({
  title,
  theme = 'primary',
  size = 'large',
  rightIcon,
  leftIcon,
  iconSize,
  style,
  disabled = false,
  ...restProps
}) => (
  <Pressable
    {...restProps}
    disabled={disabled}
    style={[styles.root, theme === 'tertiay' && styles.containerTertiary, style]}
  >
    <View style={styles.wrapper}>
      {leftIcon && (
        <Icon
          name={leftIcon}
          size={iconSize}
          color={disabled ? colors.bgGrey5 : colors.orange}
          iconStyle={styles.leftIcon}
        />
      )}
      <Text style={[themeClasses[theme], sizeClasses[size], disabled && styles.textDisabled]}>{title}</Text>
      {rightIcon && (
        <Icon
          name={rightIcon}
          size={iconSize}
          color={disabled ? colors.bgGrey5 : colors.orange}
          iconStyle={styles.rightIcon}
        />
      )}
    </View>
  </Pressable>
);
