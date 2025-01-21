import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { useStore } from "@/store/store";

export const useAnimatedChangeColor = () => {
  const currentIndex = useStore((state) => state.currentIndex);
  // const mainColors = useStore((state) => state.mainColors);
  // const secondColors = useStore((state) => state.secondColors);

  const colors = useStore((state) => state.colors);

  // const mainColor =
  //   currentIndex !== null && colors[currentIndex]?.mainColor !== undefined
  //     ? colors[currentIndex].mainColor
  //     : "#fff";

  // const secondColor =
  //   currentIndex !== null && colors[currentIndex]?.secondColor !== undefined
  //     ? colors[currentIndex].secondColor
  //     : "#000";

  const mainColor =
    colors[currentIndex]?.mainColor !== undefined
      ? colors[currentIndex].mainColor
      : "#fff";

  const secondColor =
    colors[currentIndex]?.secondColor !== undefined
      ? colors[currentIndex]?.secondColor
      : "#000";

  const animatedMainColor = useSharedValue(mainColor);
  const animatedSecondColor = useSharedValue(secondColor);

  useEffect(() => {
    animatedMainColor.value = withTiming(mainColor, {
      duration: 200,
    });
  }, [mainColor]);

  useEffect(() => {
    animatedSecondColor.value = withTiming(secondColor, {
      duration: 200,
    });
  }, [secondColor]);

  const animatedMainBackground = useAnimatedStyle(() => ({
    backgroundColor: animatedMainColor.value,
  }));

  const animatedSecondBackground = useAnimatedStyle(() => ({
    backgroundColor: animatedSecondColor.value,
  }));

  const animatedMainText = useAnimatedStyle(() => ({
    color: animatedMainColor.value,
  }));

  const animatedSecondText = useAnimatedStyle(() => ({
    color: animatedSecondColor.value,
  }));

  return {
    animatedMainBackground,
    animatedSecondBackground,
    animatedMainText,
    animatedSecondText,
  };
};
