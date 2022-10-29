import { isDefined, OnEventFn } from '@rnw-community/shared';
import React from 'react';
import { Pressable, View } from 'react-native';

import { useNavigation } from '../../hooks/use-navigation.hook';
import { Button } from '../button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../button/enums';
import { Column } from '../column/column';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Text } from '../text/text';

import { styles } from './dropdown.styles';
import { Option } from './option.interface';

interface Props<OptionType> {
  description?: string;
  onSelect: OnEventFn<Option<OptionType>>;
  selectedId?: number;
  options: Option<OptionType>[];
  testID?: string;
}

export const Dropdown = <OptionType,>({ description, selectedId, onSelect, options, testID }: Props<OptionType>) => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <Column style={styles.container}>
        {isDefined(description) && <Text style={styles.description}>{description}</Text>}

        <Column style={styles.wrapper}>
          {options.map(({ id, title, value, testID }) => (
            <Pressable key={id} onPress={() => onSelect({ id, title, value })} style={styles.item} testID={testID}>
              <Text style={styles.title}>{title}</Text>

              <Icon
                name={(selectedId ?? options[0].id) === id ? IconNameEnum.SelectedCheckbox : IconNameEnum.EmptyCheckbox}
              />
            </Pressable>
          ))}
        </Column>
      </Column>

      <View style={styles.footer}>
        <Button
          title="Cancel"
          theme={ButtonThemesEnum.Primary}
          size={ButtonSizeEnum.Large}
          onPress={goBack}
          style={styles.cancelButton}
          testID={testID}
        />
      </View>
    </View>
  );
};
