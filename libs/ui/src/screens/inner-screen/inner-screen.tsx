import React from 'react';
import {View, Text} from "react-native";
import {NavigationBar} from "../../components/navigation-bar/navigation-bar";

export const InnerScreen = () => {
  return (
    <View>
      <NavigationBar/>
      <Text>Inner Screen Content</Text>
      <Text>Inner Screen Content</Text>
      <Text>Inner Screen Content</Text>
    </View>
  );
}
