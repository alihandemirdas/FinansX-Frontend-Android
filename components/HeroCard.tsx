import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
  ActionSheetIOS,
  Animated,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import TrFlag from "./flags/TrFlag";
import UsFlag from "./flags/UsFlag";
import GbFlag from "./flags/GbFlag";
import AuFlag from "./flags/AuFlag";
import Arrow from "./icons/Arrow";
import EuFlag from "./flags/EuFlag";
import ChFlag from "./flags/ChFlag";
import CaFlag from "./flags/CaFlag";
import NoFlag from "./flags/NoFlag";
import SeFlag from "./flags/SeFlag";
import JpFlag from "./flags/JpFlag";
import CnFlag from "./flags/CnFlag";
import useExchangeRatesStore from "~/stores/exchangeRatesStore";
import { useColorScheme } from "~/lib/useColorScheme";

const HeroCard = ({ currencyCard }: { currencyCard: any[] }) => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("TRY");
  const [result, setResult] = useState<string>("0.00");
  const { lastUpdated } = useExchangeRatesStore();
  const rotation = useRef(new Animated.Value(0)).current;
  const { isDarkColorScheme } = useColorScheme();

  const handleConversion = (newAmount?: string) => {
    const amountValue = newAmount !== undefined ? newAmount : amount;
    const fromRate = currencyCard.find(
      (item) => item.currencyCode === fromCurrency
    )?.sellRate;

    const toRate = currencyCard.find(
      (item) => item.currencyCode === toCurrency
    )?.buyRate;

    if (fromRate && toRate) {
      const fromRateNumeric = parseFloat(fromRate.replace(",", "."));
      const toRateNumeric = parseFloat(toRate.replace(",", "."));
      const tryEquivalent = parseFloat(amountValue) * fromRateNumeric;
      const convertedValue = tryEquivalent / toRateNumeric;

      setResult(isNaN(convertedValue) ? "0.00" : convertedValue.toFixed(2));
    } else {
      setResult("0.00");
    }
  };

  const handleSwitch = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    setAmount("1");
    setResult("0.00");
  };

  useEffect(() => {
    handleConversion();
  });

  const handleIOSPicker = (setCurrency: (value: string) => void) => {
    const options = currencyCard
      .filter((currency) => currency.category === "currency")
      .map((currency) => currency.currencyCode);

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...options, "Çıkış"],
        cancelButtonIndex: options.length,
      },
      (buttonIndex) => {
        if (buttonIndex !== options.length) {
          setCurrency(options[buttonIndex]);
        }
      }
    );
  };

  const currencyFlags = {
    USD: UsFlag,
    EUR: EuFlag,
    AUD: AuFlag,
    GBP: GbFlag,
    CHF: ChFlag,
    CAD: CaFlag,
    SEK: SeFlag,
    NOK: NoFlag,
    JPY: JpFlag,
    CNY: CnFlag,
    TRY: TrFlag,
  };

  useEffect(() => {
    // Sürekli dönen animasyonu başlat
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1, // 1 tam döngüyü temsil eder
          duration: 5000, // Döngünün süresi (ms)
          useNativeDriver: true, // Performans için native driver kullanımı
        })
      ).start();
    };

    startRotation();
  }, [rotation]);

  // Rotate interpolasyonu
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  const SelectedFlag = currencyFlags[fromCurrency];
  const SelectedFlag2 = currencyFlags[toCurrency];

  return (
    <View
      className={`p-5 rounded-3xl drop-shadow-lg mb-4 ${
        isDarkColorScheme ? "bg-white" : "bg-gray-200"
      }`}
    >
      {/* Üst Satır */}
      <View className="w-full flex flex-row items-center">
        <View
          className={`w-1/6 aspect-square rounded-full flex justify-center items-center shadow-sm ${
            isDarkColorScheme ? "bg-[#232336]" : "bg-white"
          }`}
        >
          <SelectedFlag />
        </View>
        <View className="flex w-2/6">
          {Platform.OS === "ios" ? (
            <Button
              title={fromCurrency}
              onPress={() => handleIOSPicker(setFromCurrency)}
            />
          ) : (
            <Picker
              selectedValue={fromCurrency}
              onValueChange={(value) => {
                setFromCurrency(value);
                handleConversion();
              }}
              style={{ height: 50, width: "100%" }}
            >
              {currencyCard
                .filter((currency) => currency.category === "currency")
                .map((currency) => (
                  <Picker.Item
                    key={currency.currencyCode}
                    label={currency.currencyCode}
                    value={currency.currencyCode}
                  />
                ))}
            </Picker>
          )}
        </View>
        <View className="flex w-3/6">
          <TextInput
            value={amount}
            onChangeText={(text) => {
              setAmount(text);
              handleConversion(text);
            }}
            placeholder="1"
            keyboardType="numeric"
            style={{ backgroundColor: "#efefef" }}
            className="w-full h-12 bg-[#efefef] text-black px-4 rounded-2xl text-right text-2xl font-medium shadow-md"
          />
        </View>
      </View>

      {/* Ortadaki Çizgi ve Buton */}
      <View className="w-full flex flex-row justify-center items-center my-2">
        <View className="w-1/3 h-[2px] bg-gray-300"></View>
        <TouchableOpacity
          onPress={handleSwitch}
          className="rounded-full px-4 py-3"
          style={{
            backgroundColor: "#26278d",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.View style={animatedStyle}>
            <Arrow width={20} height={20} />
          </Animated.View>
        </TouchableOpacity>
        <View className="w-1/3 h-[2px] bg-gray-300"></View>
      </View>

      {/* Alt Satır */}
      <View className="w-full flex flex-row items-center">
        <View
          className={`w-1/6 aspect-square rounded-full flex justify-center items-center shadow-sm ${
            isDarkColorScheme ? "bg-[#232336]" : "bg-white"
          }`}
        >
          <SelectedFlag2 />
        </View>
        <View className="flex w-2/6">
          {Platform.OS === "ios" ? (
            <Button
              title={toCurrency}
              onPress={() => handleIOSPicker(setToCurrency)}
            />
          ) : (
            <Picker
              selectedValue={toCurrency}
              onValueChange={(value) => {
                setToCurrency(value);
                handleConversion();
              }}
              style={{ height: 50, width: "100%" }}
            >
              {currencyCard
                .filter((currency) => currency.category === "currency")
                .map((currency) => (
                  <Picker.Item
                    key={currency.currencyCode}
                    label={currency.currencyCode}
                    value={currency.currencyCode}
                  />
                ))}
            </Picker>
          )}
        </View>
        <View className="flex w-3/6">
          <TextInput
            value={result}
            editable={false}
            className="w-full h-12 text-black px-4 rounded-2xl text-right text-2xl font-medium shadow-md"
            style={{ backgroundColor: "#efefef" }}
          />
        </View>
      </View>

      <View className="flex flex-row justify-center mt-2">
        <Text className="text-gray-600 font-light text-xs">
          Son Güncelleme: {lastUpdated}
        </Text>
      </View>
    </View>
  );
};

export default HeroCard;
