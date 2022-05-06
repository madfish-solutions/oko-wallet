import { sha256 } from 'react-native-sha256';

export const hashPassword = async (password: string) => sha256(password);
