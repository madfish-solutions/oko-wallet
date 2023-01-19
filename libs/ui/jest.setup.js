import 'react-native-gesture-handler/jestSetup';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js');

import './src/mocks/native-modules.mock';
import './src/mocks/react-native-async-storage.mock';
import './src/mocks/react-native-device-info.mock';
import './src/mocks/react-native-themis.mock';
