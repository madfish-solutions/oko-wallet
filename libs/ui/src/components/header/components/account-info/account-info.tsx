import React, { FC } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';

import { AccountInfoStyles } from './account-info.styles';

interface Props {
  style?: StyleProp<TextStyle>;
}

export const AccountInfo: FC<Props> = ({ style }) => (
  // TODO: Add Row component and to other places
  <View style={[AccountInfoStyles.root, style]}>
    <View style={AccountInfoStyles.wrapper}>
      {/* TODO: Add copy icon */}
      <View style={AccountInfoStyles.icon}>CC</View>
      <Text style={AccountInfoStyles.address}>3CKM...5rNX</Text>
    </View>

    <View style={AccountInfoStyles.wrapper}>
      {/* TODO: Add show-balance icon */}
      <View style={AccountInfoStyles.icon}>CC</View>
      <Text style={AccountInfoStyles.currency}>$</Text>
      <Text style={AccountInfoStyles.balance}>0.00</Text>
    </View>
  </View>
);
