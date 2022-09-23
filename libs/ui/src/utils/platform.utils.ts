import { Platform } from 'react-native';

import { checkActiveApplicationSession } from './check-active-application-session.util';

const { isMaximiseScreenOpened } = checkActiveApplicationSession();

const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';
export const isMaximiseScreen = isMaximiseScreenOpened;
export const isMobile = isIOS || isAndroid;
