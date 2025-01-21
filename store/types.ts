type Colors = {
  mainColor: string;
  secondColor: string;
};

export type StoreType = {
  currentIndex: number;
  increaseCurrentIndex: () => void;
  decreaseCurrentIndex: () => void;

  colors: Colors[];
  addColors: (colors: Colors) => void;

  isCopyColorModalVisible: boolean;
  setIsCopyColorModalVisible: () => void;
};
