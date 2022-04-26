import './shim.js';

import { AppRegistry } from 'react-native';
import { App } from 'ui';

import './styles.css';

AppRegistry.registerComponent('main', () => App);
AppRegistry.runApplication('main', {
  rootTag: document.getElementById('root')
});
