import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useColorScheme } from "../../lib/useColorScheme";

type RootStackParamList = {
  Contact: undefined;
  ReportIssue: undefined;
  TermsOfService: undefined;
};

type DataItem = {
  screen: keyof RootStackParamList;
  icon: string;
  label: string;
};

const data: DataItem[] = [
  { screen: "Contact", icon: "mail-outline", label: "İletişim" },
  {
    screen: "TermsOfService",
    icon: "document-text-outline",
    label: "Kullanım Sözleşmesi",
  },
];

const { height } = Dimensions.get("window");

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const { isDarkColorScheme } = useColorScheme();

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <View className="flex-1 p-6">
      <View
        style={{ height: height * 0.45 }}
        className={`w-full rounded-3xl items-center justify-center relative ${
          isDarkColorScheme ? "bg-[#27278d]" : "bg-[#27278d]"
        }`}
      >
        <Ionicons name="person-circle-outline" size={80} color="white" />
        <Text className="text-2xl font-bold text-white mt-4">FinansX</Text>
        <Text className="text-sm text-white mt-3">v1.0.0</Text>
        <Text className="text-base text-white mt-1 text-center px-4">
          Bu uygulama, kullanıcıların günlük döviz ve altın kurlarını anlık
          olarak takip etmelerini sağlar.
        </Text>
        <View style={{ top: height * 0.38 }} className="absolute w-full px-5">
          {data.map((item) => (
            <TouchableOpacity
              key={item.screen}
              className={`p-4 rounded-lg mb-4 flex flex-row items-center shadow-md ${
                isDarkColorScheme ? "bg-[#fefefe]" : "bg-gray-50"
              }`}
              onPress={() => handleNavigation(item.screen)}
            >
              <Ionicons name={item.icon} size={28} color="#27278d" />
              <Text className="text-[#27278d] text-lg text-center ml-4">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Profile;
