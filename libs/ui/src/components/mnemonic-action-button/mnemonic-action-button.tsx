import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Text } from '../text/text';

import { styles } from './mnemonic-action-button.styles';

interface Props {
  onPress: OnEventFn<GestureResponderEvent>;
  iconName: IconNameEnum;
  text: string;
}

export const MnemonicActionButton: FC<Props> = ({ onPress, iconName, text }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, styles.buttonMarginRight]}>
    <Icon name={iconName} iconStyle={styles.buttonIcon} />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);
