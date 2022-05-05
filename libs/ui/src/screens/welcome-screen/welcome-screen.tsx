import React from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar-test';
import { generateRandomBalanceValueAction } from '../../store/app-info/app-info.actions';
import { useRandomBalanceSelector } from '../../store/app-info/app-info.selectors';

export const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const randomBalance = useRandomBalanceSelector();

  const handleGenerateNewBuild = () => dispatch(generateRandomBalanceValueAction.submit(1));

  return (
    <View>
      <NavigationBar />
      <Button title="Action: Generate random value" onPress={handleGenerateNewBuild} />
      <Text>{randomBalance.data}</Text>
    </View>
  );
};
