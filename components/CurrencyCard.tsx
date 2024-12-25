import React from "react";
import { useColorScheme, View } from "react-native";
import { Text } from "~/components/ui/text";
import { LineChart } from "react-native-chart-kit"; // Grafik için kütüphane
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

type CurrencyCardProps = {
  chartData: number[]; // Grafik verileri bir sayı dizisi
  buyValue: string;
  sellValue: string;
  change: string; // Değer, örneğin "28.5 ₺"
  label: string; // Etiket, örneğin "USD"
  labelLong: string;
};

export default function CurrencyCard({
  chartData,
  buyValue,
  sellValue,
  change,
  label,
  labelLong,
}: CurrencyCardProps) {
  const scheme = useColorScheme();

  return (
    <View className="w-full bg-white dark:bg-[#232336] rounded-tr-2xl">
      <View className="w-full p-1 rounded-2xl border-[1px] border-[#cfcfcf] dark:border-gray-600">
        <View className="w-full flex flex-row justify-between items-center py-[6px] px-4 dark:bg-[#232336] gap-x-4">
          {/* İkon Bölgesi */}
          <View className="w-1/3 items-start">
            <View className="flex-row items-center">
              {/* Label */}
              <Text className="text-lg font-bold text-gray-800 dark:text-white">
                {label}
              </Text>
              {/* Change Box */}
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
            {/* Label Long */}
            <Text className="text-sm text-gray-400">{labelLong}</Text>
          </View>

          {/* Grafik Bölgesi */}
          <View className="w-1/2 relative opacity-5">
            <LineChart
              data={{
                labels: ["", "", "", "", "", "", "", "", "", "", ""],
                datasets: [
                  {
                    data: chartData,
                  },
                ],
              }}
              width={SCREEN_WIDTH * 0.4} // Grafik genişliği (1/3 alan)
              height={45} // Grafik yüksekliği
              chartConfig={{
                backgroundColor: "transparent",
                backgroundGradientFrom:
                  scheme === "dark" ? "#232336" : "#ffffff",
                backgroundGradientTo: scheme === "dark" ? "#232336" : "#ffffff",
                color: () => `rgba(1, 1, 255, 1)`,
                strokeWidth: 3,
                propsForDots: { r: "0" },
              }}
              style={{
                backgroundColor: scheme === "dark" ? "#232336" : "#ffffff",
              }}
              withDots={false}
              withInnerLines={false}
              withOuterLines={false}
              withHorizontalLabels={false}
              withVerticalLabels={false}
            />
          </View>

          {/* Değer Bölgesi */}
          <View className="w-2/3 absolute right-0 justify-end flex flex-row gap-x-4 overflow-hidden pr-2">
            <Text className="text-base font-semibold shadow-2xl">
              {parseFloat(buyValue.replace(",", ".")).toFixed(4)}
            </Text>
            <Text className="text-base font-semibold shadow-2xl">
              {parseFloat(sellValue.replace(",", ".")).toFixed(4)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
