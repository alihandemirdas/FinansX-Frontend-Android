import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import axios from "axios";

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./app");

  // Push Notification izin isteği ve token alımı
  useEffect(() => {
    const getPushNotificationPermission = async () => {
      // İzin iste
      const { status } = await Notifications.requestPermissionsAsync();

      // İzin verildiyse token al
      if (status === "granted") {
        const token = await Notifications.getExpoPushTokenAsync();
        console.log("Expo Push Token:", token.data);

        // Token ve cihaz ID'sini API'ye gönder
        try {
          await axios.post("https://api.alihandemirdas.com.tr/api/save-token", {
            token: token.data,
          });
          console.log("Token başarıyla gönderildi.");
        } catch (error) {
          console.error("Token gönderilirken hata oluştu:", error);
        }
      } else {
        console.log("Push notifications permission denied.");
      }
    };

    getPushNotificationPermission();

    // Push bildirimları için emülatörde foreground dinleme
    Notifications.addNotificationReceivedListener((notification) => {
      console.log("Push notification received in foreground:", notification);
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Push notification clicked:", response);
    });
  }, []);

  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
