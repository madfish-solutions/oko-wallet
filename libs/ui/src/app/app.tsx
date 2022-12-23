import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Navigator } from '../components/navigator/navigator';
import { ToastProvider } from '../components/toast-provider/toast-provider';
import { HIDE_SPLASH_SCREEN_TIMEOUT } from '../constants/defaults';
import { useDelayedEffect } from '../hooks/use-delayed-effect.hook';
import { useBackgroundMessager } from '../messagers/hooks/use-background-messager.hook';
import { persistor, store } from '../store/store';
import { BACKEND_URL } from '../utils/env.utils';
import { hideSplashScreen } from '../utils/hide-splash-screen.util';

export const App = () => {
  useBackgroundMessager();

  useDelayedEffect(() => void hideSplashScreen(), [], HIDE_SPLASH_SCREEN_TIMEOUT);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastProvider>
          <Navigator />
          <Text>BACKEND_URL: {BACKEND_URL}</Text>
          <Text></Text>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};
