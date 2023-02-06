export declare type TokenListResponse<
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
