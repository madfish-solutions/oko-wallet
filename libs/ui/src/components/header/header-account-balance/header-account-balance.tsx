import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { StylePropsType } from '../../../interfaces/style.interface';

import { styles } from './header-account-balance.styles';

interface Props {
  textStyle?: StylePropsType;
  style?: StylePropsType;
}

export const HeaderAccountBalance: FC<Props> = ({ textStyle, style }) => (
  <View style={[styles.root, style]}>
    {/* TODO: Add show-balance icon */}
    <Text style={styles.icon}>CC</Text>
    <Text style={[styles.balance, textStyle]}>0.00</Text>
    <Text style={[styles.currency, textStyle]}>$</Text>
  </View>
);
