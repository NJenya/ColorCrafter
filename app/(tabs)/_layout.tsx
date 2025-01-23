import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";

import { Colors } from "@/theme/Colors";
import { HEIGHT } from "@/utils/constants";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.selected,
        tabBarStyle: {
          backgroundColor: Colors.primary,
        },
        headerStyle: { backgroundColor: Colors.primary },
        headerShadowVisible: false,
        headerTintColor: Colors.selected,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Craft",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "color-palette-sharp" : "color-palette-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings-sharp" : "settings-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
