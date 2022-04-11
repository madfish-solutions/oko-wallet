import React from 'react';
import {View, Text} from "react-native";
import {NavigationBar} from "../../components/navigation-bar/navigation-bar";

export const InnerScreen = () => {
  return (
    <View>
      <Text>Inner</Text>
      <Text>Inner</Text>
      <Text>Inner</Text>
      <NavigationBar/>
    </View>
  );
}
