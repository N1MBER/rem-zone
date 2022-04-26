export type BaseListRequest = {
  limit?: number;
  offset?: number;
};

export type BaseListResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type DefaultQueries = Record<string, unknown>;
