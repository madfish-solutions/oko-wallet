export interface TokenResponse {
  decimals: number;
  id: string;
  logo_url: string | null;
  name: string;
  raw_amount: number;
  symbol: string;
  chain: string;
}

export declare interface NftListResponse {
  id: string;
  contract_id: string;
  inner_id: string;
  chain: string;
  name: string;
  description: string;
  content_type: string;
  content: string;
  detail_url: string;
  contract_name: string;
  is_erc1155?: true;
  is_erc721?: true;
  amount: number;
  usd_price?: number;
  collection_id: string;
  thumbnail_url: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}
