import { symmetricKey64 } from 'react-native-themis';

export const symmetricKey = async (): Promise<string> => symmetricKey64();
