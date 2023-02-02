import { Router } from 'express';

import { rateLimiterMiddleware } from './utils';
import debankAPIv1 from './v1';

export const deBankProxy = Router().use('/v1', debankAPIv1);

export default deBankProxy;
