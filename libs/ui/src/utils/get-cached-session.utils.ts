export const getCachedSession = () => {
  const local = localStorage.getItem('walletconnect') ?? null;

  let session = null;
  if (typeof local === 'string') {
    try {
      session = JSON.parse(local);
    } catch (error) {
      throw error;
    }
  }

  return session;
};
