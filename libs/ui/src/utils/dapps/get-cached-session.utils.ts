import { WalletConnectSession } from '../../interfaces/connect-wallet.interface';

export function getCachedSession(): WalletConnectSession | null {
  const local = localStorage.getItem('walletconnect');

  let session = null;
  if (local != null) {
    try {
      session = JSON.parse(local);
    } catch (error) {
      throw error;
    }
  }

  return session;
}
