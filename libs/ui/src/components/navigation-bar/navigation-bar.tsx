import React from 'react';
import {TouchableOpacity, Text} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {ScreensEnum} from "../../enums/sreens.enum";

export const NavigationBar = () => {
  const navigation = useNavigation();
  return (
    <>
      {/*// @ts-ignore*/}
      <TouchableOpacity onPress={() => navigation.navigate(ScreensEnum.Welcome)}><Text>Welcome</Text></TouchableOpacity>
      {/*// @ts-ignore*/}
      <TouchableOpacity onPress={() => navigation.navigate(ScreensEnum.Test)}><Text>Test</Text></TouchableOpacity>
      {/*// @ts-ignore*/}
      <TouchableOpacity onPress={() => navigation.navigate(ScreensEnum.Inner)}><Text>Inner</Text></TouchableOpacity>
    </>
  );
}
