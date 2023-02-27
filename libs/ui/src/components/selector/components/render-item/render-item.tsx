import { OnEventFn } from '@rnw-community/shared';
import React, { FC, ReactChild } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import { TestIDProps } from 'src/interfaces/test-id.props';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { Icon } from '../../../icon/icon';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Row } from '../../../row/row';

import { styles } from './render-item.styles';

interface Props extends TestIDProps {
  isActive: boolean;
  onSelectItem: OnEventFn<GestureResponderEvent>;
  rightBottomComponent?: ReactChild;
  leftBottomComponent: ReactChild;
  leftTopComponent: ReactChild;
  style?: ViewStyleProps;
}

export const RenderItem: FC<Props> = ({
  isActive,
  onSelectItem,
  leftBottomComponent,
  leftTopComponent,
  rightBottomComponent = null,
  style,
  testID
}) => (
  <Pressable style={[styles.root, isActive && styles.active, style]} onPress={onSelectItem} testID={testID}>
    <Row style={styles.wrapper}>
      {leftTopComponent}
      {isActive ? <Icon name={IconNameEnum.SelectedCheckbox} /> : <Icon name={IconNameEnum.EmptyCheckbox} />}
    </Row>

    <Row style={styles.wrapper}>
      {leftBottomComponent}
      {rightBottomComponent}
    </Row>
  </Pressable>
);
