import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ScreensEnum, ScreensParamList } from '../enums/sreens.enum';
import { InnerScreen } from '../screens/inner-screen/inner-screen';
import { TestScreen } from '../screens/test-screen/test-screen';
import { WelcomeScreen } from '../screens/welcome-screen/welcome-screen';
import { persistor, store } from '../store/store';

const Stack = createNativeStackNavigator<ScreensParamList>();

export const App = () => {
  useEffect(() => {
    console.log('Shared App component rendering');
    console.log('OS:', Platform.OS);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={ScreensEnum.Welcome} component={WelcomeScreen} />
            <Stack.Screen name={ScreensEnum.Test} component={TestScreen} />
            <Stack.Screen name={ScreensEnum.Inner} component={InnerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
