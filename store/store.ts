import { create } from "zustand";

import { OffColorsType, StoreType } from "@/store/types";
import { HEX } from "@/utils/constants";

export const useStore = create<StoreType>((set) => ({
  currentIndex: 0,
  increaseCurrentIndex: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),
  decreaseCurrentIndex: () =>
    set((state) => ({
      currentIndex: state.currentIndex - 1,
    })),

  colors: [],
  addColors: (colors) => {
    set((state) => {
      const newColors = [...state.colors, colors];
      return {
        colors: newColors,
        currentIndex: newColors.length - 1,
      };
    });
  },

  isCopyColorModalVisible: false,
  setIsCopyColorModalVisible: () =>
    set((state) => ({
      isCopyColorModalVisible: !state.isCopyColorModalVisible,
    })),

  generatingMode: HEX,
  setGeneratingMode: (mode) => set(() => ({ generatingMode: mode })),

  offColors: {
    Red: false,
    Green: false,
    Blue: false,
  },
  turnOffColor: (color: keyof OffColorsType) =>
    set((state) => ({
      offColors: { ...state.offColors, [color]: !state.offColors[color] },
    })),
  setOffColors: (colors: OffColorsType) => set(() => ({ offColors: colors })),
}));
