import Keychain from 'react-native-keychain';
import { of } from 'rxjs';

import { isAndroid } from './platform.utils';

const APP_IDENTIFIER = 'com.madfish.klaytn-wallet';

export const getKeychainOptions = (key: string): Keychain.Options => ({
  service: `${APP_IDENTIFIER}/${key}`,
  accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
  securityLevel: isAndroid ? Keychain.SECURITY_LEVEL.SECURE_HARDWARE : undefined
});

// pseudo async function as we don't need to wait until Keychain will remove all data
// (common async solution stops reset process)
export const resetStore$ = () => {
  Keychain.getAllGenericPasswordServices()
    .then(keychainServicesArray => {
      if (keychainServicesArray.length > 0) {
        Promise.all(keychainServicesArray.map(service => Keychain.resetGenericPassword({ service })));
      }
    })
    .catch(() => void 0);

  return of(0);
};

export const clearSensitiveData$ = (services: string[]) => {
  services.map(service => Keychain.resetGenericPassword({ service }));

  return of(0);
};
