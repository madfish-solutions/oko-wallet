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
}

export const Button: FC<Props> = ({ title, theme = 'primary', rightIcon, leftIcon, ...restProps }) => {
  const styles = buttonStyles(theme);
  const svgSize = getCustomSize(2);

  return (
    <Pressable {...restProps} style={styles.root}>
      <View style={styles.wrapper}>
        {leftIcon && <Icon name={leftIcon} size={svgSize} style={styles.leftIcon} />}
        <Text style={styles.text}>{title}</Text>
        {rightIcon && <Icon name={rightIcon} size={svgSize} style={styles.rightIcon} />}
      </View>
    </Pressable>
  );
};
