import React, { useState } from "react";
import { Alert, TouchableOpacity, useColorScheme, View } from "react-native";
import { Text } from "~/components/ui/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

type CurrencyCardProps = {
  buyValue: string;
  sellValue: string;
  change: string; // Değer, örneğin "28.5 ₺"
  label: string; // Etiket, örneğin "USD"
  labelLong: string;
};

export default function CurrencyCardFav({
  buyValue,
  sellValue,
  change,
  label,
  labelLong,
}: CurrencyCardProps) {
  const scheme = useColorScheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleRemoveFavorite = async () => {
    try {
      // AsyncStorage'dan currencyCode'u kaldır
      const favorites = await AsyncStorage.getItem("favorites");
      let updatedFavorites = [];
      if (favorites) {
        updatedFavorites = JSON.parse(favorites).filter(
          (code: string) => code !== label
        );
        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavorites)
        );
      }
      Alert.alert("Başarılı", `${label} favorilerden kaldırıldı.`);
      setMenuVisible(false);
    } catch (error) {
      Alert.alert("Hata", "Favorilerden kaldırırken bir sorun oluştu.");
    }
  };

  return (
    <View className="w-full bg-white dark:bg-[#232336] rounded-tr-2xl">
      <View className="w-full p-1 rounded-2xl border-[1px] border-[#cfcfcf] dark:border-gray-600">
        <View className="w-full flex flex-col py-[6px] px-4 dark:bg-[#232336] gap-y-2">
          {/* Üst Bilgi */}
          <View className="flex flex-row justify-between items-center">
            <View className="flex-row items-center gap-x-4 justify-start">
              <Text className="text-lg font-bold text-gray-800 dark:text-white">
                {label}
              </Text>
              <Text className="text-sm text-gray-400">{"| " + labelLong}</Text>
            </View>
            {/* Menü Butonu */}
            <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={20}
                color={scheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>

          {/* Menü */}
          {menuVisible && (
            <View className="absolute z-50 right-4 top-8 bg-gray-500 rounded-md shadow-lg">
              <TouchableOpacity onPress={handleRemoveFavorite}>
                <Text className="px-4 py-2 text-white font-semibold">
                  Favorilerden Kaldır
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Değer Bölgesi */}
          <View className="flex flex-row justify-between items-center mt-2">
            <View className="flex flex-col justify-start gap-x-5">
              <View className="flex flex-row">
                <Text className="text-base font-light shadow-2xl">
                  {"Alış:   "}
                </Text>
                <Text className="text-base font-semibold shadow-2xl">
                  {parseFloat(buyValue.replace(",", ".")).toFixed(4)}
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="text-base font-light shadow-2xl">
                  {"Satış: "}
                </Text>
                <Text className="text-base font-semibold shadow-2xl">
                  {parseFloat(sellValue.replace(",", ".")).toFixed(4)}
                </Text>
              </View>
            </View>
            <View className="justify-end">
              {change && (
                <View
                  className={`ml-2 px-2 py-1 rounded-lg ${
                    parseFloat(
                      change.replace("%", "").replace(",", ".").trim()
                    ) >= 0
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  <Text className="text-xs font-bold">
                    %
                    {Math.abs(
                      parseFloat(
                        change.replace("%", "").replace(",", ".").trim()
                      )
                    ).toFixed(2)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
