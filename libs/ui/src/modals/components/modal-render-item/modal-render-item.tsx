import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent, Pressable, Text } from 'react-native';

import { Column } from '../../../components/column/column';
import { IconWithBorder } from '../../../components/icon-with-border/icon-with-border';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { TouchableIcon } from '../../../components/touchable-icon/touchable-icon';
import { ViewStyleProps } from '../../../interfaces/style.interface';
import { ModalHeaderInterface } from '../../interfaces/modal-header.interface';

import { styles } from './modal-render-item.styles';

interface Props extends ModalHeaderInterface {
  isActive: boolean;
  onSelectItem: OnEventFn<GestureResponderEvent>;
  onEdit: OnEventFn<GestureResponderEvent>;
  style?: ViewStyleProps;
}

export const ModalRenderItem: FC<Props> = ({
  name,
  isActive,
  icon,
  balanceTitle,
  balance,
  onSelectItem,
  onEdit,
  style
}) => (
  <Pressable style={[styles.root, isActive && styles.active, style]} onPress={onSelectItem}>
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
      <TouchableIcon name={IconNameEnum.Edit} onPress={onEdit} />
    </Row>
  </Pressable>
);
