import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

import { TestIDProps } from '../../../../../../../interfaces/test-id.props';
import { IconNameEnum } from '../../../../../../icon/icon-name.enum';
import { TouchableIcon } from '../../../../../../touchable-icon/touchable-icon';

import { styles } from './back-button.styles';

interface Props extends TestIDProps {
  onPress: OnEventFn<GestureResponderEvent>;
}

export const BackButton: FC<Props> = ({ onPress, testID }) => (
  <TouchableIcon name={IconNameEnum.ArrowLeft} onPress={onPress} style={styles.root} testID={testID} />
);
