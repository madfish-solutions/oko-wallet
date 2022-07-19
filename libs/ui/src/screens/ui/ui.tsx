import React, { FC } from 'react';
import { Text } from 'react-native';

import { Column } from '../../components/column/column';
import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import { Switch } from '../../components/switch/switch';

import { styles } from './ui.styles';

export const Ui: FC = () => (
  <ScreenContainer screenTitle="Ui">
    <Column style={styles.block}>
      <Text style={styles.title}>Switcher</Text>

      <Text style={styles.label}>Primary</Text>
      <Switch name="show-tokens" style={styles.componentOffset} />
      <Text style={styles.label}>Secondary</Text>
      <Switch name="show-nfts" theme="secondary" style={styles.componentOffset} />
      <Text style={styles.label}>Tertiary</Text>
      <Switch name="show-balance" theme="tertiary" style={styles.componentOffset} />
    </Column>
  </ScreenContainer>
);
