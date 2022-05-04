import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';

import { NavigationBarStyles } from './navigation-bar.styles';

export const NavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={NavigationBarStyles.container}>
      <TouchableOpacity style={NavigationBarStyles.button} onPress={() => navigation.navigate(ScreensEnum.Welcome)}>
        <Text style={NavigationBarStyles.buttonText}>Welcome</Text>
      </TouchableOpacity>
      <TouchableOpacity style={NavigationBarStyles.button} onPress={() => navigation.navigate(ScreensEnum.Test)}>
        <Text style={NavigationBarStyles.buttonText}>Test</Text>
      </TouchableOpacity>
      <TouchableOpacity style={NavigationBarStyles.button} onPress={() => navigation.navigate(ScreensEnum.Inner)}>
        <Text style={NavigationBarStyles.buttonText}>Inner</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={NavigationBarStyles.button}
        onPress={() => navigation.navigate(ScreensEnum.GenerateHdAccount)}
      >
        <Text style={NavigationBarStyles.buttonText}>Generate Hd Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={NavigationBarStyles.button} onPress={() => navigation.navigate(ScreensEnum.Shelter)}>
        <Text style={NavigationBarStyles.buttonText}>Shelter</Text>
      </TouchableOpacity>
    </View>
  );
};
