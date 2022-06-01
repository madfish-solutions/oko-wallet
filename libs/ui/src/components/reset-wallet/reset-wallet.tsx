import React, { FC } from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { resetApplicationAction } from '../../store/root-state.actions';

export const ResetWallet: FC = () => {
  const dispatch = useDispatch();
  const onResetApplication = () => dispatch(resetApplicationAction.submit());

  return (
    <View>
      <Button onPress={onResetApplication} title="reset wallet" color="#00008B" />
    </View>
  );
};
