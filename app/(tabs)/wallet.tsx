import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActionSheetIOS,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ActionSheet from "react-native-actions-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import useExchangeRatesStore from "../../stores/exchangeRatesStore";
import { useColorScheme } from "../../lib/useColorScheme";
import LinearGradient from "react-native-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// Types
interface Asset {
  currencyCode: string;
  currencyName: string;
  amount: number;
  date: string;
  price: number;
  buyPrice: number;
}

interface Rate {
  currencyCode: string;
  currencyName: string;
  buyRate: number;
}

// Custom hooks
const useWalletAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);

  const loadAssets = async () => {
    try {
      const storedAssets = await AsyncStorage.getItem("wallet_assets");
      if (storedAssets) {
        setAssets(JSON.parse(storedAssets));
      }
    } catch (error) {
      console.error("Varlıklar yüklenirken hata oluştu", error);
    }
  };

  const saveAssets = async (updatedAssets: Asset[]) => {
    try {
      await AsyncStorage.setItem(
        "wallet_assets",
        JSON.stringify(updatedAssets)
      );
      setAssets(updatedAssets);
    } catch (error) {
      console.error("Varlıklar kaydedilirken hata oluştu", error);
    }
  };

  const clearAllAssets = () => {
    Alert.alert(
      "Tüm Varlıkları Sil",
      "Bu işlem geri alınamaz. Devam etmek istiyor musunuz?",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Sil",
          onPress: async () => {
            await AsyncStorage.removeItem("wallet_assets");
            setAssets([]);
          },
          style: "destructive",
        },
      ]
    );
  };

  const deleteAsset = (index: number) => {
    Alert.alert(
      "Varlığı Sil",
      "Bu varlığı silmek istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Sil",
          style: "destructive",
          onPress: () => {
            const updatedAssets = [...assets];
            updatedAssets.splice(index, 1);
            saveAssets(updatedAssets);
          },
        },
      ]
    );
  };

  const addAsset = (newAsset: Asset) => {
    const updatedAssets = [...assets, newAsset];
    saveAssets(updatedAssets);
  };

  return {
    assets,
    loadAssets,
    addAsset,
    deleteAsset,
    clearAllAssets,
  };
};

// Components
const EmptyWalletMessage = ({ isDarkColorScheme, onAddPress }) => (
  <View className="flex-1 justify-center items-center p-6">
    <Ionicons
      name="wallet-outline"
      size={80}
      color={isDarkColorScheme ? "#6c757d" : "#adb5bd"}
    />
    <Text
      className={`text-xl font-bold text-center mt-4 ${
        isDarkColorScheme ? "text-white" : "text-gray-800"
      }`}
    >
      Cüzdanınız boş
    </Text>
    <Text
      className={`text-base text-center mb-6 ${
        isDarkColorScheme ? "text-gray-300" : "text-gray-600"
      }`}
    >
      Varlıklarınızı ekleyerek finansal durumunuzu takip etmeye başlayın.
    </Text>
    <TouchableOpacity
      onPress={onAddPress}
      className="rounded-2xl px-6 py-3 bg-green-600 flex-row items-center"
    >
      <Ionicons name="add-circle" size={20} color="white" />
      <Text className="text-white font-semibold ml-2">Varlık Ekle</Text>
    </TouchableOpacity>
  </View>
);

const TotalValueCard = ({
  totalValue,
  isDarkColorScheme,
  onAddPress,
  onClearPress,
}) => (
  <LinearGradient
    colors={isDarkColorScheme ? ["#27278d", "#297373"] : ["#dee2e6", "#ced4da"]}
    style={{
      borderRadius: 30,
      marginBottom: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 3,
    }}
  >
    <View className="flex flex-row justify-between items-center">
      <View className="px-6 py-8">
        <Text
          className={`text-xl font-light ${
            isDarkColorScheme ? "text-white" : "text-gray-900"
          } mb-1`}
        >
          Toplam Değer:
        </Text>
        <Text
          className={`text-3xl font-bold ${
            isDarkColorScheme ? "text-white" : "text-gray-800"
          }`}
        >
          {totalValue.toLocaleString("tr-TR", {
            minimumFractionDigits: 2,
          })}{" "}
          ₺
        </Text>
        <Text
          className={`text-sm font-normal ${
            isDarkColorScheme ? "text-[#B8B8B8]" : "text-gray-500"
          }`}
        >
          Tüm varlıklarınızın toplam değeri
        </Text>
      </View>
      <View className="px-6 gap-y-3">
        <TouchableOpacity
          onPress={onAddPress}
          className="rounded-2xl px-4 py-3 bg-green-600"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="add-circle" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onClearPress}
          className="rounded-2xl px-4 py-3 bg-red-500"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
);

const AssetItem = ({ item, index, isDarkColorScheme, rates, onLongPress }) => {
  const rate = rates.find((r) => r.currencyCode === item.currencyCode);
  const buyRate = rate
    ? parseFloat(rate.buyRate.toString().replace(",", "."))
    : 1;
  const currentValue = (buyRate * item.amount).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
  });

  return (
    <TouchableOpacity
      onLongPress={() => onLongPress(index)}
      delayLongPress={500}
      activeOpacity={0.7}
    >
      <View
        className={`p-4 mb-4 ${
          isDarkColorScheme ? "bg-[#33334D]" : "bg-[#e9ecef]"
        } rounded-xl shadow-sm flex-row justify-between items-center`}
      >
        <View className="flex-1">
          <View className="flex flex-row justify-start">
            <Text
              className={`text-xl font-bold ${
                isDarkColorScheme ? "text-white" : "text-black"
              }`}
            >
              {item.amount}
            </Text>
            <Text
              className={`text-xl ml-1 font-normal ${
                isDarkColorScheme ? "text-gray-200" : "text-gray-900"
              }`}
            >
              {item.currencyCode}
            </Text>
          </View>
          <Text
            className={`text-lg font-medium ${
              isDarkColorScheme ? "text-gray-300" : "text-gray-800"
            }`}
          >
            {item.currencyName}
          </Text>
          <Text
            className={`text-sm font-light ${
              isDarkColorScheme ? "text-[#b0b0b0]" : "text-[#777777]"
            }`}
          >
            Eklenme Tarihi: {dayjs(item.date).format("DD.MM.YYYY")}
          </Text>
          <Text
            className={`text-sm font-light ${
              isDarkColorScheme ? "text-[#b0b0b0]" : "text-[#777777]"
            }`}
          >
            Alış Fiyatı:{" "}
            {Number(item.buyPrice).toLocaleString("tr-TR", {
              minimumFractionDigits: 2,
            })}
          </Text>
        </View>
        <View>
          <Text
            className={`text-sm font-extralight ${
              isDarkColorScheme ? "text-white" : "text-black"
            }`}
          >
            Güncel Değer:
          </Text>
          <Text
            className={`text-lg font-semibold ${
              isDarkColorScheme ? "text-[#2dc653]" : "text-[#25a244]"
            }`}
          >
            {currentValue} ₺
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const AddAssetSheet = ({ actionSheetRef, isDarkColorScheme, rates, onAdd }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [customPrice, setCustomPrice] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");

  const bottomSheetBackgroundColor = isDarkColorScheme ? "#232336" : "#f1f1f1";
  const bottomSheetTextColor = isDarkColorScheme ? "#fff" : "#000";
  const buttonBackgroundColor = isDarkColorScheme ? "#4CAF50" : "#27278d";

  const handleIOSPicker = () => {
    const options = rates.map((currency) => currency.currencyCode);

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...options, "Çıkış"],
        cancelButtonIndex: options.length,
      },
      (buttonIndex) => {
        if (buttonIndex !== options.length) {
          setFromCurrency(options[buttonIndex]);
        }
      }
    );
  };

  const handleAddAsset = () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert("Hata", "Lütfen geçerli bir miktar girin.");
      return;
    }

    const rate = rates.find((r) => r.currencyCode === fromCurrency);
    if (!rate) {
      Alert.alert("Hata", "Seçilen para birimi için kur bulunamadı.");
      return;
    }

    const finalPrice = customPrice ? Number(customPrice) : rate.buyRate;

    const newAsset = {
      currencyCode: rate.currencyCode,
      currencyName: rate.currencyName,
      amount: Number(amount),
      date: dayjs(date).format("YYYY-MM-DD"),
      price: rate.buyRate,
      buyPrice: finalPrice,
    };

    onAdd(newAsset);
    setAmount("");
    setCustomPrice("");
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      gestureEnabled={true}
      containerStyle={{
        backgroundColor: bottomSheetBackgroundColor,
        paddingBottom: 30,
      }}
    >
      <View
        style={{
          padding: 30,
          backgroundColor: bottomSheetBackgroundColor,
        }}
      >
        <Text
          className="text-sm font-light mb-1"
          style={{ color: bottomSheetTextColor }}
        >
          Miktar:
        </Text>
        <TextInput
          className="border rounded-xl dark:border-white p-4 mb-2"
          placeholder="Miktar giriniz"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={{ color: bottomSheetTextColor }}
        />

        <Text
          className="text-sm font-light mb-1"
          style={{ color: bottomSheetTextColor }}
        >
          Birim:
        </Text>
        <TouchableOpacity
          className="border rounded-xl dark:border-white p-4 mb-2"
          onPress={handleIOSPicker}
          style={{ borderColor: bottomSheetTextColor }}
        >
          <Text className="text-gray-800 dark:text-white font-semibold">
            {fromCurrency}
          </Text>
        </TouchableOpacity>

        <Text
          className="text-sm font-light mb-1"
          style={{ color: bottomSheetTextColor }}
        >
          Tarih:
        </Text>

        <View className="py-2 mb-2">
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
            maximumDate={new Date()}
          />
        </View>

        <Text
          className="text-sm font-light mb-1"
          style={{ color: bottomSheetTextColor }}
        >
          Alış Fiyatı:
        </Text>
        <TextInput
          className="border rounded-xl dark:border-white p-4 mb-4"
          placeholder="Fiyat girin (opsiyonel)"
          keyboardType="numeric"
          value={customPrice}
          onChangeText={setCustomPrice}
          style={{ color: bottomSheetTextColor }}
        />

        <TouchableOpacity
          className="p-3 rounded-2xl mt-4"
          style={{ backgroundColor: buttonBackgroundColor }}
          onPress={handleAddAsset}
        >
          <Text className="text-white text-center font-semibold">Ekle</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

const DeleteAssetSheet = ({
  deleteActionSheetRef,
  isDarkColorScheme,
  onDelete,
  onCancel,
}) => {
  const bottomSheetBackgroundColor = isDarkColorScheme ? "#232336" : "#f1f1f1";
  const bottomSheetTextColor = isDarkColorScheme ? "#fff" : "#000";

  return (
    <ActionSheet
      ref={deleteActionSheetRef}
      gestureEnabled={true}
      containerStyle={{
        backgroundColor: bottomSheetBackgroundColor,
        paddingBottom: 30,
      }}
    >
      <View
        style={{
          padding: 20,
          backgroundColor: bottomSheetBackgroundColor,
        }}
      >
        <Text
          className="text-lg font-bold text-center mb-6"
          style={{ color: bottomSheetTextColor }}
        >
          Varlık İşlemleri
        </Text>

        <TouchableOpacity
          className="p-4 rounded-xl mb-3"
          style={{ backgroundColor: "#DC3545" }}
          onPress={onDelete}
        >
          <Text className="text-white text-center font-semibold">
            Varlığı Sil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="p-4 rounded-xl"
          style={{ backgroundColor: "#6C757D" }}
          onPress={onCancel}
        >
          <Text className="text-white text-center font-semibold">İptal</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

// Main Component
const Wallet: React.FC = () => {
  const { rates } = useExchangeRatesStore();
  const { isDarkColorScheme } = useColorScheme();
  const { assets, loadAssets, addAsset, deleteAsset, clearAllAssets } =
    useWalletAssets();

  const [totalValue, setTotalValue] = useState<number>(0);
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(
    null
  );
  const actionSheetRef = useRef<any>(null);
  const deleteActionSheetRef = useRef<any>(null);

  useEffect(() => {
    loadAssets();
  }, []);

  useEffect(() => {
    calculateTotalValue();
  }, [assets, rates]);

  const calculateTotalValue = () => {
    const total = assets.reduce((total, asset) => {
      const rate = rates.find((r) => r.currencyCode === asset.currencyCode);
      return total + asset.amount * Number(rate?.buyRate || 0);
    }, 0);
    setTotalValue(isNaN(total) ? 0 : total);
  };

  const handleLongPress = (index: number) => {
    setSelectedAssetIndex(index);
    deleteActionSheetRef.current?.show();
  };

  const handleDeleteConfirm = () => {
    if (selectedAssetIndex !== null) {
      deleteAsset(selectedAssetIndex);
      deleteActionSheetRef.current?.hide();
      setSelectedAssetIndex(null);
    }
  };

  const handleDeleteCancel = () => {
    deleteActionSheetRef.current?.hide();
    setSelectedAssetIndex(null);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 p-6">
        <TotalValueCard
          totalValue={totalValue}
          isDarkColorScheme={isDarkColorScheme}
          onAddPress={() => actionSheetRef.current?.show()}
          onClearPress={clearAllAssets}
        />

        {/* Divider */}
        <View className="py-3 flex-row items-center mb-1">
          <View className="flex-1 border-t border-gray-200 dark:border-neutral-600 me-6" />
          <Text className="text-xs text-gray-400 uppercase dark:text-neutral-500">
            Varlıklar
          </Text>
          <View className="flex-1 border-t border-gray-200 dark:border-neutral-600 ms-6" />
        </View>

        {/* Varlık Listesi veya Boş Mesaj */}
        {assets.length > 0 ? (
          <FlatList
            data={assets}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <AssetItem
                item={item}
                index={index}
                isDarkColorScheme={isDarkColorScheme}
                rates={rates}
                onLongPress={handleLongPress}
              />
            )}
          />
        ) : (
          <EmptyWalletMessage
            isDarkColorScheme={isDarkColorScheme}
            onAddPress={() => actionSheetRef.current?.show()}
          />
        )}
      </View>

      {/* Add Asset ActionSheet */}
      <AddAssetSheet
        actionSheetRef={actionSheetRef}
        isDarkColorScheme={isDarkColorScheme}
        rates={rates}
        onAdd={addAsset}
      />

      {/* Delete Asset ActionSheet */}
      <DeleteAssetSheet
        deleteActionSheetRef={deleteActionSheetRef}
        isDarkColorScheme={isDarkColorScheme}
        onDelete={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </GestureHandlerRootView>
  );
};

export default Wallet;
