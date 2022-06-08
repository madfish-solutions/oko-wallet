import { typography } from '../styles/typography';

interface FontStyles {
  fontFamily: string;
  fontSize: number;
}

export type Typography = Record<keyof typeof typography, FontStyles>;
