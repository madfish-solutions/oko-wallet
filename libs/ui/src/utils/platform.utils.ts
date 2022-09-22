import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';
export const isMobile = isIOS || isAndroid;
