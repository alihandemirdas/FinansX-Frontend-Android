import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

type LoadingIndicatorProps = {
  spinnerColor: string;
};

export default function LoadingIndicator({ spinnerColor }: LoadingIndicatorProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color={spinnerColor} />
      <Text className="text-[#27278d] dark:text-white">Güncelleniyor</Text>
    </View>
  );
}
