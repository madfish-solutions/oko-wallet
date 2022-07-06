import Clipboard from '@react-native-clipboard/clipboard';

export const handleCopyToClipboard = (value: string) => Clipboard.setString(value);
