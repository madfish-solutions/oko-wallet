import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';

import { NavigationBarStyles } from './navigation-bar.styles';

export const NavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={NavigationBarStyles.container}>
      <TouchableOpacity style={NavigationBarStyles.button} onPress={() => navigation.navigate(ScreensEnum.Settings)}>
        <Text style={NavigationBarStyles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};
