import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent, View } from 'react-native';

import { TestIDProps } from '../../interfaces/test-id.props';
import { Pressable } from '../pressable/pressable';
import { Text } from '../text/text';

import { styles } from './protect-layout.styles';

interface Props extends TestIDProps {
  handleHideLayout: OnEventFn<GestureResponderEvent>;
}

export const ProtectLayout: FC<Props> = ({ handleHideLayout, testID }) => (
  <Pressable opacity={false} onPress={handleHideLayout} style={styles.root} testID={testID}>
    <View style={styles.layoutBlock} />
    <Text style={styles.layoutText}>Tap to reveal</Text>
  </Pressable>
);
