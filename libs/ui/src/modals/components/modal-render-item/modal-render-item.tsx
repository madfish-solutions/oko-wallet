import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

import { Column } from '../../../components/column/column';
import { IconWithBorder } from '../../../components/icon-with-border/icon-with-border';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { RenderItem } from '../../../components/selector/components/render-item/render-item';
import { Text } from '../../../components/text/text';
import { TouchableIcon } from '../../../components/touchable-icon/touchable-icon';
import { ModalHeaderInterface } from '../../interfaces/modal-header.interface';

import { styles } from './modal-render-item.styles';

interface Props extends ModalHeaderInterface {
  isActive: boolean;
  onSelectItem: OnEventFn<GestureResponderEvent>;
  onEdit: OnEventFn<GestureResponderEvent>;
}

export const ModalRenderItem: FC<Props> = ({ name, isActive, icon, balanceTitle, balance, onSelectItem, onEdit }) => (
  <RenderItem
    onSelectItem={onSelectItem}
    isActive={isActive}
    leftTopComponent={
      <Row>
        <IconWithBorder>{icon}</IconWithBorder>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </Row>
    }
    leftBottomComponent={
      <Column>
        <Text style={styles.balanceTitle}>{balanceTitle}</Text>
        <Row>{balance}</Row>
      </Column>
    }
    rightBottomComponent={<TouchableIcon name={IconNameEnum.Edit} onPress={onEdit} />}
  />
);
