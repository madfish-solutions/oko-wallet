import axios from 'axios';

import config from '../../../config';

import { formDeBankHeaderWithKey } from './header';

export const deBankRequest = axios.create({
  baseURL: config.DEBANK.API_URL,
  headers: formDeBankHeaderWithKey(config.DEBANK)
});
