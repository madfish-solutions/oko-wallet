export * from './debank/guards';
export const portOrDefaultGuard = (): number => Number(process.env.PORT ?? 3000);
