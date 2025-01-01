import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type RightActionProps = {
  drag: SharedValue<number>;
  handleFavorite: (currencyCode: string) => void;
  currencyCode: string;
};

export default function RightAction({
  drag,
  handleFavorite,
  currencyCode,
}: RightActionProps) {
  const styleAnimation = useAnimatedStyle(() => {
    const clampedValue = Math.max(0, Math.min(drag.value, 80));

    return {
      transform: [{ translateX: clampedValue }],
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#70e000",
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      paddingHorizontal: 6,
    };
  });

  return (
    <Reanimated.View style={[styleAnimation, { overflow: "hidden" }]}>
      <TouchableOpacity onPress={() => handleFavorite(currencyCode)}>
        <Text
          style={{ color: "white", fontWeight: "normal", textAlign: "center" }}
        >
          Favori
        </Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
}
