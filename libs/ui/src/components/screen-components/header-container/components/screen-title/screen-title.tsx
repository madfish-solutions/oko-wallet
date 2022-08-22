import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

import { Column } from '../../../../column/column';
import { IconNameEnum } from '../../../../icon/icon-name.enum';
import { Text } from '../../../../text/text';
import { TouchableIcon } from '../../../../touchable-icon/touchable-icon';

import { styles } from './screen-title.styles';

interface Props {
  title: string;
  onBackButtonPress: OnEventFn<GestureResponderEvent>;
}

export const ScreenTitle: FC<Props> = ({ title, onBackButtonPress }) => (
  <Column style={styles.root}>
    <TouchableIcon name={IconNameEnum.ArrowLeft} onPress={onBackButtonPress} style={styles.icon} />
    <Text style={styles.title}>{title}</Text>
  </Column>
);
