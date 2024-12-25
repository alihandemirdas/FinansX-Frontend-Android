import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>("1000.00");
  const [fromCurrency, setFromCurrency] = useState<string>("SGD");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const convertedAmount = "736.70"; // Örnek değer

  const currencyOptions = [
    { label: "SGD", value: "SGD" },
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
    { label: "JPY", value: "JPY" },
  ];

  return (
    <View className="p-4 bg-gray-100 rounded-3xl drop-shadow-lg">
      {/* Üst Kısım (Amount Bölümü) */}
      <View className="flex flex-row items-center justify-between mb-4">
        <View className="flex-1 mr-2">
          <Text className="text-gray-500 text-sm">Amount</Text>
          <View className="flex flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <RNPickerSelect
              onValueChange={(value) => setFromCurrency(value)}
              value={fromCurrency}
              items={currencyOptions}
              useNativeAndroidPickerStyle={false}
              style={{
                inputIOS: { color: "black", fontSize: 16 },
                inputAndroid: { color: "black", fontSize: 16 },
              }}
            />
          </View>
        </View>
        <TextInput
          className="flex-1 ml-2 border border-gray-300 rounded-lg px-3 py-2 bg-white text-black text-right"
          value={amount}
          keyboardType="numeric"
          onChangeText={setAmount}
        />
      </View>

      {/* Orta Kısım (Dönüşüm İkonu) */}
      <View className="flex items-center my-4">
        <TouchableOpacity className="bg-blue-600 p-3 rounded-full">
          <Text className="text-white font-bold text-lg">⇆</Text>
        </TouchableOpacity>
      </View>

      {/* Alt Kısım (Converted Amount Bölümü) */}
      <View className="flex flex-row items-center justify-between">
        <View className="flex-1 mr-2">
          <Text className="text-gray-500 text-sm">Converted Amount</Text>
          <View className="flex flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <RNPickerSelect
              onValueChange={(value) => setToCurrency(value)}
              value={toCurrency}
              items={currencyOptions}
              useNativeAndroidPickerStyle={false}
              style={{
                inputIOS: { color: "black", fontSize: 16 },
                inputAndroid: { color: "black", fontSize: 16 },
              }}
            />
          </View>
        </View>
        <Text className="flex-1 ml-2 text-black text-right text-lg font-semibold">
          {convertedAmount}
        </Text>
      </View>
    </View>
  );
};

export default CurrencyConverter;
