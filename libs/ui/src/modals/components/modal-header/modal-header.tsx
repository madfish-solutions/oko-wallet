import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { IconWithBorder } from '../../../components/icon-with-border/icon-with-border';
import { Row } from '../../../components/row/row';
import { ViewStyleProps } from '../../../interfaces/style.interface';
import { ModalHeaderInterface } from '../../interfaces/modal-header.interface';

import { styles } from './modal-header.styles';

interface Props extends ModalHeaderInterface {
  style?: ViewStyleProps;
}

export const ModalHeader: FC<Props> = ({ name, balanceTitle, balance, icon, style }) => (
  <Row style={style}>
    <IconWithBorder type="quaternary" style={styles.icon}>
      {icon}
    </IconWithBorder>
    <View>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.balanceTitle}>{balanceTitle}</Text>
      <Row>{balance}</Row>
    </View>
  </Row>
);
