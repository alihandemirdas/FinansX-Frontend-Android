import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "~/lib/useColorScheme";

const Support: React.FC = () => {
  const { isDarkColorScheme } = useColorScheme();
  const iconAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconAnimation, {
          toValue: -20, // Move up by 10 units
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(iconAnimation, {
          toValue: 0, // Return to original position
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View className={`flex ${isDarkColorScheme ? 'bg-[#232336]' : 'bg-white'} justify-center items-center mt-40`}>
      <Animated.View
        style={{
          transform: [{ translateY: iconAnimation }], // Apply animation
        }}
        className=""
      >
        <Ionicons
          name="diamond"
          size={90}
          style={{
            color: isDarkColorScheme ? "#ebebeb" : "#27278d",
          }}
        />
      </Animated.View>

      <Text className={`text-xl mt-12 text-center px-8 ${isDarkColorScheme ? 'text-white' : 'text-black'}`}>
        Destek olmak, reklam ve sponsorluk için iletişime geçebilirsiniz
      </Text>
      <Text className="text-blue-500 mt-2 px-8">ben@alihandemirdas.com.tr</Text>
    </View>
  );
};

export default Support;
