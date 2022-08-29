import { Share, ShareContent, ShareOptions } from 'react-native';

export const share = (content: ShareContent, options?: ShareOptions) =>
  Share.share(content, options).catch(error => console.log('Share error:', error));
