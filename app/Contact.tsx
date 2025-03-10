import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useColorScheme } from "../lib/useColorScheme";

const Contact: React.FC = () => {
  const [firstName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { isDarkColorScheme } = useColorScheme();

  // Animated value for icon movement
  const iconAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconAnimation, {
          toValue: -10, // Move up by 10 units
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

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api.alihandemirdas.com.tr/api/contact",
        {
          firstName,
          email,
          message,
        }
      );

      if (response.data.message === "Email sent successfully!") {
        setIsSuccess(true); // Başarılı olursa isSuccess true yapılır
      } else {
        console.error("Bir hata nedeniyle mesajınız gönderilemedi.");
      }
    } catch (error) {
      console.error("Hata: İnternet bağlantınızı kontrol ediniz!");
    }
  };

  return (
    <View className="flex justify-center items-center px-10 mt-12">
      {isSuccess ? (
        <View className="justify-center items-center">
          <Ionicons name="checkmark-circle" size={60} color="green" />
          <Text className="text-green-500 text-lg mt-4">
            Mesajınız başarıyla gönderildi!
          </Text>
        </View>
      ) : (
        <>
          <Animated.View
            style={{
              transform: [{ translateY: iconAnimation }], // Apply animation
            }}
            className=""
          >
            <Ionicons
              name="mail"
              size={80}
              style={{
                color: isDarkColorScheme ? "#ebebeb" : "#27278d",
              }}
            />
          </Animated.View>
          <Text className={`text-lg mt-4 mb-3 ${isDarkColorScheme ? "text-[#ebebeb]" : "text-[#27278d]"}`}>
            En kısa sürede geri dönüş yapacağız.
          </Text>
          <TextInput
            className={`w-full px-4 py-3 mb-4 mt-8 rounded-md ${isDarkColorScheme ? "bg-gray-600 text-white" : "bg-gray-300 text-black"}`}
            placeholder="İsminiz"
            placeholderTextColor="#aaa"
            value={firstName}
            onChangeText={setName}
          />
          <TextInput
            className={`w-full px-4 py-3 mb-4 rounded-md ${isDarkColorScheme ? "bg-gray-600 text-white" : "bg-gray-300 text-black"}`}
            placeholder="Mail Adresiniz"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            className={`w-full px-4 py-3 mb-4 rounded-md h-24 ${isDarkColorScheme ? "bg-gray-600 text-white" : "bg-gray-300 text-black"}`}
            placeholder="Mesajınız"
            placeholderTextColor="#aaa"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            onPress={handleSubmit}
            className="w-full rounded-md overflow-hidden"
          >
            <LinearGradient
              colors={["#27278d", "#6c63ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 12, // `py-3` eşdeğeri
                alignItems: "center",
              }}
            >
              <Text className="text-white text-center font-bold text-lg">
                Gönder
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Contact;
