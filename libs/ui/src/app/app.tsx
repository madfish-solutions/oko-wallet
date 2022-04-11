import React, {useEffect} from 'react';
import {Platform} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ScreensEnum} from "../enums/sreens.enum";
import {WelcomeScreen} from "../screens/welcome-screen/welcome-screen";
import {TestScreen} from "../screens/test-screen/test-screen";
import {InnerScreen} from "../screens/inner-screen/inner-screen";

const Stack = createNativeStackNavigator();

export const App = () => {
  useEffect(() => {
    console.log('Shared App component rendering');
    console.log('OS:', Platform.OS);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreensEnum.Welcome} component={WelcomeScreen}/>
        <Stack.Screen name={ScreensEnum.Test} component={TestScreen}/>
        <Stack.Screen name={ScreensEnum.Inner} component={InnerScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
