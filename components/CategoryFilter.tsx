import React from "react";
import { TouchableOpacity, Text, View, useColorScheme } from "react-native";

type CategoryFilterProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const categories = [
  { key: "all", label: "Hepsi" },
  { key: "currency", label: "Döviz" },
  { key: "gold", label: "Altın" },
  { key: "crypto", label: "Kripto" },
];

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  const theme = useColorScheme();

  return (
    <View className="flex flex-row justify-start items-center gap-x-1">
      {categories.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          className={`px-2 py-1 rounded-xl ${
            selectedCategory === key
              ? "bg-[#27278d]"
              : theme === "dark"
              ? "bg-gray-700"
              : "bg-gray-300"
          } ${key === "crypto" ? "opacity-50" : ""}`}
          onPress={() => key !== "crypto" && setSelectedCategory(key)}
        >
          <Text
            className={`text-xs font-normal ${
              selectedCategory === key
                ? "text-white"
                : theme === "dark"
                ? "text-white"
                : "text-black"
            }`}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
