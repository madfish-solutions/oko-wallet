export declare type RedisConfig = {
  host: string;
  port: number;
  password?: string;
  db?: string | number;
  enable_offline_queue: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tls?: any;
};
