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

export const Mnemonic: FC<Props> = ({ mnemonic, isShowProtectLayout, handleHideLayout, children }) => {
  const [wordsColumn1, wordsColumn2] = [
    mnemonic.slice(0, Math.round(mnemonic.length / 2)),
    mnemonic.slice(-(mnemonic.length / 2))
  ];

  return (
    <Column style={styles.mnemonicContainer}>
      <Row style={styles.wordsWrapper}>
        {isShowProtectLayout && <ProtectLayout handleHideLayout={handleHideLayout} />}

        <Column style={[styles.wordsColumn, styles.marginRight]}>
          {wordsColumn1.map((word, index) => (
            <View key={`${word}_${index}`} style={styles.mnemonicItem}>
              <Text selectable={false} style={styles.wordIndex}>{`${index + 1}.`}</Text>
              <Text selectable={false} style={styles.word}>
                {word}
              </Text>
            </View>
          ))}
        </Column>
        <Column style={styles.wordsColumn}>
          {wordsColumn2.map((word, index) => (
            <View key={`${word}_${index}`} style={styles.mnemonicItem}>
              <Text selectable={false} style={styles.wordIndex}>{`${Math.round(
                index + 1 + mnemonic.length / 2
              )}.`}</Text>
              <Text selectable={false} style={styles.word}>
                {word}
              </Text>
            </View>
          ))}
        </Column>
      </Row>

      <Row style={styles.buttons}>{children}</Row>
    </Column>
  );
};
