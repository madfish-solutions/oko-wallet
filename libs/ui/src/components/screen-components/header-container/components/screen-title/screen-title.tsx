import { OnEventFn, isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';
import { TestIDProps } from 'src/interfaces/test-id.props';

import { TextStyleProps } from '../../../../../interfaces/style.interface';
import { Column } from '../../../../column/column';
import { Text } from '../../../../text/text';

import { BackButton } from './components/back-button/back-button';
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
    {isDefined(onBackButtonPress) && <BackButton onPress={onBackButtonPress} testID={testID} />}
    <Text style={[styles.title, titleStyle]} numberOfLines={numberOfLines} ellipsizeMode="tail">
      {title}
    </Text>
  </Column>
);
