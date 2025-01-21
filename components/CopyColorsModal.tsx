import { Modal, View, Text, StyleSheet } from "react-native";

import { useStore } from "@/store/store";
import { HEIGHT, WIDTH } from "@/utils/constants";
import { Colors } from "@/theme/Colors";
import { AppButton } from "@/components/AppButton";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export const CopyColorsModal = () => {
  const isCopyColorModalVisible = useStore(
    (state) => state.isCopyColorModalVisible
  );
  const setIsCopyColorModalVisible = useStore(
    (state) => state.setIsCopyColorModalVisible
  );
  const currentIndex = useStore((state) => state.currentIndex);
  const colors = useStore((state) => state.colors);

  const { mainColor, secondColor } = colors[currentIndex] || {
    mainColor: "#000",
    secondColor: "#fff",
  };
  const { copyToClipboard } = useCopyToClipboard();

  const pressCopyButton = (color: string) => {
    copyToClipboard(color);
    setIsCopyColorModalVisible();
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCopyColorModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Copied to Clipboard!</Text>
            <View style={styles.buttonContainer}>
              <AppButton
                style={[
                  styles.button,
                  {
                    backgroundColor: mainColor,
                  },
                ]}
                title={`Copy Main Color ${mainColor}`}
                titleStyle={[styles.buttonTitle, { color: secondColor }]}
                pressButton={() => pressCopyButton(mainColor)}
              />
              <AppButton
                style={[
                  styles.button,
                  {
                    backgroundColor: secondColor,
                  },
                ]}
                title={`Copy Matched Color ${secondColor}`}
                titleStyle={[styles.buttonTitle, { color: mainColor }]}
                pressButton={() => pressCopyButton(secondColor)}
              />
              <AppButton
                style={[styles.button, styles.closeButton]}
                title="Close"
                pressButton={setIsCopyColorModalVisible}
                titleStyle={[styles.buttonTitle, styles.closeButtonTitle]}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    height: HEIGHT / 2,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: Colors.selected,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: HEIGHT / 10,
  },
  button: {
    width: WIDTH / 1.3,
    height: HEIGHT / 16,
  },
  closeButton: {
    backgroundColor: Colors.selected,
  },
  buttonTitle: {
    fontSize: 18,
  },
  closeButtonTitle: {
    color: Colors.primary,
  },
});
