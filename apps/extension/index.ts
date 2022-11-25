import './shim.js';

import { AppRegistry } from 'react-native';
import { App } from 'ui';
import { runtime } from 'webextension-polyfill';

import './styles.css';

// connection to track in background-script when ui is closed
runtime.connect({ name: 'klaytn_wallet_ui' });

AppRegistry.registerComponent('main', () => App);
AppRegistry.runApplication('main', {
  rootTag: document.getElementById('root')
});
