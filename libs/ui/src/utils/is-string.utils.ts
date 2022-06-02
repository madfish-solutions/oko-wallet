import { isDefined } from './is-defined.utils';

type Argument = string | number | boolean | object | undefined | null;

export const isString = (arg: Argument): arg is string => isDefined(arg) && typeof arg === 'string' && arg.length !== 0;
