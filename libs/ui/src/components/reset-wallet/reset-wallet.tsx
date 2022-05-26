import React, { FC } from 'react';
import { View, Button } from 'react-native';

interface Props {
  handleResetWallet: () => void;
}
export const ResetWallet: FC<Props> = ({ handleResetWallet }) => (
  <View>
    <Button onPress={handleResetWallet} title="reset wallet" color="#00008B" />
  </View>
);
