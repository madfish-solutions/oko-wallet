export interface HistoryListRequest {
  chain_id: string;
  id: string;
  page_count: number;
  start_time: number;
  token_id?: string;
}
