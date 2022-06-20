import React, { FC } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';

import { styles as buttonStyles } from './button.styles';
import { Theme } from './types';

interface Props extends PressableProps {
  title: string;
  theme?: Theme;
  rightIcon?: IconNameEnum;
  leftIcon?: IconNameEnum;
  iconSize?: number;
}

const defaultIconSize = getCustomSize(2);

export const Button: FC<Props> = ({
  title,
  theme = 'primary',
  rightIcon,
  leftIcon,
  iconSize = defaultIconSize,
  ...restProps
}) => {
  const styles = buttonStyles(theme);

  return (
    <Pressable {...restProps} style={styles.root}>
      <View style={styles.wrapper}>
        {leftIcon && <Icon name={leftIcon} size={iconSize} iconStyle={styles.leftIcon} />}
        <Text style={styles.text}>{title}</Text>
        {rightIcon && <Icon name={rightIcon} size={iconSize} iconStyle={styles.rightIcon} />}
      </View>
    </Pressable>
  );
};
