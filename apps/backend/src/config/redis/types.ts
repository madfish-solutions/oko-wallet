export declare type RedisConfig = {
  host: string;
  port: number;
  password?: string;
  db?: string | number;
  enable_offline_queue: boolean;
};
