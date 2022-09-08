import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable, View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './checkbox.styles';

interface Props {
  text: string;
  selected: boolean;
  onSelect: () => void;
  style?: ViewStyleProps;
}

export const Checkbox: FC<Props> = ({ text, selected = false, onSelect, style, children }) => (
  <Pressable onPress={onSelect} style={style}>
    <Row style={styles.root}>
      {selected ? (
        <Icon name={IconNameEnum.SelectedSquareCheckbox} />
      ) : (
        <Icon name={IconNameEnum.EmptySquareCheckbox} />
      )}
      <Text style={styles.text}>{text}</Text>
    </Row>
    {isDefined(children) && <View style={styles.children}>{children}</View>}
  </Pressable>
);
