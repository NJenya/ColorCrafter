import { Text, View, StyleSheet } from "react-native";

import { Colors } from "@/theme/Colors";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  text: {
    color: Colors.white,
    fontSize: 20,
  },
});
