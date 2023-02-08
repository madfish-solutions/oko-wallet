import React, { FC } from 'react';
import { Pressable, PressableProps, View } from 'react-native';

import { ViewStyleProps, TextStyleProps } from '../../interfaces/style.interface';
import { TestIDProps } from '../../interfaces/test-id.props';
import { colors } from '../../styles/colors';
import { LoaderSizeEnum } from '../loader/enums';
import { Loader } from '../loader/loader';
import { Text } from '../text/text';

import { styles } from './button.styles';
import { sizeClasses, themeClasses } from './constants';
import { ButtonSizeEnum, ButtonThemesEnum } from './enums';

interface Props extends PressableProps, TestIDProps {
  title: string;
  theme?: ButtonThemesEnum;
  size?: ButtonSizeEnum;
  style?: ViewStyleProps;
  styleText?: TextStyleProps;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: FC<Props> = ({
  title,
  theme = ButtonThemesEnum.Primary,
  size = ButtonSizeEnum.Large,
  style,
  disabled = false,
  loading = false,
  styleText,
  testID,
  ...restProps
}) => (
  <Pressable
    {...restProps}
    disabled={disabled}
    style={[styles.root, themeClasses[theme].button, sizeClasses[size], disabled && styles.disabledButton, style]}
    testID={testID}
  >
    <View style={styles.wrapper}>
      {loading ? (
        <Loader color={colors.textGrey1} size={LoaderSizeEnum.Medium} />
      ) : (
        <Text style={[styles.text, themeClasses[theme].text, disabled && styles.disabledText, styleText]}>{title}</Text>
      )}
    </View>
  </Pressable>
);
