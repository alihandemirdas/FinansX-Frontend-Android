import React from "react";
import { View, Text, useColorScheme } from "react-native";

export default function HeaderLabels() {
  const theme = useColorScheme();

  return (
    <View className="flex flex-row justify-start gap-x-6 pr-2">
      <View className="items-center">
        <Text
          className={`text-base font-light ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Alış
        </Text>
        <View
          className={`w-full h-[2px] ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-300"
          } mt-1`}
        />
      </View>
      <View className="items-center">
        <Text
          className={`text-base font-light ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Satış
        </Text>
        <View
          className={`w-full h-[2px] ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-300"
          } mt-1`}
        />
      </View>
    </View>
  );
}
