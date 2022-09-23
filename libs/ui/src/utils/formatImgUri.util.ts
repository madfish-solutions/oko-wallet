export const formatImgUri = (uri = '') => {
  if (uri.startsWith('ipfs://')) {
    return `https://ipfs.io/ipfs/${uri.substring(7)}`;
  }

  return uri;
};
