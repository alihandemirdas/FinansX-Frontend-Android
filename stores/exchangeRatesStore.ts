import { create } from "zustand";
import {
  initiateSocketConnection,
  subscribeToExchangeRates,
  disconnectSocket,
} from "../services/socketService";
import { ExchangeRate } from "../types/exchangeRates";

interface ExchangeRatesStore {
  rates: ExchangeRate[];
  lastUpdated: string | null;
  error: string | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
  setRates: (newRates: ExchangeRate[]) => void; // Yeni ekleme
}

const useExchangeRatesStore = create<ExchangeRatesStore>((set) => ({
  rates: [],
  lastUpdated: null,
  error: null,

  connectSocket: () => {
    initiateSocketConnection();

    subscribeToExchangeRates((data) => {
      const formattedTime = data.lastUpdated.split(" ")[1]?.slice(0, 5); // Saat ve dakika kısmını ayıkla

      set({
        rates: data.rates,
        lastUpdated: formattedTime || "Bilinmiyor", // Ayıklanan saat ve dakikayı kaydet, hata durumunda bir varsayılan değer koy
        error: null,
      });
    });
  },

  disconnectSocket: () => {
    disconnectSocket();
  },

  setRates: (newRates) => set({ rates: newRates }),
}));

export default useExchangeRatesStore;
