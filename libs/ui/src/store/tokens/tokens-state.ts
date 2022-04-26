// TODO: Add an interface
export interface TokensState {
  list: any[];
}

export const tokensInitialState: TokensState = {
  list: [],
};

export interface TokensRootState {
  tokens: TokensState;
}
