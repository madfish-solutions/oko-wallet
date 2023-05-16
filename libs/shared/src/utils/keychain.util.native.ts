import Keychain from 'react-native-keychain';

import { isAndroid } from './platform.utils';

const APP_IDENTIFIER = 'foundation.klaytn';

export const getKeychainOptions = (): Keychain.Options => ({
  service: APP_IDENTIFIER,
  accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
  securityLevel: isAndroid ? Keychain.SECURITY_LEVEL.SECURE_HARDWARE : undefined
});
