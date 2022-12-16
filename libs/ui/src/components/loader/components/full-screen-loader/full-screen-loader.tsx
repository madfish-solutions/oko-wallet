import React from 'react';
import { View } from 'react-native';

import { Loader } from '../../loader';

import { styles } from './full-screen-loader.styles';

export const FullScreenLoader = () => (
  <View style={styles.root}>
    <View style={styles.loader}>
      <Loader />
    </View>
  </View>
);
