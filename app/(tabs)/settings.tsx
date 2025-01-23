import { Text, View, StyleSheet } from "react-native";

import { Colors } from "@/theme/Colors";
import { PADDING } from "@/utils/constants";
import { GeneratingModeButton } from "@/components/GeneratingModeButton";
import { ExcludedColors } from "@/components/ExcludedColors";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generating Mode</Text>
      <Text style={styles.descriptionText}>
        Choose a type for color generation
      </Text>
      <GeneratingModeButton />
      <Text style={styles.title}>Accessibility</Text>
      <Text style={styles.descriptionText}>
        You can exclude a specific color from the generation process if needed.
      </Text>
      <ExcludedColors />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: PADDING,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    borderBottomWidth: 1,
    paddingVertical: 16,
    borderColor: Colors.white,
  },
  descriptionText: {
    fontSize: 12,
    lineHeight: 20,
    color: Colors.white,
    paddingVertical: 12,
  },
});
