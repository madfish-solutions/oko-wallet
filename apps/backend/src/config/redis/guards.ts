import process from 'process';

import { RedisConfig } from './types';

const stringToBoolean = stringValue => {
  switch (stringValue?.toLowerCase()?.trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;

    case 'false':
    case 'no':
    case '0':
    case null:
    case undefined:
      return false;

    default:
      return JSON.parse(stringValue);
  }
};

const redisHostGuard = (env = process.env): string => {
  if (!('REDIS_HOST' in env)) {
    throw new Error('REDIS_HOST not defined');
  }

  return String(env.REDIS_HOST);
};
const redisPortGuard = (env = process.env): number => Number(env.REDIS_PORT ?? 6379);

export const redisConfigGuard = (env = process.env): RedisConfig => {
  const config: RedisConfig = {
    host: redisHostGuard(env),
    port: redisPortGuard(env),
    enable_offline_queue: false
  };
  if ('REDIS_PASSWORD' in env) {
    config.password = env.REDIS_PASSWORD;
  }
  if ('REDIS_DB' in env) {
    config.db = env.REDIS_DB;
  }
  if (stringToBoolean(env.REDIS_TLS)) {
    config.tls = stringToBoolean(env.REDIS_TLS);
  }

  return config;
};
