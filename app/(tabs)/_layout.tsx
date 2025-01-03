import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeToggle } from "~/components/ThemeToggle"; // Dark/Light Mode Toggle
import { useColorScheme } from "~/lib/useColorScheme";

// Tab ekranları için layout
export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkColorScheme ? "white" : "#27278d",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: isDarkColorScheme ? "#232336" : "#ffffff",
        },
        animation: "fade"
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Piyasalar", // Tab title'ı
          headerShown: true, // Tab ekranlarında header'ı gizle
          headerRight: () => <ThemeToggle />,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "bar-chart" : "bar-chart-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "Favorilerim", // Tab title'ı
          headerShown: true, // Tab ekranlarında header'ı gizle
          headerRight: () => <ThemeToggle />,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Ayarlar", // Tab title'ı
          headerShown: true, // Tab ekranlarında header'ı gizle
          headerRight: () => <ThemeToggle />,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
