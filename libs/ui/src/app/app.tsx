import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Navigator } from '../components/navigator/navigator';
import { ToastProvider } from '../components/toast-provider/toast-provider';
import { useBackgroundMessager } from '../messagers/hooks/use-background-messager.hook';
import { persistor, store } from '../store/store';

export const App = () => {
  useBackgroundMessager();

  useEffect(() => {
    console.log('Shared App component rendering');
    console.log('OS:', Platform.OS);
  }, []);

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
