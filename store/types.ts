type Colors = {
  mainColor: string;
  secondColor: string;
};

export type OffColorsType = {
  Red: boolean;
  Green: boolean;
  Blue: boolean;
};

export type StoreType = {
  currentIndex: number;
  increaseCurrentIndex: () => void;
  decreaseCurrentIndex: () => void;

  colors: Colors[];
  addColors: (colors: Colors) => void;

  isCopyColorModalVisible: boolean;
  setIsCopyColorModalVisible: () => void;

  generatingMode: string;
  setGeneratingMode: (mode: string) => void;

  offColors: OffColorsType;
  turnOffColor: (color: keyof OffColorsType) => void;
  setOffColors: (colors: OffColorsType) => void;
};
