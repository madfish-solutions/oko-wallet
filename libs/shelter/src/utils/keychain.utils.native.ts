import Keychain from 'react-native-keychain';
import { of } from 'rxjs';

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
