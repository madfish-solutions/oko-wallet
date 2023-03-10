import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { TestIDProps } from '../../interfaces/test-id.props';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Text } from '../text/text';

import { styles } from './mnemonic-action-button.styles';

interface Props extends TestIDProps {
  onPress: OnEventFn<GestureResponderEvent>;
  iconName: IconNameEnum;
  text: string;
  style?: ViewStyleProps;
}

export const MnemonicActionButton: FC<Props> = ({ onPress, iconName, text, style, testID }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]} testID={testID}>
    <Icon name={iconName} iconStyle={styles.buttonIcon} />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);
