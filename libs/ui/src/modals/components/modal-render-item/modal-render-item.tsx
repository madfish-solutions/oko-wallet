import React, { FC, ReactChild } from 'react';
import { Pressable, Text } from 'react-native';

import { Column } from '../../../components/column/column';
import { IconWithBorder } from '../../../components/icon-with-border/icon-with-border';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { TouchableIcon } from '../../../components/touchable-icon/touchable-icon';
import { ViewStyleProps } from '../../../interfaces/style.interface';

import { styles } from './modal-render-item.styles';

interface Props {
  name: string;
  isActive: boolean;
  icon: ReactChild;
  balanceTitle: string;
  balance: ReactChild;
  onPress: () => void;
  style?: ViewStyleProps;
}

export const ModalRenderItem: FC<Props> = ({ name, isActive, icon, balanceTitle, balance, onPress, style }) => (
  <Pressable style={[styles.root, isActive && styles.active, style]} onPress={onPress}>
    <Row style={[styles.wrapper, styles.marginBottom]}>
      <Row>
        <IconWithBorder>{icon}</IconWithBorder>
        <Text style={styles.name}>{name}</Text>
      </Row>
      {isActive ? <Icon name={IconNameEnum.SelectedCheckbox} /> : <Icon name={IconNameEnum.EmptyCheckbox} />}
    </Row>

    <Row style={styles.wrapper}>
      <Column>
        <Text style={styles.balanceTitle}>{balanceTitle}</Text>
        <Row>{balance}</Row>
      </Column>
      <TouchableIcon name={IconNameEnum.Edit} />
    </Row>
  </Pressable>
);
