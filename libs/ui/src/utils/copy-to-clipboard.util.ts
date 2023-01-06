import Clipboard from '@react-native-clipboard/clipboard';

export const handleSetValueToClipboard = (value: string) => Clipboard.setString(value);
