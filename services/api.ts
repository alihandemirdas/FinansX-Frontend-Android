import axios from "axios";

// Döviz verisi tipi
export interface CurrencyData {
  category: "currency" | "gold" | "crypto";
  currencyCode: string;
  currencyName: string;
  buyRate: string;
  sellRate: string;
  high?: string;
  low?: string;
  change: string;
}

// API'den döviz verilerini çeken fonksiyon
export const fetchCurrencyData = async (): Promise<CurrencyData[]> => {
  try {
    const response: any = await axios.get<CurrencyData[]>(
      "https://api.alihandemirdas.com.tr/api/exchange-rates" // API URL'ini değiştirin
    );
    
    return response.data.rates;
  } catch (error) {
    console.error("API verisi çekilirken hata oluştu, internet bağlantınızı kontrol ediniz!");
    return [];
  }
};
