import { View, StyleSheet, Switch, Text, Platform } from "react-native";

import { useStore } from "@/store/store";
import { Colors } from "@/theme/Colors";
import { OffColorsType } from "@/store/types";

export const ExcludedColors = () => {
  const colors = useStore((state) => state.offColors);
  const turnOffColor = useStore((state) => state.turnOffColor);

  return (
    <View style={styles.container}>
      {Object.entries(colors).map(([key, value]) => {
        return (
          <View style={styles.itemContainer} key={key}>
            <Text style={styles.label}>{key}</Text>
            <Switch
              value={value}
              thumbColor={value ? Colors.selected : "#767676"}
              trackColor={{ false: Colors.inactive, true: Colors.inactive }}
              style={
                Platform.OS === "android"
                  ? styles.androidSwitch
                  : styles.iosSwitch
              }
              onValueChange={() => turnOffColor(key as keyof OffColorsType)}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: Colors.white,
  },
  androidSwitch: { height: 30 },
  iosSwitch: { marginVertical: 6 },
});
