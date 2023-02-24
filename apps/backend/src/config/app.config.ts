import dotenv from 'dotenv';

import { DeBankConfiguration, getDeBankConfig } from './debank';
import { portOrDefaultGuard } from './guards';
import { getRedisConfig, RedisConfig } from './redis';

export class BackendConfiguration {
  private static instance: BackendConfiguration;

  public readonly DEBANK: DeBankConfiguration;
  public readonly PORT: number;
  public readonly REDIS_CONFIG: RedisConfig;

  private constructor() {
    dotenv.config();
    this.DEBANK = getDeBankConfig();
    this.PORT = portOrDefaultGuard();
    this.REDIS_CONFIG = getRedisConfig();
  }
  public static getInstance(): BackendConfiguration {
    if (BackendConfiguration.instance === undefined) {
      BackendConfiguration.instance = new BackendConfiguration();
    }

    return BackendConfiguration.instance;
  }
}
