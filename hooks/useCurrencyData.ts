import { useEffect, useState } from "react";
import { fetchCurrencyData, CurrencyData } from "../services/api";

export const useCurrencyData = () => {
  const [currencyData, setCurrencyData] = useState<CurrencyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchCurrencyData();
    setCurrencyData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(); // İlk veri çekme
  }, []);

  return { currencyData, loading, fetchData };
};
