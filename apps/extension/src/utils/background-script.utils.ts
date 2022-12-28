import { storage } from 'webextension-polyfill';

export const convertLockTime = (value: number) => value * 60 * 1000;

export async function fetchFromStorage<T = any>(key: string): Promise<T | null> {
  const items = await storage.local.get([key]);
  if (key in items) {
    return items[key];
  }

  return null;
}
