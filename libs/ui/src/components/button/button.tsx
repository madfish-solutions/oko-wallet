import React, { FC } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

import { styles as buttonStyles } from './button.styles';
import { Theme, Icon } from './types';

interface Props extends PressableProps {
  title: string;
  theme?: Theme;
  RightIcon?: Icon;
  LeftIcon?: Icon;
}

export const Button: FC<Props> = ({ title, theme = 'primary', RightIcon, LeftIcon, ...restProps }) => {
  const styles = buttonStyles(theme);

  return (
    <Pressable {...restProps} style={styles.root}>
      <View style={styles.wrapper}>
        {LeftIcon && <LeftIcon style={styles.leftIcon} />}
        <Text style={styles.text}>{title}</Text>
        {RightIcon && <RightIcon style={styles.rightIcon} />}
      </View>
    </Pressable>
  );
};
