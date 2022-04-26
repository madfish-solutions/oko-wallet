import React from 'react';
import {TouchableOpacity, Text, View} from "react-native";
import {ScreensEnum} from "../../enums/sreens.enum";
import {NavigationBarStyles} from "./navigation-bar.styles";
import {useNavigation} from "../../hooks/use-navigation.hook";

export const NavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={NavigationBarStyles.container}>
      <TouchableOpacity style={NavigationBarStyles.button} onPress={() => navigation.navigate(ScreensEnum.Welcome)}>
        <Text style={NavigationBarStyles.buttonText}>Mnemonic</Text>
      </TouchableOpacity>
      <TouchableOpacity style={NavigationBarStyles.button} onPress={() => navigation.navigate(ScreensEnum.Test)}>
        <Text style={NavigationBarStyles.buttonText}>Redux</Text>
      </TouchableOpacity>
      <TouchableOpacity style={NavigationBarStyles.button} onPress={() => navigation.navigate(ScreensEnum.Inner)}>
        <Text style={NavigationBarStyles.buttonText}>...</Text>
      </TouchableOpacity>
    </View>
  );
}
