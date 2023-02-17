import process from 'process';

import { redisConfigGuard } from './guards';
export * from './types';

export const getRedisConfig = (env = process.env) => redisConfigGuard(env);

export default getRedisConfig;
