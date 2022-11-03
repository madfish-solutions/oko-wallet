import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Navigator } from '../components/navigator/navigator';
import { ToastProvider } from '../components/toast-provider/toast-provider';
import { HIDE_SPLASH_SCREEN_TIMEOUT } from '../constants/defaults';
import { useDelayedEffect } from '../hooks/use-delayed-effect.hook';
import { useBackgroundMessager } from '../messagers/hooks/use-background-messager.hook';
import { createStore2 } from '../store/store';
import { hideSplashScreen } from '../utils/hide-splash-screen.util';

const { store, persistor } = createStore2();

export const App = () => {
  useBackgroundMessager();

  useDelayedEffect(() => void hideSplashScreen(), [], HIDE_SPLASH_SCREEN_TIMEOUT);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastProvider>
          <Navigator />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};
