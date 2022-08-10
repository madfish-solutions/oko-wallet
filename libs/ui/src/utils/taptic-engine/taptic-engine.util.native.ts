import ReactNativeHapticFeedback, { HapticOptions } from 'react-native-haptic-feedback';

const initialOptions: HapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

export const hapticFeedback = (options = initialOptions) => ReactNativeHapticFeedback.trigger('impactMedium', options);
