import React, { FC } from 'react';
import { View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { Icon } from '../icon/icon';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './announcement.styles';
import { messageTypes } from './contants';
import { MessageType } from './enum';

interface Props {
  text: string;
  numberOfLines?: number;
  type?: MessageType;
  style?: ViewStyleProps;
}

export const Announcement: FC<Props> = ({ text, type = MessageType.Warning, numberOfLines, style }) => (
  <Row style={[styles.root, messageTypes[type].style, style]}>
    <Icon name={messageTypes[type].icon} iconStyle={styles.icon} />
    <View style={styles.textWrapper}>
      <Text style={styles.text} numberOfLines={numberOfLines}>
        {text}
      </Text>
    </View>
  </Row>
);
