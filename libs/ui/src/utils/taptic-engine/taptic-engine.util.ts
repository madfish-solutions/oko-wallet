import { isDefined } from '@rnw-community/shared';

type HapticOptions = {
  enableVibrateFallback?: boolean;
  ignoreAndroidSystemSettings?: boolean;
};

const initialOptions: HapticOptions = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false
};

export const hapticFeedback = (options = initialOptions) => (isDefined(options) ? null : null);
