import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";

import { OffColorsType } from "@/store/types";
import { SETTINGS_KEY } from "@/utils/constants";
import { useStore } from "@/store/store";

type SettingsType = {
  generatingMode: string;
  offColors: OffColorsType;
};

export const useSaveSettingststs = () => {
  const { generatingMode, offColors, setGeneratingMode, setOffColors } =
    useStore((state) => ({
      generatingMode: state.generatingMode,
      offColors: state.offColors,
      setGeneratingMode: state.setGeneratingMode,
      setOffColors: state.setOffColors,
    }));

  const settingsRef = useRef<SettingsType>();

  useEffect(() => {
    settingsRef.current = { generatingMode, offColors };
  }, [generatingMode, offColors]);

  const storeSettings = async () => {
    try {
      if (settingsRef.current) {
        const jsonValue = JSON.stringify(settingsRef.current);
        await AsyncStorage.setItem(SETTINGS_KEY, jsonValue);
        console.log("Settings stored successfully!");
      }
    } catch (error) {
      console.error("Error storing settings:", error);
    }
  };

  const getSettings = useCallback(async () => {
    try {
      const settings = await AsyncStorage.getItem(SETTINGS_KEY);
      if (settings) {
        const parsedSettings: SettingsType = JSON.parse(settings);
        setGeneratingMode(parsedSettings.generatingMode);
        setOffColors(parsedSettings.offColors);
      }
    } catch (error) {
      console.error("Error retrieving settings:", error);
      return null;
    }
  }, []);

  return { storeSettings, getSettings };
};
