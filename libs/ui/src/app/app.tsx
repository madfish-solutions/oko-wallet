import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useBackgroundMessager } from 'shelter';

import { Navigator } from '../components/navigator/navigator';
import { ToastProvider } from '../components/toast-provider/toast-provider';
import { HIDE_SPLASH_SCREEN_TIMEOUT } from '../constants/defaults';
import { useDelayedEffect } from '../hooks/use-delayed-effect.hook';
import { persistor, store } from '../store/store';
import { hideSplashScreen } from '../utils/hide-splash-screen.util';

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
