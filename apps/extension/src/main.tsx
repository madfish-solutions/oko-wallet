import { AppRegistry } from 'react-native';

import {App} from "@klaytn-wallet/ui";

AppRegistry.registerComponent('main', () => App);
AppRegistry.runApplication('main', {
  rootTag: document.getElementById('root'),
});
