import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC, PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { TestIDProps } from '../../interfaces/test-id.props';
import { Column } from '../column/column';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Text } from '../text/text';

import { styles } from './checkbox.styles';

type Props = PropsWithChildren<{
  text: string;
  selected: boolean;
  onSelect: OnEventFn<boolean>;
  style?: ViewStyleProps;
}> &
  TestIDProps;

export const Checkbox: FC<Props> = ({ text, selected = false, onSelect, style, children, testID }) => {
  const handleToggleCheckbox = () => {
    onSelect(!selected);
  };

  return (
    <Column style={style}>
      <Pressable style={styles.root} onPress={handleToggleCheckbox} testID={testID}>
        {selected ? (
          <Icon name={IconNameEnum.SelectedSquareCheckboxSmall} />
        ) : (
          <Icon name={IconNameEnum.EmptySquareCheckboxSmall} />
        )}
        <Text style={styles.text}>{text}</Text>
      </Pressable>
      {isDefined(children) && <View style={styles.children}>{children}</View>}
    </Column>
  );
};
