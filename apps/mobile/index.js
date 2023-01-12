console.log('a');
import './shim.js';
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import { App } from 'ui';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
