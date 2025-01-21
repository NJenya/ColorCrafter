import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { useStore } from "@/store/store";

export const HistoryButtonsContainer = () => {
  const currentIndex = useStore((state) => state.currentIndex);
  const colorsLength = useStore((state) => state.colors.length);

  const increaseCurrentIndex = useStore((state) => state.increaseCurrentIndex);
  const decreaseCurrentIndex = useStore((state) => state.decreaseCurrentIndex);

  return (
    <View style={styles.container}>
      {currentIndex === 0 ? (
        <AppButton mock />
      ) : (
        <AppButton
          title="Prev Color"
          style={styles.button}
          pressButton={decreaseCurrentIndex}
          isNeedAnimated
        />
      )}
      {currentIndex === colorsLength - 1 ? (
        <AppButton mock />
      ) : (
        <AppButton
          title="Next Color"
          style={styles.button}
          pressButton={increaseCurrentIndex}
          isNeedAnimated
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // backgroundColor: "gold",
  },
  button: {
    width: 100,
  },
});
