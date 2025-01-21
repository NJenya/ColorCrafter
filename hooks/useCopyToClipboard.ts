import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

export const useCopyToClipboard = () => {
  const copyToClipboard = async (color: string) => {
    await Clipboard.setStringAsync(color);
    Toast.show({
      type: "success",
      text1: "Copied!",
      text2: "You amaizing color has been copied to clipboard.",
      visibilityTime: 3000,
      position: "bottom",
      bottomOffset: 100,
    });
  };
  return { copyToClipboard };
};
