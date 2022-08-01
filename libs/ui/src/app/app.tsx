import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { browser } from 'webextension-polyfill-ts';

import { Navigator } from '../components/navigator/navigator';
import { persistor, store } from '../store/store';

export const App = () => {
  useEffect(() => {
    console.log('Shared App component rendering');
    console.log('OS:', Platform.OS);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
};
