import React, { FC } from 'react';
import { View } from 'react-native';

import { Icon } from '../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../components/icon/icon-name.enum';
import { Text } from '../../../../../components/text/text';

import { styles } from './permission.style';

interface Props {
  iconName: IconNameEnum;
  text: string;
}

export const Permission: FC<Props> = ({ iconName, text }) => (
  <View style={styles.root}>
    <Icon name={iconName} />
    <Text style={styles.label}>{iconName === IconNameEnum.LockOpen ? 'ALLOWED' : 'BLOCKED'}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);
