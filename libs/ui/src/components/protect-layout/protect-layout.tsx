import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent, View } from 'react-native';

import { Pressable } from '../pressable/pressable';
import { Text } from '../text/text';

import { styles } from './protect-layout.styles';

interface Props {
  handleHideLayout: OnEventFn<GestureResponderEvent>;
}

export const ProtectLayout: FC<Props> = ({ handleHideLayout }) => (
  <Pressable opacity={false} onPress={handleHideLayout} style={styles.root}>
    <View style={styles.layoutBlock} />
    <Text style={styles.layoutText}>Tap to reveal</Text>
  </Pressable>
);
