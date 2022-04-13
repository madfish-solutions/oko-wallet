import React from 'react';
import {TouchableOpacity, Text, View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {ScreensEnum} from "../../enums/sreens.enum";
import {NavigationBarStyles} from "./navigation-bar.styles";

export const NavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={NavigationBarStyles.container}>
      {/*// @ts-ignore*/}
      <TouchableOpacity style={NavigationBarStyles.button} onPress={() => navigation.navigate(ScreensEnum.Welcome)}>
        <Text style={NavigationBarStyles.buttonText}>Welcome</Text>
      </TouchableOpacity>
      {/*// @ts-ignore*/}
      <TouchableOpacity style={NavigationBarStyles.button} onPress={() => navigation.navigate(ScreensEnum.Test)}>
        <Text style={NavigationBarStyles.buttonText}>Test</Text>
      </TouchableOpacity>
      {/*// @ts-ignore*/}
      <TouchableOpacity style={NavigationBarStyles.button} onPress={() => navigation.navigate(ScreensEnum.Inner)}>
        <Text style={NavigationBarStyles.buttonText}>Inner</Text>
      </TouchableOpacity>
    </View>
  );
}
