import { sha256 } from 'react-native-sha256';
import { from } from 'rxjs';

export const generatePassword$ = (password: string) => from(sha256(password));
