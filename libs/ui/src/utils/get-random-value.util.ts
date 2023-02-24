import { MAX_PASSWORD_ATTEMPTS, DELAY_TIME } from '../constants/security';

const getRandomIntegerInRange = (min: number, max: number) => Math.floor(Math.random() * max) + min;

export const getRandomDelay = (passwordWrongAttempts: number) =>
  getRandomIntegerInRange(1000, DELAY_TIME * Math.floor(passwordWrongAttempts / MAX_PASSWORD_ATTEMPTS));
