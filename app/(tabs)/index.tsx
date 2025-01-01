import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  RefreshControl,
  Alert,
  useColorScheme,
  BackHandler,
} from "react-native";
import CurrencyCard from "~/components/CurrencyCard";
import HeroCard from "~/components/HeroCard";
import CategoryFilter from "~/components/CategoryFilter";
import HeaderLabels from "~/components/HeaderLabels";
import LoadingIndicator from "~/components/LoadingIndicator";
import RightAction from "~/components/RightAction";
import { useCurrencyData } from "~/hooks/useCurrencyData";
import useExchangeRatesStore from "~/stores/exchangeRatesStore";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { configureReanimatedLogger } from "react-native-reanimated";
import Banner from "~/components/Banner";
import { FlashList } from "@shopify/flash-list";

const chartData = [27.5, 28, 27.8, 28.2, 28.5, 28, 27.8, 28.2, 28.5];

const MainScreen: React.FC = () => {
  const { rates, connectSocket, disconnectSocket, setRates } =
    useExchangeRatesStore();
  const { currencyData, loading, fetchData } = useCurrencyData();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const swipeableRefs = useRef(new Map<string, any>());
  const theme = useColorScheme();

  configureReanimatedLogger({
    strict: false,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isConnected === false) {
      Alert.alert(
        "Bağlantı Hatası",
        "Uygulamayı kullanmak için internet bağlantınız olmalı.",
        [
          {
            text: "Tamam",
            onPress: () => {
              BackHandler.exitApp(); // Uygulama kapanacak
            },
          },
        ]
      );
    }
  }, [isConnected]);

  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
      } catch (error) {
        console.error("Favoriler alınırken hata oluştu, tekrar deneyiniz!");
      }
    };
    fetchFavorites();
  }, []);

  const handleFavorite = async (currencyCode: string) => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      if (!favorites.includes(currencyCode)) {
        favorites.push(currencyCode);
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        setFavorites(favorites);
        Alert.alert("Başarılı", `${currencyCode} favorilere eklendi.`);
        swipeableRefs.current.get(currencyCode)?.close();
      } else {
        Alert.alert("Hata", `${currencyCode} zaten favorilere eklenmiş.`);
        swipeableRefs.current.get(currencyCode)?.close();
      }
    } catch (error) {
      console.error("Favori eklenirken hata oluştu. Tekrar deneyiniz!");
    }
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchData();
    if (currencyData) {
      setRates(currencyData);
    }
    setIsRefreshing(false);
  }, [fetchData, currencyData, setRates]);

  const filteredData = rates.filter((item) =>
    selectedCategory === "all" ? true : item.category === selectedCategory
  );

  const refreshControlColors = {
    spinnerColor: theme === "dark" ? "#ffffff" : "#27278d",
    titleColor: theme === "dark" ? "#efefef" : "#27278d",
  };

  return (
    <View
      className={`flex-1 p-6 ${theme === "dark" ? "bg-[#232336]" : "bg-white"}`}
    >
      {/* <Banner /> */}
      <HeroCard currencyCard={rates} />
      <View className="flex flex-row items-center justify-between px-2">
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <HeaderLabels />
      </View>
      {loading ? (
        <LoadingIndicator spinnerColor={refreshControlColors.spinnerColor} />
      ) : (
        <FlashList
          data={filteredData}
          keyExtractor={(item, index) => `${item.currencyCode}-${index}`}
          estimatedItemSize={100} // Ortalama öğe yüksekliği
          renderItem={({ item }) => (
            <GestureHandlerRootView>
              <ReanimatedSwipeable
                friction={2}
                containerStyle={{ marginTop: 8 }}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                renderRightActions={(prog, drag) => (
                  <RightAction
                    drag={drag}
                    handleFavorite={handleFavorite}
                    currencyCode={item.currencyCode}
                  />
                )}
                ref={(ref) => swipeableRefs.current.set(item.currencyCode, ref)}
              >
                <CurrencyCard
                  chartData={chartData}
                  buyValue={`${item.buyRate} ₺`}
                  sellValue={`${item.sellRate} ₺`}
                  change={item.change}
                  label={item.currencyCode}
                  labelLong={item.currencyName}
                />
              </ReanimatedSwipeable>
            </GestureHandlerRootView>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={refreshControlColors.spinnerColor}
              title="Yenileniyor..."
              titleColor={refreshControlColors.titleColor}
            />
          }
        />
      )}
    </View>
  );
};

export default MainScreen;
