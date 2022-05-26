import React, { FC } from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { resetApplicationAction } from '../../store/root-state.actions';

export const ResetWallet: FC = () => {
  const dispatch = useDispatch();

  return (
    <View>
      <Button onPress={() => dispatch(resetApplicationAction.submit())} title="reset wallet" color="#00008B" />
    </View>
  );
};
