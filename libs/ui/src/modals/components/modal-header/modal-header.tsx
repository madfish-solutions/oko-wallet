import React, { FC, ReactElement } from 'react';
import { View } from 'react-native';

import { IconWithBorderEnum } from '../../../components/icon-with-border/enums';
import { IconWithBorder } from '../../../components/icon-with-border/icon-with-border';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ViewStyleProps } from '../../../interfaces/style.interface';
import { ModalHeaderInterface } from '../../interfaces/modal-header.interface';

import { styles } from './modal-header.styles';

interface Props extends ModalHeaderInterface {
  rightTopComponent?: ReactElement;
  rightBottomComponent?: ReactElement;
  style?: ViewStyleProps;
}

export const ModalHeader: FC<Props> = ({
  name,
  balanceTitle,
  balance,
  icon,
  rightTopComponent,
  rightBottomComponent,
  style
}) => (
  <Row style={[styles.root, style]}>
    <IconWithBorder type={IconWithBorderEnum.Quaternary} style={styles.icon}>
      {icon}
    </IconWithBorder>
    <View style={styles.textContainer}>
      <Row style={styles.row}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        {rightTopComponent}
      </Row>
      <Row style={styles.row}>
        <View>
          <Text style={styles.balanceTitle}>{balanceTitle}</Text>
          <Row>{balance}</Row>
        </View>
        {rightBottomComponent}
      </Row>
    </View>
  </Row>
);
