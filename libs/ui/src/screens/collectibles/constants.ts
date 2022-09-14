import { getCustomSize } from '../../styles/format-size';
import { isMobile } from '../../utils/platform.utils';

export const IMAGE_CONTAINER_SIZE = isMobile ? getCustomSize(20.5) : getCustomSize(19.5);
export const IMAGE_SIZE = isMobile ? getCustomSize(17.5) : getCustomSize(17.125);

// TODO: Remove later - only for test
export const SINGLE_NFT = {
  amount: 1,
  artifactUri: '',
  balance: { data: '0', isLoading: false },
  collectionId: null,
  contractName: 'single_test_nft',
  decimals: 0,
  isVisible: true,
  name: 'Single NFT',
  symbol: '',
  tokenAddress: '0x01866aa66ea2e771cb2f927ddedadef58ad939e3',
  tokenId: '312'
};
