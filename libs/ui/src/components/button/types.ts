import { FC, SVGProps } from 'react';

import { themes } from './constants/themes';

export type Theme = keyof typeof themes;
export type Icon = FC<SVGProps<SVGElement>>;
