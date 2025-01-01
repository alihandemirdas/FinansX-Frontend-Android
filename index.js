import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import axios from "axios";

// Push Notification izin isteği ve token alımı
const getPushNotificationPermission = async () => {
  try {
    // İzin iste
    const { status } = await Notifications.requestPermissionsAsync();

    if (status === "granted") {
      // Token al
      const token = await Notifications.getExpoPushTokenAsync();
      console.log("Expo Push Token:", token.data);

      // Token ve cihaz ID'sini API'ye gönder
      await axios.post("https://api.alihandemirdas.com.tr/api/save-token", {
        token: token.data,
      });
      console.log("Token başarıyla gönderildi.");
    } else {
      console.log("Push notifications permission denied.");
    }
  } catch (error) {
    console.error("Push notifications izin isteği sırasında hata oluştu:", error);
  }
};

export function App() {
  const ctx = require.context("./app");

  useEffect(() => {
    // Push Notification izin isteği
    getPushNotificationPermission();

    // Push bildirimları foreground'da dinleme
    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Push notification received in foreground:", notification);
      }
    );

    // Push bildirimlere tıklama dinleme
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Push notification clicked:", response);
      }
    );

    // Cleanup
    return () => {
      foregroundSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
