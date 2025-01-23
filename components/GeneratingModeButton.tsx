import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

import { HEX, RGB } from "@/utils/constants";
import { useStore } from "@/store/store";
import { Colors } from "@/theme/Colors";

export const GeneratingModeButton = () => {
  const setGeneratingMode = useStore((state) => state.setGeneratingMode);
  const generatingMode = useStore((state) => state.generatingMode);

  const radioButtons = useMemo(
    () => [
      {
        id: "hex",
        label: "HEX",
        value: HEX,
        color: generatingMode === "hex" ? Colors.selected : Colors.inactive,
      },
      {
        id: "rgb",
        label: "RGB",
        value: RGB,
        color: generatingMode === "rgb" ? Colors.selected : Colors.inactive,
      },
    ],
    [generatingMode]
  );

  return (
    <View style={styles.container}>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={setGeneratingMode}
        selectedId={generatingMode}
        containerStyle={styles.radioConntainer}
        labelStyle={styles.label}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  radioConntainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  label: {
    color: Colors.white,
  },
});
