import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useEffect } from "react";

import { useColor } from "@/hooks/useColor";
import { useAnimatedChangeColor } from "@/hooks/useAnimatedChangeColor";
import { HistoryButtonsContainer } from "@/components/HistoryButtonsContainer";
import { useStore } from "@/store/store";
import { CopyColorComponent } from "@/components/CopyColorComponent";
import { PADDING } from "@/utils/constants";

export default function Index() {
  const { matchedColors, generateNewColor } = useColor();
  const addColors = useStore((state) => state.addColors);
  const { animatedMainBackground } = useAnimatedChangeColor();

  useEffect(() => {
    if (matchedColors) {
      addColors(matchedColors);
    }
  }, [matchedColors]);

  const pressedScreen = () => {
    generateNewColor();
  };

  return (
    <>
      <Animated.View style={[styles.container, animatedMainBackground]}>
        <Pressable style={[styles.pressable]} onPress={pressedScreen}>
          {!matchedColors?.mainColor ? (
            <Text style={styles.descriptionText}>Hello there</Text>
          ) : (
            <>
              <CopyColorComponent />
              <View style={styles.emptyContainer}></View>
              <HistoryButtonsContainer />
            </>
          )}
        </Pressable>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDING,
  },
  pressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
  },
  descriptionText: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 32,
  },
});
