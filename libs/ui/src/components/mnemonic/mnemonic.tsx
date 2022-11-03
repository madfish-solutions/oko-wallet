import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { View, GestureResponderEvent } from 'react-native';

import { TestIDProps } from '../../interfaces/test-id.props';
import { Column } from '../column/column';
import { ProtectLayout } from '../protect-layout/protect-layout';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './mnemonic.styles';

interface Props extends TestIDProps {
  mnemonic: string[];
  isShowProtectLayout: boolean;
  handleHideLayout: OnEventFn<GestureResponderEvent>;
}

export const Mnemonic: FC<Props> = ({ mnemonic, isShowProtectLayout, handleHideLayout, children, testID }) => (
  <Column style={styles.mnemonicContainer}>
    <Row style={styles.wordsWrapper}>
      {isShowProtectLayout && <ProtectLayout handleHideLayout={handleHideLayout} testID={testID} />}

      <Row style={styles.content}>
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
