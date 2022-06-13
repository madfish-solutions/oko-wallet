import React, { FC, useMemo, SVGProps } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

import { buttonStyles } from './button.styles';
import { ButtonColor } from './types';

interface Props extends PressableProps {
  title: string;
  color?: ButtonColor;
  RightIcon?: FC<SVGProps<SVGElement>>;
  LeftIcon?: FC<SVGProps<SVGElement>>;
}

export const Button: FC<Props> = ({ title, color = 'grey', RightIcon, LeftIcon, ...restProps }) => {
  const ButtonStyles = useMemo(() => buttonStyles(color), [color]);

  return (
    <Pressable {...restProps} style={ButtonStyles.container}>
      <View style={ButtonStyles.contentWrapper}>
        {LeftIcon && <LeftIcon style={ButtonStyles.leftIcon} />}
        <Text style={ButtonStyles.text}>{title}</Text>
        {RightIcon && <RightIcon style={ButtonStyles.rightIcon} />}
      </View>
    </Pressable>
  );
};
