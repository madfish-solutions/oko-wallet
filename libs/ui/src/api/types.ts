export type TokenListResponse<
  Token = {
    decimals: number;
    id: string;
    logo_url: string | null;
    name: string;
    raw_amount: number;
    symbol: string;
    chain: string;
  }
> = Token[];

export type TokenPriceInfoResponse = Record<
  string,
  {
    usd: number;
    usd_24h_change: number;
  }
>;
