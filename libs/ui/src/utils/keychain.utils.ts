import { from } from 'rxjs';
import { storage } from 'webextension-polyfill';

export const resetStore$ = () => from(storage.local.clear());
