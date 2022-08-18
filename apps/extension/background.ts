import './shim.js';

import { runtime } from 'webextension-polyfill';

runtime.connect({ name: 'popup' });

import './shelter-messages';
