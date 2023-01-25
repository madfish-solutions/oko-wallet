import dotenv from 'dotenv';
import { DeBankConfiguration, getDeBankConfig } from './debank';
import { portOrDefaultGuard } from './guards';

export class BackendConfiguration {
  private static instance: BackendConfiguration;

  public readonly DEBANK: DeBankConfiguration;
  public readonly PORT: number;

  private constructor() {
    dotenv.config();
    this.DEBANK = getDeBankConfig();
    this.PORT = portOrDefaultGuard();
  }
  public static getInstance(): BackendConfiguration {
    if (!BackendConfiguration.instance) {
      BackendConfiguration.instance = new BackendConfiguration();
    }
    return BackendConfiguration.instance;
  }
}
