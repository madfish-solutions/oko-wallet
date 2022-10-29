import { OnEventFn, isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

import { TextStyleProps } from '../../../../../interfaces/style.interface';
import { Column } from '../../../../column/column';
import { IconNameEnum } from '../../../../icon/icon-name.enum';
import { Text } from '../../../../text/text';
import { TouchableIcon } from '../../../../touchable-icon/touchable-icon';
import { ScreenTitleTestIDs } from './screen-title.testID';

import { styles } from './screen-title.styles';

interface Props {
  title?: string;
  onBackButtonPress?: OnEventFn<GestureResponderEvent>;
  numberOfLines?: number;
  titleStyle?: TextStyleProps;
}

export const ScreenTitle: FC<Props> = ({ title = 'Page', onBackButtonPress, numberOfLines = 1, titleStyle }) => (
  <Column style={styles.root}>
    {isDefined(onBackButtonPress) && (
      <TouchableIcon name={IconNameEnum.ArrowLeft} onPress={onBackButtonPress} style={styles.icon} testID={ScreenTitleTestIDs.backButton} />
    )}
    <Text style={[styles.title, titleStyle]} numberOfLines={numberOfLines} ellipsizeMode="tail">
      {title}
    </Text>
  </Column>
);
