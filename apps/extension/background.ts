import './shim.js';
import { runtime } from 'webextension-polyfill';

runtime.connect({ name: 'port-from-cs' });

import './shelter-messages';
