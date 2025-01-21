import { View, StyleSheet, Modal } from "react-native";
import Toast from "react-native-toast-message";

import { AppButton } from "@/components/AppButton";
import { CopyColorsModal } from "@/components/CopyColorsModal";
import { useStore } from "@/store/store";

export const CopyColorComponent = () => {
  const setIsCopyColorModalVisible = useStore(
    (state) => state.setIsCopyColorModalVisible
  );

  return (
    <>
      <View style={styles.container}>
        <AppButton
          title="Copy Color"
          style={styles.button}
          pressButton={setIsCopyColorModalVisible}
          isNeedAnimated
        />
        <CopyColorsModal />
      </View>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  button: {
    width: 100,
  },
});
