import { forkJoin, from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TokenStandardEnum } from 'shared';
import { getDefaultEvmProvider } from 'shelter';

import { Erc1155Abi__factory, Erc165Abi__factory, Erc721Abi__factory } from '../../../../contract-types';
import { TokenMetadata } from '../../../../interfaces/token-metadata.interface';
import { formatUri } from '../../../../utils/formatUrl.util';

const Erc721InterfaceId = '0x80ac58cd';

const getCollectibleErcStandard$ = (tokenAddress: string, rpcUrl: string) => {
  const provider = getDefaultEvmProvider(rpcUrl);
  const erc165 = Erc165Abi__factory.connect(tokenAddress, provider);

  return from(erc165.supportsInterface(Erc721InterfaceId)).pipe(
    map(isErc721 => (isErc721 ? TokenStandardEnum.ERC721 : TokenStandardEnum.ERC1155))
  );
};

const fetchMetadata = (url: string) => fetch(formatUri(url)).then(response => response.json());

const getErc721Metadata$ = (tokenAddress: string, tokenId: string, rpcUrl: string): Observable<TokenMetadata> => {
  const provider = getDefaultEvmProvider(rpcUrl);
  const contract721 = Erc721Abi__factory.connect(tokenAddress, provider);

  return from(contract721.tokenURI(tokenId)).pipe(
    switchMap(metadataUrl => forkJoin([fetchMetadata(metadataUrl), contract721.name(), contract721.symbol()])),
    map(([metadata, contractName, symbol]) => ({
      symbol,
      contractName,
      decimals: 0,
      standard: TokenStandardEnum.ERC721,
      name: metadata.name,
      artifactUri: metadata.image
    }))
  );
};

const getErc1155Metadata$ = (tokenAddress: string, tokenId: string, rpcUrl: string): Observable<TokenMetadata> => {
  const provider = getDefaultEvmProvider(rpcUrl);
  const contract1155 = Erc1155Abi__factory.connect(tokenAddress, provider);

  return from(contract1155.uri(tokenId)).pipe(
    switchMap(metadataUrl => fetchMetadata(metadataUrl)),
    map(metadata => ({
      symbol: 'Unnamed NFT',
      contractName: 'Collection',
      decimals: 0,
      standard: TokenStandardEnum.ERC1155,
      name: metadata.name,
      artifactUri: metadata.image
    }))
  );
};

export const getCollectibleMetadata$ = (tokenAddress: string, tokenId: string, rpcUrl: string) =>
  getCollectibleErcStandard$(tokenAddress, rpcUrl).pipe(
    switchMap(standard => {
      if (standard === TokenStandardEnum.ERC721) {
        return getErc721Metadata$(tokenAddress, tokenId, rpcUrl);
      }

      return getErc1155Metadata$(tokenAddress, tokenId, rpcUrl);
    })
  );
