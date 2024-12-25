export interface ExchangeRate {
  category: "currency" | "gold" | "crypto";
  currencyCode: string;
  currencyName: string;
  buyRate: string;
  sellRate: string;
  high?: string;
  low?: string;
  change: string;
}

export interface SocketResponse {
  lastUpdated: string;
  rates: ExchangeRate[];
}
