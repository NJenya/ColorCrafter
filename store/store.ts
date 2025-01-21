import { create } from "zustand";
import { StoreType } from "./types";

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
}));
