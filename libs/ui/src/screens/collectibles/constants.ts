import { getCustomSize } from '../../styles/format-size';
import { isMobile } from '../../utils/platform.utils';

export const IMAGE_CONTAINER_SIZE = isMobile ? getCustomSize(20.5) : getCustomSize(19.5);
export const IMAGE_SIZE = isMobile ? getCustomSize(17.5) : getCustomSize(16.5);

// TODO: Remove later - only for test
export const SINGLE_NFT = {
  amount: 1,
  artifactUri:
    'https://static.debank.com/image/klay_nft/thumbnail_url/25c297a7baa3f648316712ee167f24cd/0781bf197b68ab0eafc7da3459133d53.png',
  balance: { data: '0', isLoading: false },
  collectionId: null,
  contractName: 'single_test_nft',
  decimals: 0,
  isVisible: true,
  name: 'Vasya Single',
  symbol: '',
  tokenAddress: '0x01866aa66ea2e771cb2f927ddedadef58ad939e3',
  tokenId: '312'
};
