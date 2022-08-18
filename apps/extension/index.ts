import './shim.js';

import { AppRegistry } from 'react-native';
import { App } from 'ui';
import { browser } from 'webextension-polyfill-ts';

import './styles.css';

browser.runtime.connect({ name: 'popup' });

AppRegistry.registerComponent('main', () => App);
AppRegistry.runApplication('main', {
  rootTag: document.getElementById('root')
});
