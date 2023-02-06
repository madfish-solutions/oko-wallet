import { Router } from 'express';

import { getRateLimiterMiddleware } from '../../utils';

import { debankAPIv1 } from './v1';

export const deBankProxy = Router()
  .use(getRateLimiterMiddleware({ keyPrefix: 'deBank-RL', points: 20, duration: 3 }))
  .use('/v1', debankAPIv1);

export default deBankProxy;
