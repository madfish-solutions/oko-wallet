import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable, View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { Column } from '../column/column';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Text } from '../text/text';

import { styles } from './checkbox.styles';

interface Props {
  text: string;
  selected: boolean;
  onSelect: OnEventFn<boolean>;
  style?: ViewStyleProps;
}

export const Checkbox: FC<Props> = ({ text, selected = false, onSelect, style, children }) => {
  const handleToggleCheckbox = () => {
    onSelect(!selected);
  };

  return (
    <Column style={style}>
      <Pressable onPress={handleToggleCheckbox} style={styles.root}>
        {selected ? (
          <Icon name={IconNameEnum.SelectedSquareCheckbox} />
        ) : (
          <Icon name={IconNameEnum.EmptySquareCheckbox} />
        )}
        <Text style={styles.text}>{text}</Text>
      </Pressable>
      {isDefined(children) && <View style={styles.children}>{children}</View>}
    </Column>
  );
};
