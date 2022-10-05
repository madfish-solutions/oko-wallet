import React, { FC } from 'react';
import { View } from 'react-native';

import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './reveal-private-key.styles';

export const RevealPrivateKey: FC = () => (
  <ModalContainer screenTitle="Reveal Private Key">
    <View style={styles.root} />
  </ModalContainer>
);
