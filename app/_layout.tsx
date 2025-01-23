import { useEffect, useRef } from "react";
import { Stack } from "expo-router";
import { AppState } from "react-native";

import { useSaveSettingststs } from "@/hooks/useSaveSettings";

export default function RootLayout() {
  const appStateRef = useRef(AppState.currentState);
  const { getSettings, storeSettings } = useSaveSettingststs();

  useEffect(() => {
    getSettings();
  }, []);

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "inactive" || nextAppState === "background") {
          storeSettings();
        }
        appStateRef.current = nextAppState;
      }
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
