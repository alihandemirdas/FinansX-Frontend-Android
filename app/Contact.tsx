import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isDarkColorScheme } = useColorScheme();

  const iconAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconAnimation, {
          toValue: -10,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(iconAnimation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!firstName || !email || !message) {
      setErrorMessage("Lütfen tüm alanları doldurun.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://api.alihandemirdas.com.tr/api/contact",
        { firstName, email, message }
      );

      if (response.data.message === "Email sent successfully!") {
        setIsSuccess(true);
      } else {
        setErrorMessage("Bir hata nedeniyle mesajınız gönderilemedi.");
      }
    } catch (error) {
      setErrorMessage("Hata: İnternet bağlantınızı kontrol ediniz!");
    } finally {
      setLoading(false);
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
          <Animated.View style={{ transform: [{ translateY: iconAnimation }] }}>
            <Ionicons
              name="mail"
              size={80}
              style={{ color: isDarkColorScheme ? "#ebebeb" : "#27278d" }}
            />
          </Animated.View>
          <Text
            className={`text-lg mt-4 mb-3 ${
              isDarkColorScheme ? "text-[#ebebeb]" : "text-[#27278d]"
            }`}
          >
            En kısa sürede geri dönüş yapacağız.
          </Text>
          {errorMessage ? (
            <Text className="text-red-500 mb-3">{errorMessage}</Text>
          ) : null}
          <TextInput
            className={`w-full px-4 py-3 mb-4 mt-8 rounded-md ${
              isDarkColorScheme
                ? "bg-gray-600 text-white"
                : "bg-gray-300 text-black"
            }`}
            placeholder="İsminiz"
            placeholderTextColor="#aaa"
            value={firstName}
            onChangeText={setName}
          />
          <TextInput
            className={`w-full px-4 py-3 mb-4 rounded-md ${
              isDarkColorScheme
                ? "bg-gray-600 text-white"
                : "bg-gray-300 text-black"
            }`}
            placeholder="Mail Adresiniz"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            className={`w-full px-4 py-3 mb-4 rounded-md h-24 ${
              isDarkColorScheme
                ? "bg-gray-600 text-white"
                : "bg-gray-300 text-black"
            }`}
            placeholder="Mesajınız"
            placeholderTextColor="#aaa"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            onPress={handleSubmit}
            className="w-full rounded-md overflow-hidden"
            disabled={loading}
          >
            <LinearGradient
              colors={["#27278d", "#6c63ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingVertical: 12, alignItems: "center" }}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-bold text-lg">
                  Gönder
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Contact;
