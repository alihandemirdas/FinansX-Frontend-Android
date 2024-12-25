import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Support: React.FC = () => {
  const colorScheme = useColorScheme();
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
    <View className="flex bg-white dark:bg-[#232336] justify-center items-center mt-40">
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
            color: colorScheme === "dark" ? "#ebebeb" : "#27278d",
          }}
        />
      </Animated.View>

      <Text className=" text-black dark:text-white text-xl mt-12 text-center px-8">
        Destek olmak, reklam ve sponsorluk için iletişime geçebilirsiniz
      </Text>
      <Text className="text-blue-500 mt-2 px-8">ben@alihandemirdas.com.tr</Text>
    </View>
  );
};

export default Support;
