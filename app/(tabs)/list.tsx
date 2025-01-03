import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Platform,
} from "react-native";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { useCurrencyData } from "~/hooks/useCurrencyData";
import CurrencyCard from "~/components/CurrencyCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useExchangeRatesStore from "~/stores/exchangeRatesStore";
import CurrencyCardFav from "~/components/CurrencyCardFav";
import { useColorScheme } from "~/lib/useColorScheme";
import Banner from "~/components/Banner";

const list: React.FC = () => {
  const { isDarkColorScheme } = useColorScheme();
  const { currencyData, loading, fetchData } = useCurrencyData();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { rates, setRates } = useExchangeRatesStore();

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchData();
    if (currencyData) {
      setRates(currencyData);
    }
    setIsRefreshing(false);
  }, [fetchData, currencyData, setRates]);

  const filteredData = rates.filter((item) =>
    favorites.includes(item.currencyCode)
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
      } catch (error) {
        console.error("Favoriler alınırken hata oluştu! Tekrar deneyiniz.");
      }
    };
    fetchFavorites();
  }, [onRefresh, filteredData]);

  const refreshControlColors = isDarkColorScheme
    ? {
        spinnerColor: "#ffffff",
        titleColor: "#efefef",
      }
    : {
        spinnerColor: "#27278d",
        titleColor: "#27278d",
      };

  return (
    <View
      className={`flex-1 p-6 ${
        isDarkColorScheme ? "bg-[#232336]" : "bg-white"
      }`}
    >
      <View className="flex items-center justify-center mb-2">
        <Banner />
      </View>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator
            size="large"
            color={refreshControlColors.spinnerColor}
          />
          <Text className={isDarkColorScheme ? "text-white" : "text-[#27278d]"}>
            Güncelleniyor
          </Text>
        </View>
      ) : filteredData.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text
            className={isDarkColorScheme ? "text-gray-300" : "text-gray-500"}
          >
            Favoriye eklenen bulunamadı!
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => `${item.currencyCode}-${index}`}
          renderItem={({ item }) => (
            <View className="mt-[8px]">
              <CurrencyCardFav
                buyValue={`${item.buyRate} ₺`}
                sellValue={`${item.sellRate} ₺`}
                change={item.change}
                label={item.currencyCode}
                labelLong={item.currencyName}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[refreshControlColors.spinnerColor]} // Android için
              tintColor={refreshControlColors.spinnerColor} // iOS için
              title="Yenileniyor..."
              titleColor={refreshControlColors.titleColor}
            />
          }
        />
      )}
    </View>
  );
};

export default list;
