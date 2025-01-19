import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.descriptionText}>
        Tap the screen to create your unique and unmatched color.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionText: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 32,
  },
});
