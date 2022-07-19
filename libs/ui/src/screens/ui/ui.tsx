import React, { FC } from 'react';
import { Text } from 'react-native';

import { Column } from '../../components/column/column';
import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import { Switcher } from '../../components/switcher/switcher';

import { styles } from './ui.styles';

export const Ui: FC = () => (
  <ScreenContainer screenTitle="Ui">
    <Column style={styles.block}>
      <Text style={styles.title}>Switcher</Text>

      <Text style={styles.label}>Primary</Text>
      <Switcher name="show-tokens" style={styles.componentOffset} />
      <Text style={styles.label}>Secondary</Text>
      <Switcher name="show-nfts" theme="secondary" style={styles.componentOffset} />
      <Text style={styles.label}>Tertiary</Text>
      <Switcher name="show-balance" theme="tertiary" style={styles.componentOffset} />
    </Column>
  </ScreenContainer>
);
