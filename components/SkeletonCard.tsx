import React from "react";
import { View } from "react-native";

const SkeletonCard: React.FC = () => (
  <View className="flex flex-row items-center p-4 bg-gray-300 rounded-lg mb-4">
    <View className="w-12 h-12 bg-gray-400 rounded-full mr-4" />
    <View className="flex-1">
      <View className="w-1/2 h-4 bg-gray-400 rounded mb-2" />
      <View className="w-1/3 h-4 bg-gray-400 rounded" />
    </View>
  </View>
);

export default SkeletonCard;