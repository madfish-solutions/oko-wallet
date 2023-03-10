import { OnEventFn, isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

import { TextStyleProps } from '../../../../../interfaces/style.interface';
import { TestIDProps } from '../../../../../interfaces/test-id.props';
import { Column } from '../../../../column/column';
import { IconNameEnum } from '../../../../icon/icon-name.enum';
import { Text } from '../../../../text/text';
import { TouchableIcon } from '../../../../touchable-icon/touchable-icon';

import { styles } from './screen-title.styles';

interface Props extends TestIDProps {
  title?: string;
  onBackButtonPress?: OnEventFn<GestureResponderEvent>;
  numberOfLines?: number;
  titleStyle?: TextStyleProps;
}

export const ScreenTitle: FC<Props> = ({
  title = 'Page',
  onBackButtonPress,
  numberOfLines = 1,
  titleStyle,
  testID
}) => (
  <Column style={styles.root}>
    {isDefined(onBackButtonPress) && (
      <TouchableIcon name={IconNameEnum.ArrowLeft} onPress={onBackButtonPress} style={styles.icon} />
    )}
    <Text style={[styles.title, titleStyle]} numberOfLines={numberOfLines} testID={testID}>
      {title}
    </Text>
  </Column>
);
