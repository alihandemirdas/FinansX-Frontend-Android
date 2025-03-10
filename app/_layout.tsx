import "../global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { useColorScheme } from "../lib/useColorScheme";
import { setAndroidNavigationBar } from "../lib/android-navigation-bar";
import { NAV_THEME } from "../lib/constants";
import { ThemeToggle } from "../components/ThemeToggle";
import { Stack } from "expo-router";
import Banner from "../components/Banner";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        await AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack>
        {/* Stack ekranları */}
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Geri",
            headerShown: false, // Ana header'ı burada gizliyoruz
          }}
        />
        <Stack.Screen
          name="Contact"
          options={{
            title: "İletişim",
            headerRight: () => <ThemeToggle />, // Tema değiştirme butonu
          }}
        />
        <Stack.Screen
          name="TermsOfService"
          options={{
            title: "Kullanım Sözleşmesi",
            headerRight: () => <ThemeToggle />, // Tema değiştirme butonu
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
