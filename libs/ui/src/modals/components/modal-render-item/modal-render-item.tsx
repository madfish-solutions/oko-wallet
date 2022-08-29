import { OnEventFn } from '@rnw-community/shared';
import React, { FC, ReactChild } from 'react';
import { GestureResponderEvent } from 'react-native';

import { Column } from '../../../components/column/column';
import { IconWithBorder } from '../../../components/icon-with-border/icon-with-border';
import { Row } from '../../../components/row/row';
import { RenderItem } from '../../../components/selector/components/render-item/render-item';
import { Text } from '../../../components/text/text';
import { ModalHeaderInterface } from '../../interfaces/modal-header.interface';

import { styles } from './modal-render-item.styles';

interface Props extends ModalHeaderInterface {
  isActive: boolean;
  onSelectItem: OnEventFn<GestureResponderEvent>;
  rightBottomComponent: ReactChild;
}

export const ModalRenderItem: FC<Props> = ({
  name,
  isActive,
  icon,
  balanceTitle,
  balance,
  onSelectItem,
  rightBottomComponent
}) => (
  <RenderItem
    onSelectItem={onSelectItem}
    isActive={isActive}
    leftTopComponent={
      <Row>
        <IconWithBorder>{icon}</IconWithBorder>
        <Text style={styles.name}>{name}</Text>
      </Row>
    }
    leftBottomComponent={
      <Column>
        <Text style={styles.balanceTitle}>{balanceTitle}</Text>
        <Row>{balance}</Row>
      </Column>
    }
    rightBottomComponent={rightBottomComponent}
  />
);
