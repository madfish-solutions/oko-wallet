import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { View, GestureResponderEvent } from 'react-native';

import { Column } from '../column/column';
import { ProtectLayout } from '../protect-layout/protect-layout';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './mnemonic.styles';

interface Props {
  mnemonic: string[];
  isShowProtectLayout: boolean;
  handleHideLayout: OnEventFn<GestureResponderEvent>;
}

export const Mnemonic: FC<Props> = ({ mnemonic, isShowProtectLayout, handleHideLayout, children }) => (
  <Column style={styles.mnemonicContainer}>
    <Row style={styles.wordsWrapper}>
      {isShowProtectLayout && <ProtectLayout handleHideLayout={handleHideLayout} />}

      <Row style={styles.wordsColumn}>
        {mnemonic.map((word, index) => (
          <View key={`${word}_${index}`} style={[styles.mnemonicItem, index % 2 === 0 && styles.marginRight]}>
            <Text selectable={false} style={styles.wordIndex}>{`${index + 1}.`}</Text>
            <Text selectable={false} style={styles.word}>
              {word}
            </Text>
          </View>
        ))}
      </Row>
    </Row>

    <Row style={styles.buttons}>{children}</Row>
  </Column>
);
