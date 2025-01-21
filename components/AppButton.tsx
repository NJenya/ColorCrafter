import {
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  Pressable,
  View,
  TextStyle,
} from "react-native";
import Animated from "react-native-reanimated";

import { useAnimatedChangeColor } from "@/hooks/useAnimatedChangeColor";
import { useStore } from "@/store/store";

type AppButtonProps = {
  title?: string;
  style?: StyleProp<ViewStyle>;
  pressButton?: () => void;
  mock?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  isNeedAnimated?: boolean;
};

export const AppButton = ({
  title,
  style,
  pressButton,
  mock,
  isNeedAnimated,
  titleStyle,
}: AppButtonProps) => {
  const { animatedSecondBackground, animatedMainText } =
    useAnimatedChangeColor();

  return (
    <>
      {mock ? (
        <View style={[styles.container, style]}></View>
      ) : (
        <Animated.View
          style={[
            styles.container,
            style,
            isNeedAnimated && animatedSecondBackground,
          ]}
        >
          <Pressable style={[styles.buttonContainer]} onPress={pressButton}>
            <Animated.Text
              style={[
                styles.title,
                titleStyle,
                isNeedAnimated && animatedMainText,
              ]}
            >
              {title}
            </Animated.Text>
          </Pressable>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 40,
    width: 60,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {},
});
