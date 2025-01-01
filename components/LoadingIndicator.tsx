import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

type LoadingIndicatorProps = {
  spinnerColor: string;
};

export default function LoadingIndicator({ spinnerColor }: LoadingIndicatorProps) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color={spinnerColor} />
      <Text className={isDarkColorScheme ? "text-white" : "text-[#27278d]"}>Güncelleniyor</Text>
    </View>
  );
}
